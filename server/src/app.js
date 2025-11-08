require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Import routes
const apiRoutes = require('./routes/api');
const viewRoutes = require('./routes/views');

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

// Initialize Express app
const app = express();

// ======================
// SECURITY MIDDLEWARES
// ======================

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
  whitelist: [
    'duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price'
  ]
}));

// ======================
// VIEW ENGINE SETUP
// ======================
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// ======================
// SESSION CONFIGURATION
// ======================
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Flash messages
app.use(flash());

// Global variables middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// ======================
// ROUTES
// ======================
app.use('/api/v1', apiRoutes);
app.use('/', viewRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;

// CORS setup
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : process.env.CLIENT_URL || 'https://yourdomain.com',
    credentials: true,
  })
);

// Rate limiter for APIs
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.',
  })
);

// Parse body & cookies
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration', 'price', 'difficulty'],
  })
);

// Compress responses
app.use(compression());

// Enable EJS & layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');
app.use(expressLayouts);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// SESSION & FLASH
// ======================
app.use(
  session({
    name: 'portfolio.sid',
    secret: process.env.SESSION_SECRET || 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
  })
);

app.use(flash());

// Global template vars
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.messages = {
    success: req.flash('success_msg'),
    error: req.flash('error_msg'),
  };
  res.locals.user = req.session.user || null;
  next();
});

// ======================
// CSRF PROTECTION
// ======================
const csrfProtection = csrf();

app.use((req, res, next) => {
  // Skip CSRF for APIs and static assets
  if (req.path.startsWith('/api') || req.path.match(/\.(js|css|png|jpg|jpeg|svg|gif)$/)) {
    return next();
  }
  csrfProtection(req, res, next);
});

app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken ? req.csrfToken() : '';
  next();
});

// ======================
// ROUTES
// ======================
app.use('/', viewRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/auth', authRoutes);

// Test route
app.get('/test', (req, res) => {
  res.send('✅ Server is running fine!');
});

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      status: 'error',
      message: `Cannot find ${req.originalUrl}`,
    });
  }

  res.status(404).render('error', {
    title: '404 Not Found',
    message: 'The page you are looking for does not exist.',
  });
});

// ======================
// GLOBAL ERROR HANDLER
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 ERROR:', err);
  const statusCode = err.statusCode || 500;
  const msg = err.message || 'Something went wrong!';
  
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(statusCode).json({ 
      status: 'error', 
      message: msg 
    });
  }
  
  // Get flash messages
  const error_msg = req.flash('error_msg');
  const success_msg = req.flash('success_msg');
  const error_flash = req.flash('error');
  
  // Prepare error details for development
  let errorDetails = null;
  if (process.env.NODE_ENV === 'development') {
    errorDetails = {
      message: err.message,
      stack: err.stack,
      ...(err.errors && { errors: err.errors })
    };
  }
  
  // Set default values for all required template variables
  const templateVars = {
    title: `Error ${statusCode} | Portfolio Admin`,
    message: msg,
    statusCode,
    error: errorDetails,
    error_msg: error_msg.length ? error_msg : undefined,
    success_msg: success_msg.length ? success_msg : undefined,
    error_flash: error_flash.length ? error_flash : undefined,
    currentPage: 'error',
    unreadCount: 0,
    user: req.user || null,
    layout: 'layouts/main'
  };
  
  // Log the error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', errorDetails);
  }
  
  // Render the error template
  res.status(statusCode).render('error', templateVars);
});

// Make sure flash messages are available in all views
app.use((req, res, next) => {
  res.locals.error_msg = req.flash('error_msg');
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.currentPage = ''; // This will be set in individual routes
  res.locals.unreadCount = 0;  // Default value, update as needed
  next();
});

// ======================
// START SERVER
// ======================
// Port is now configured in server.js
// This is just for reference and can be removed if not used elsewhere
// Export the Express app for server.js to use
module.exports = app;
