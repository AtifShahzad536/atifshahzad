const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A project must have a title'],
      trim: true,
      maxlength: [100, 'A project title must have less or equal than 100 characters'],
      minlength: [5, 'A project title must have more or equal than 5 characters']
    },
    description: {
      type: String,
      required: [true, 'A project must have a description'],
      trim: true
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [200, 'Short description must be less than 200 characters']
    },
    technologies: [String],
    imageCover: {
      type: String,
      required: [true, 'A project must have a cover image']
    },
    images: [String],
    liveUrl: String,
    githubUrl: String,
    featured: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
projectSchema.index({ title: 1, featured: 1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
