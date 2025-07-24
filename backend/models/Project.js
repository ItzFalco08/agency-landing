/* eslint-disable @typescript-eslint/no-require-imports */

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  tech: [{
    type: String,
    required: true,
    trim: true
  }],
  image: {
    type: String,
    required: [true, 'Project image is required'],
    trim: true
  },
  imagePublicId: {
    type: String, // Cloudinary public ID for deletion
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Project link is required'],
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for sorting and filtering
ProjectSchema.index({ order: 1, createdAt: -1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ featured: -1 });

module.exports = mongoose.model('Project', ProjectSchema);
