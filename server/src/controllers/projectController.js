const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all projects
const getAllProjects = catchAsync(async (req, res, next) => {
  // Filtering
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObj[el]);

  // Advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  
  let query = Project.find(JSON.parse(queryStr));

  // Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  
  // Execute query
  const projects = await query.skip(skip).limit(limit);

  // Send response
  res.status(200).json({
    status: 'success',
    results: projects.length,
    data: {
      projects
    }
  });
});

// Get a single project
const getProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  
  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project
    }
  });
});

// Create a new project (Admin only)
const createProject = catchAsync(async (req, res, next) => {
  const newProject = await Project.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      project: newProject
    }
  });
});

// Update a project (Admin only)
const updateProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      project
    }
  });
});

// Delete a project (Admin only)
const deleteProject = catchAsync(async (req, res, next) => {
  const project = await Project.findByIdAndDelete(req.params.id);

  if (!project) {
    return next(new AppError('No project found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Get featured projects
const getFeaturedProjects = catchAsync(async (req, res, next) => {
  const featuredProjects = await Project.find({ featured: true })
    .sort('-createdAt')
    .limit(6);

  res.status(200).json({
    status: 'success',
    results: featuredProjects.length,
    data: {
      projects: featuredProjects
    }
  });
});

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects
};
