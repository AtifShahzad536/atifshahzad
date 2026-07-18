const Project = require('../models/projectModel');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Helper function to get common template variables
const getTemplateVars = (req, additionalVars = {}) => {
  // Get flash messages
  const success_msg = req.flash('success_msg');
  const error_msg = req.flash('error_msg');
  const error = req.flash('error');
  
  // Default values for all templates
  const defaults = {
    title: 'Portfolio Admin',
    user: req.user || null,
    currentPage: '',
    unreadCount: 0, // Default to 0 unread messages
    success_msg: success_msg.length > 0 ? success_msg[0] : undefined,
    error_msg: error_msg.length > 0 ? error_msg[0] : undefined,
    error: error.length > 0 ? error[0] : undefined,
    errors: []
  };

  // Create the result object with defaults
  const result = { ...defaults };
  
  // Only override with additionalVars if they are not undefined
  Object.keys(additionalVars).forEach(key => {
    if (additionalVars[key] !== undefined) {
      result[key] = additionalVars[key];
    }
  });
  
  return result;
};

// Dashboard
// ======================

exports.getDashboard = catchAsync(async (req, res, next) => {
  try {
    // Get counts for dashboard stats
    const [projectsCount, messagesCount, usersCount, unreadCount] = await Promise.all([
      Project.countDocuments(),
      Contact.countDocuments(),
      User.countDocuments(),
      Contact.countDocuments({ isRead: false })
    ]);
    
    // Get recent projects and messages
    const [recentProjects, recentMessages] = await Promise.all([
      Project.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title slug featuredImage status createdAt')
        .lean(),
      Contact.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name email subject message isRead createdAt')
        .lean()
    ]);
      
    // Prepare stats for the dashboard
    const stats = {
      projectCount: projectsCount,
      messageCount: messagesCount,
      userCount: usersCount,
      unreadCount: unreadCount,
      recentMessages,
      recentProjects
    };

    // Get any flash messages
    const success_msg = req.flash('success_msg');
    const error_msg = req.flash('error_msg');
    const error = req.flash('error');

    // Render the dashboard with all required data
    res.status(200).render('admin/dashboard', {
      ...getTemplateVars(req, {
        title: 'Dashboard',
        currentPage: 'dashboard',
        unreadCount,
        stats: {
          projects: projectsCount,
          messages: messagesCount,
          users: usersCount
        },
        recentProjects,
        recentMessages,
        success_msg: success_msg.length > 0 ? success_msg : undefined,
        error_msg: error_msg.length > 0 ? error_msg : undefined,
        error: error.length > 0 ? error : undefined
      })
    });
  } catch (err) {
    console.error('Error in getDashboard:', err);
    req.flash('error_msg', 'Error loading dashboard');
    res.redirect('/');
  }
});

// Projects
// ======================

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).lean();
  
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).render('admin/projects/view', {
    ...getTemplateVars(req, {
      title: project.title,
      project
    })
  });
});

exports.createProject = (req, res) => {
  res.status(200).render('admin/projects/form', {
    ...getTemplateVars(req, {
      title: 'Create New Project',
      formAction: '/admin/projects',
      formMethod: 'POST',
      project: {},
      isEdit: false
    })
  });
};

exports.editProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).lean();
  
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).render('admin/projects/form', {
    ...getTemplateVars(req, {
      title: `Edit ${project.title}`,
      formAction: `/admin/projects/${project._id}`,
      formMethod: 'PUT',
      project,
      isEdit: true
    })
  });
});

exports.getProjects = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  // Build the query
  const query = {};
  
  // Search functionality
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Execute query
  const [projects, total] = await Promise.all([
    Project.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .lean(),
    Project.countDocuments(query)
  ]);

  const pages = Math.ceil(total / limit);
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;

  res.status(200).render('admin/projects/index', {
    ...getTemplateVars(req, {
      title: 'Projects',
      projects,
      currentPage: page,
      pages,
      total,
      hasNextPage,
      hasPrevPage,
      query: req.query,
      statuses: ['draft', 'published', 'archived']
    })
  });
});

// Authentication Views
exports.getLoginForm = (req, res) => {
  try {
    if (req.session.user) {
      return res.redirect('/admin/dashboard');
    }
    
    // Set layout to auth for login page
    res.locals.layout = 'layouts/auth';
    
    // Get flash messages
    const errorMsg = req.flash('error_msg') || [];
    const successMsg = req.flash('success_msg') || [];
    
    // Generate CSRF token if not already in locals
    const csrfToken = req.csrfToken ? req.csrfToken() : '';
    
    // Debug log
    console.log('Rendering login page with CSRF token:', csrfToken ? 'present' : 'missing');
    
    // Render the login page with necessary variables
    return res.status(200).render('auth/login', {
      title: 'Login | Portfolio Admin',
      messages: {
        error_msg: errorMsg,
        success_msg: successMsg,
        error: req.flash('error')
      },
      _csrf: csrfToken // Add CSRF token to the view
    });
  } catch (error) {
    console.error('Error in getLoginForm:', error);
    return res.status(500).render('error', {
      title: 'Error',
      message: 'An error occurred while loading the login page.'
    });
  }
};

