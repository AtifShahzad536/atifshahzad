const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// Check if user is logged in
exports.isLoggedIn = async (req, res, next) => {
  try {
    // 1) Get token from cookies
    const token = req.cookies.jwt;
    
    if (!token) {
      return next();
    }

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      res.clearCookie('jwt');
      return next();
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      res.clearCookie('jwt');
      return next();
    }

    // 5) Grant access to the user
    res.locals.user = currentUser;
    req.user = currentUser;
    return next();
  } catch (err) {
    res.clearCookie('jwt');
    return next();
  }
};

// Protect routes - only for authenticated users
exports.protect = async (req, res, next) => {
  // 1) Check if user is logged in
  if (!res.locals.user) {
    return res.redirect('/login');
  }
  
  // 2) Check if user is active
  if (!req.user.active) {
    res.clearCookie('jwt');
    return res.redirect('/login?error=Your account has been deactivated');
  }
  
  next();
};

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).render('error', {
        title: 'Access Denied',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};

// Check if user is logged out
exports.isLoggedOut = (req, res, next) => {
  if (res.locals.user) {
    return res.redirect('/admin/dashboard');
  }
  next();
};

// Set current page for active link highlighting
exports.setCurrentPage = (page) => {
  return (req, res, next) => {
    res.locals.currentPage = page;
    next();
  };
};
