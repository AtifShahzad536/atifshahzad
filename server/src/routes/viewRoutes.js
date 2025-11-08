const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const { isLoggedIn, restrictTo } = require('../middleware/authMiddleware');

// ======================
// PUBLIC ROUTES
// ======================

// Root URL - Redirect to login or dashboard based on auth status
router.get('/', (req, res) => {
  try {
    // Debug log to check session
    console.log('Session data:', req.session);
    
    // Check if user is logged in via session
    if (req.session && req.session.user) {
      console.log('User is logged in, redirecting to dashboard');
      return res.redirect('/admin/dashboard');
    }
    
    console.log('User is not logged in, redirecting to login');
    return res.redirect('/login');
  } catch (error) {
    console.error('Error in root route:', error);
    return res.redirect('/login');
  }
});

// Authentication routes
router.get('/login', viewController.getLoginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/forgot-password', viewController.getForgotPasswordForm);
router.get('/reset-password/:token', viewController.getResetPasswordForm);

// ======================
// PROTECTED ROUTES (Require login)
// ======================
router.use(authController.protect);

// Dashboard
router.get('/admin', viewController.getDashboard);
router.get('/admin/dashboard', viewController.getDashboard);

// Projects
router.get('/admin/projects', viewController.getProjects);
router.get('/admin/projects/new', viewController.createProject);
router.get('/admin/projects/:id', viewController.getProject);
router.get('/admin/projects/:id/edit', viewController.editProject);

// Messages
router.get('/admin/messages', viewController.getMessages);
router.get('/admin/messages/:id', viewController.getMessage);

// Settings
router.get('/admin/settings', viewController.getSettings);
router.get('/admin/profile', viewController.getProfile);

// Users (Admin only)
router.get('/admin/users', restrictTo('admin'), viewController.getUsers);
router.get('/admin/users/new', restrictTo('admin'), viewController.createUser);
router.get('/admin/users/:id', restrictTo('admin'), viewController.getUser);
router.get('/admin/users/:id/edit', restrictTo('admin'), viewController.editUser);

// Media Library
router.get('/admin/media', viewController.getMediaLibrary);

// API Documentation
router.get('/admin/api-docs', viewController.getApiDocs);

// Logout
router.get('/logout', authController.logout);

// 404 handler for all routes
router.get('*', (req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    statusCode: 404,
    message: 'The page you are looking for does not exist.',
    user: req.user || null
  });
});

module.exports = router;
