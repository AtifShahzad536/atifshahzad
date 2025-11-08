const express = require('express');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route for submitting contact form
router
  .route('/')
  .post(contactController.submitContactForm);

// Protected routes (require authentication)
router.use(authController.protect);

// Admin-only routes
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(contactController.getAllContactMessages);

router
  .route('/:id')
  .get(contactController.getContactMessage)
  .patch(contactController.updateMessageStatus)
  .delete(contactController.deleteContactMessage);

module.exports = router;
