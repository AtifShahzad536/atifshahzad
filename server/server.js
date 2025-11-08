const mongoose = require('mongoose');
const app = require('./src/app');

// Load environment variables first
require('dotenv').config({ path: './.env' });

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error('Error:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 3001; // Changed default port to 3001
const DB = process.env.MONGODB_URI;

if (!DB) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB with updated options
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // Remove deprecated options: useCreateIndex and useFindAndModify
    // These are no longer needed in newer versions of Mongoose
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Start server only after DB connection is established
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! 💥 Shutting down...');
      console.error('Error:', err);
      
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
