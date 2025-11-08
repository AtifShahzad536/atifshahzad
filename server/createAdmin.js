require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/userModel');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log(`Email: ${existingAdmin.email}`);
      process.exit(0);
    }

    // Create admin user with plain text password
    // The pre-save hook in the User model will handle hashing
    const adminData = {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123', // This will be hashed by the pre-save hook
      passwordConfirm: 'admin123',
      role: 'admin',
      active: true
    };

    // Create the user
    const user = await User.create(adminData);
    
    console.log('✅ Admin user created successfully:');
    console.log(`Email: ${user.email}`);
    console.log('Password: admin123'); // This is the initial password
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:');
    console.error(error.message);
    
    // More detailed error logging
    if (error.errors) {
      Object.values(error.errors).forEach(err => {
        console.error(`- ${err.message}`);
      });
    }
    
    process.exit(1);
  }
};

createAdmin();
