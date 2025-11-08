const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router
  .route('/')
  .get(projectController.getAllProjects);

router
  .route('/featured')
  .get(projectController.getFeaturedProjects);

router
  .route('/:id')
  .get(projectController.getProject);

// Protected routes (require authentication)
router.use(authController.protect);

// Admin-only routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .post(projectController.createProject);

router
  .route('/:id')
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