// Messages
// ======================

exports.getMessages = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  // Build the query
  const query = {};
  
  // Filter by read/unread
  if (req.query.status === 'read') {
    query.isRead = true;
  } else if (req.query.status === 'unread') {
    query.isRead = false;
  }

  // Search functionality
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } },
      { subject: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Execute query
  const [messages, total] = await Promise.all([
    Contact.find(query)
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .lean(),
    Contact.countDocuments(query)
  ]);

  const pages = Math.ceil(total / limit);
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;

  res.status(200).render('admin/messages/index', {
    ...getTemplateVars(req, {
      title: 'Messages',
      messages,
      currentPage: page,
      pages,
      total,
      hasNextPage,
      hasPrevPage,
      query: req.query
    })
  });
});

// Users
// ======================

exports.getUsers = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 15;
  const skip = (page - 1) * limit;

  // Build the query
  const query = {};
  
  // Search functionality
  if (req.query.search) {
    query.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Filter by role
  if (req.query.role) {
    query.role = req.query.role;
  }

  // Execute query
  const [users, total] = await Promise.all([
    User.find(query)
      .sort('name')
      .select('-__v -passwordChangedAt')
      .skip(skip)
      .limit(limit)
      .lean(),
    User.countDocuments(query)
  ]);

  const pages = Math.ceil(total / limit);
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;

  res.status(200).render('admin/users/index', {
    ...getTemplateVars(req, {
      title: 'Users',
      users,
      currentPage: page,
      pages,
      total,
      hasNextPage,
      hasPrevPage,
      query: req.query,
      roles: ['user', 'admin']
    })
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('-__v -passwordChangedAt')
    .lean();
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).render('admin/users/view', {
    ...getTemplateVars(req, {
      title: user.name || 'User Profile',
      user
    })
  });
});

exports.createUser = (req, res) => {
  res.status(200).render('admin/users/form', {
    ...getTemplateVars(req, {
      title: 'Create New User',
      formAction: '/admin/users',
      formMethod: 'POST',
      user: { role: 'user' },
      isEdit: false,
      roles: ['user', 'admin']
    })
  });
};

exports.editUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('-__v -passwordChangedAt')
    .lean();
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  // Don't allow editing the current user's role
  if (req.user._id.toString() === user._id.toString()) {
    user.role = req.user.role; // Use the current role to prevent privilege escalation
  }

  res.status(200).render('admin/users/form', {
    ...getTemplateVars(req, {
      title: `Edit ${user.name || 'User'}`,
      formAction: `/admin/users/${user._id}`,
      formMethod: 'PUT',
      user,
      isEdit: true,
      roles: req.user._id.toString() === user._id.toString() 
        ? [user.role] // Only show current role if editing self
        : ['user', 'admin']
    })
  });
});

// API Documentation
// ======================

exports.getApiDocs = (req, res) => {
  res.status(200).render('admin/api-docs', {
    ...getTemplateVars(req, {
      title: 'API Documentation',
      // Add any API documentation data here
    })
  });
};

// Media Library
// ======================

exports.getMediaLibrary = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = 24; // 24 items per page for grid view
  const skip = (page - 1) * limit;

  // Build the query
  const query = {};
  
  // Filter by type
  if (req.query.type) {
    query.fileType = req.query.type;
  }

  // Search functionality
  if (req.query.search) {
    query.originalname = { $regex: req.query.search, $options: 'i' };
  }

  // TODO: Replace with your actual media model and adjust query as needed
  // This is a placeholder - you'll need to implement the actual media model
  const [media, total] = await Promise.all([
    [], // Replace with your actual media query
    0   // Replace with your actual count query
  ]);

  const pages = Math.ceil(total / limit) || 1;
  const hasNextPage = page < pages;
  const hasPrevPage = page > 1;

  res.status(200).render('admin/media/index', {
    ...getTemplateVars(req, {
      title: 'Media Library',
      media,
      currentPage: page,
      pages,
      total,
      hasNextPage,
      hasPrevPage,
      query: req.query,
      mediaTypes: ['image', 'document', 'video', 'audio']
    })
  });
});

exports.getForgotPasswordForm = (req, res) => {
  if (req.user) return res.redirect('/admin/dashboard');
  res.status(200).render('auth/forgot-password', {
    title: 'Forgot your password?'
  });
};

exports.getResetPasswordForm = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  res.status(200).render('auth/reset-password', {
    title: 'Reset your password',
    token: req.params.token
  });
});

