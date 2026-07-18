const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = id => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
    sameSite: 'lax'
  };

  // Remove password from output
  user.password = undefined;

  // Set cookie
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Signup a new user (Admin only)
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role
  });

  createSendToken(newUser, 201, res);
});

// Login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  
  // 1) Check if email and password exist
  if (!email || !password) {
    req.flash('error_msg', 'Please provide both email and password');
    return res.redirect('/login');
  }
  
  // 2) Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.correctPassword(password, user.password))) {
    req.flash('error_msg', 'Incorrect email or password');
    return res.redirect('/login');
  }

  // 3) Update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // 4) Set user in session (remove password)
  const userObj = user.toObject();
  delete userObj.password;
  
  req.session.user = userObj;
  req.session.isLoggedIn = true;
  
  // 5) Create JWT token for API access if needed
  const token = signToken(user._id);
  
  // 6) Set JWT in HTTP-only cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });
  
  // 7) Save session before redirect
  await new Promise((resolve, reject) => {
    req.session.save(err => {
      if (err) {
        console.error('Session save error:', err);
        return reject(new AppError('Error saving session', 500));
      }
      resolve();
    });
  });
  
  // 8) Set success message
  req.flash('success_msg', 'Successfully logged in!');
  
  // 9) Redirect to dashboard or intended URL
  const redirectTo = req.session.returnTo || '/admin/dashboard';
  delete req.session.returnTo;
  
  return res.redirect(redirectTo);
});

// Logout user
exports.logout = (req, res) => {
  // Clear JWT cookie
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ status: 'error', message: 'Error logging out' });
    }
    
    // Clear the session cookie
    res.clearCookie('connect.sid');
    
    // Redirect to login page for web requests
    if (req.accepts('html')) {
      return res.redirect('/login');
    }
    
    // For API requests, send JSON response
    res.status(200).json({ status: 'success' });
  });
};

// Protect routes - only for authenticated users
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Check if user is logged in via session
  if (req.session && req.session.user) {
    // User is logged in, set user in res.locals for templates
    res.locals.user = req.session.user;
    return next();
  }

  // 2) Check for JWT token
  let token;
  if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // Store the original URL for redirecting after login
    req.session.returnTo = req.originalUrl;
    
    // No token found, redirect to login for web requests
    if (req.accepts('html')) {
      req.flash('error', 'Please log in to access this page');
      return res.redirect('/login');
    }
    // For API requests, return 401
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }
  
  // 3) Verify JWT token if present
  if (token) {
    try {
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      
      // 4) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next(new AppError('The user belonging to this token no longer exists.', 401));
      }
      
      // 5) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('User recently changed password! Please log in again.', 401));
      }
      
      // 6) GRANT ACCESS TO PROTECTED ROUTE
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      // Handle invalid token
      if (req.accepts('html')) {
        req.flash('error', 'Your session has expired. Please log in again.');
        return res.redirect('/login');
      }
      return next(new AppError('Invalid token. Please log in again!', 401));
    }
  }
  
  // If we get here, the user is not authenticated
  req.session.returnTo = req.originalUrl;
  if (req.accepts('html')) {
    req.flash('error', 'You need to be logged in to access this page');
    return res.redirect('/login');
  }
  return next(new AppError('Authentication required', 401));

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

// Forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/auth/reset-password/${resetToken}`;
  
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

// Reset password
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

// Update password for logged-in users
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
