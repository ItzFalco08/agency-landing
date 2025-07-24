/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: [true, 'Testimonial quote is required'],
    trim: true,
    maxlength: [1000, 'Quote cannot exceed 1000 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Author role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  avatar: {
    type: String,
    trim: true
  },
  avatarPublicId: {
    type: String, // Cloudinary public ID for deletion
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
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
TestimonialSchema.index({ order: 1, createdAt: -1 });
TestimonialSchema.index({ status: 1 });
TestimonialSchema.index({ featured: -1 });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
