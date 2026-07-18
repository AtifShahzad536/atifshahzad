const Contact = require('../models/contactModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Submit a new contact form
const submitContactForm = catchAsync(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  
  // Get user IP and user agent
  const ipAddress = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('user-agent');

  const newContact = await Contact.create({
    name,
    email,
    subject,
    message,
    ipAddress,
    userAgent
  });

  // In a real app, you would send an email notification here
  
  res.status(201).json({
    status: 'success',
    message: 'Thank you for your message! I will get back to you soon.',
    data: {
      contact: newContact
    }
  });
});

// Get all contact messages (Admin only)
const getAllContactMessages = catchAsync(async (req, res, next) => {
  const messages = await Contact.find().sort('-createdAt');

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: {
      messages
    }
  });
});

// Get a single contact message (Admin only)
const getContactMessage = catchAsync(async (req, res, next) => {
  const message = await Contact.findById(req.params.id);
  
  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      message
    }
  });
});

// Update message status (Admin only)
const updateMessageStatus = catchAsync(async (req, res, next) => {
  const { status } = req.body;
  
  if (!['new', 'read', 'replied', 'archived'].includes(status)) {
    return next(new AppError('Invalid status value', 400));
  }

  const message = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    {
      new: true,
      runValidators: true
    }
  );

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      message
    }
  });
});

// Delete a contact message (Admin only)
const deleteContactMessage = catchAsync(async (req, res, next) => {
  const message = await Contact.findByIdAndDelete(req.params.id);

  if (!message) {
    return next(new AppError('No message found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});

module.exports = {
  submitContactForm,
  getAllContactMessages,
  getContactMessage,
  updateMessageStatus,
  deleteContactMessage
};
