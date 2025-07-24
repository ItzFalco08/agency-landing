/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please provide a valid email address'
    }
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  joinedYear: {
    type: String,
    required: [true, 'Joined year is required'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Bio is required'],
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  avatar: {
    type: String,
    trim: true
  },
  avatarPublicId: {
    type: String, // Cloudinary public ID for deletion
    trim: true
  },
  linkedin: {
    type: String,
    trim: true
  },
  twitter: {
    type: String,
    trim: true
  },
  github: {
    type: String,
    trim: true
  },
  portfolio: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
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
TeamMemberSchema.index({ order: 1, createdAt: -1 });
TeamMemberSchema.index({ status: 1 });
TeamMemberSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