// Admin Dashboard Views
exports.getDashboard = catchAsync(async (req, res, next) => {
  // 1) Get all stats
  const stats = await Promise.all([
    Project.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: 'new' }),
    Project.countDocuments({ featured: true })
  ]);

  // 2) Get recent projects and messages
  const recentProjects = await Project.find()
    .sort('-createdAt')
    .limit(5);

  const recentMessages = await Contact.find()
    .sort('-createdAt')
    .limit(5);

  // 3) Get recent activity (combine projects and messages)
  const recentActivity = [
    ...recentProjects.map(project => ({
      title: `New Project: ${project.title}`,
      description: `Created on ${project.createdAt.toLocaleDateString()}`,
      date: project.createdAt,
      icon: 'fas fa-project-diagram',
      color: 'primary',
      link: `/admin/projects/${project._id}`
    })),
    ...recentMessages.map(message => ({
      title: `New Message from ${message.name}`,
      description: message.subject,
      date: message.createdAt,
      icon: 'fas fa-envelope',
      color: 'success',
      link: `/admin/messages/${message._id}`
    }))
  ].sort((a, b) => b.date - a.date).slice(0, 10);

  // 4) Render the dashboard with all data
  res.status(200).render('admin/dashboard', {
    title: 'Dashboard',
    currentPage: 'dashboard',
    stats: {
      projectCount: stats[0],
      messageCount: stats[1],
      unreadMessageCount: stats[2],
      featuredProjectCount: stats[3]
    },
    recentProjects,
    recentMessages,
    recentActivity,
    user: req.user
  });
});

// Projects Views
exports.getProjects = catchAsync(async (req, res, next) => {
  const projects = await Project.find().sort('-createdAt');
  
  res.status(200).render('admin/projects/index', {
    title: 'All Projects',
    currentPage: 'projects',
    projects,
    user: req.user
  });
});

exports.getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }
  
  res.status(200).render('admin/projects/view', {
    title: project.title,
    currentPage: 'projects',
    project,
    user: req.user
  });
});

exports.getNewProjectForm = (req, res) => {
  res.status(200).render('admin/projects/form', {
    title: 'Create New Project',
    currentPage: 'projects',
    user: req.user
  });
};

exports.getEditProjectForm = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }
  
  res.status(200).render('admin/projects/form', {
    title: 'Edit Project',
    currentPage: 'projects',
    project,
    user: req.user,
    editMode: true
  });
});

// Messages
// ======================

exports.getMessages = catchAsync(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    
    // Get messages with pagination
    const [messages, totalMessages, unreadCount] = await Promise.all([
      Contact.find()
        .sort('-createdAt')
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(),
      Contact.countDocuments({ isRead: false })
    ]);
    
    // Calculate pagination
    const totalPages = Math.ceil(totalMessages / limit);
    
    // Get flash messages
    const success_msg = req.flash('success_msg');
    const error_msg = req.flash('error_msg');
    
    // Prepare template variables
    const templateVars = {
      title: 'Messages | Portfolio Admin',
      currentPage: 'messages',
      messages,
      unreadCount: unreadCount || 0,
      pagination: {
        page,
        limit,
        total: totalMessages,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      scripts: ['/js/messages.js']
    };
    
    // Add flash messages if they exist
    if (success_msg && success_msg.length > 0) {
      templateVars.success_msg = success_msg[0];
    }
    
    if (error_msg && error_msg.length > 0) {
      templateVars.error_msg = error_msg[0];
    }
    
    // Render the messages page with all required data
    res.status(200).render('admin/messages/index', 
      getTemplateVars(req, templateVars)
    );
    
  } catch (err) {
    console.error('Error in getMessages:', err);
    req.flash('error_msg', 'Error loading messages');
    return res.redirect('/admin/dashboard');
  }
});

exports.getMessage = catchAsync(async (req, res, next) => {
  try {
    const message = await Contact.findById(req.params.id).lean();
    
    if (!message) {
      req.flash('error_msg', 'No message found with that ID');
      return res.redirect('/admin/messages');
    }
    
    // Mark as read if it's a new message
    if (!message.isRead) {
      await Contact.findByIdAndUpdate(message._id, { isRead: true });
      message.isRead = true;
    }
    
    // Get flash messages
    const success_msg = req.flash('success_msg');
    const error_msg = req.flash('error_msg');
    
    // Get unread count for the sidebar
    const unreadCount = await Contact.countDocuments({ isRead: false });
    
    // Render the message view with all required data
    res.status(200).render('admin/messages/view', {
      ...getTemplateVars(req, {
        title: 'View Message | Portfolio Admin',
        currentPage: 'messages',
        message,
        unreadCount,
        success_msg: success_msg.length ? success_msg[0] : undefined,
        error_msg: error_msg.length ? error_msg[0] : undefined
      })
    });
  } catch (err) {
    console.error('Error in getMessage:', err);
    req.flash('error_msg', 'Error loading message');
    res.redirect('/admin/messages');
  }
});

// User Profile Views
exports.getProfile = (req, res) => {
  res.status(200).render('admin/profile', {
    title: 'My Profile',
    currentPage: 'profile',
    user: req.user
  });
};

exports.getSettings = (req, res) => {
  res.status(200).render('admin/settings', {
    title: 'Settings',
    currentPage: 'settings',
    user: req.user
  });
};
