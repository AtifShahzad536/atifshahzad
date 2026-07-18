/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load environment variables
dotenv.config({ path: '../.env' });

// Load models
const Project = require('../src/models/projectModel');
const User = require('../src/models/userModel');

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

// Read JSON files
const projects = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf-8')
);

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8')
);

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await Project.deleteMany();
    await User.deleteMany();

    // Create users
    const createdUsers = await User.create(users, { validateBeforeSave: false });
    console.log('Users created:', createdUsers.length);

    // Create projects
    const createdProjects = await Project.create(projects);
    console.log('Projects created:', createdProjects.length);

    console.log('Data successfully imported!');
    process.exit();
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1);
  }
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Project.deleteMany();
    await User.deleteMany();
    
    console.log('Data successfully deleted!');
    process.exit();
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1);
  }
};

// Handle command line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  console.log('Please specify --import or --delete');
  process.exit(1);
}
