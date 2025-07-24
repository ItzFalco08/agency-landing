const express = require('express');
const { body, validationResult } = require('express-validator');
const TeamMember = require('../models/TeamMember');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { uploadTeamAvatar, deleteImage } = require('../config/cloudinary');

const router = express.Router();

// Validation middleware
const validateTeamMember = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be between 1 and 100 characters'),
  body('role')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role must be between 1 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('location')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be between 1 and 100 characters'),
  body('joinedYear')
    .trim()
    .notEmpty()
    .withMessage('Joined year is required'),
  body('bio')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Bio must be between 1 and 500 characters'),
];

// @route   GET /api/team
// @desc    Get all team members
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      status = 'active',
      limit = 20,
      page = 1,
      sort = 'order'
    } = req.query;

    // Build query
    const query = {};
    
    // Only admins can see inactive team members
    if (req.user && req.user.role === 'admin') {
      if (status) query.status = status;
    } else {
      query.status = 'active';
    }

    // Calculate pagination
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    // Sort options
    const sortOptions = {};
    switch (sort) {
      case 'newest':
        sortOptions.createdAt = -1;
        break;
      case 'oldest':
        sortOptions.createdAt = 1;
        break;
      case 'name':
        sortOptions.name = 1;
        break;
      case 'role':
        sortOptions.role = 1;
        break;
      case 'joined':
        sortOptions.joinedYear = -1;
        break;
      default:
        sortOptions.order = 1;
        sortOptions.createdAt = -1;
    }

    // Execute query
    const teamMembers = await TeamMember.find(query)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const total = await TeamMember.countDocuments(query);

    res.json({
      teamMembers,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch team members'
    });
  }
});

// @route   GET /api/team/:id
// @desc    Get team member by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    
    // Only admins can see inactive team members
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'active';
    }

    const teamMember = await TeamMember.findOne(query);

    if (!teamMember) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Team member not found'
      });
    }

    res.json({ teamMember });
  } catch (error) {
    console.error('Get team member error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch team member'
    });
  }
});

// @route   POST /api/team
// @desc    Create new team member
// @access  Private/Admin
router.post('/', authenticateToken, uploadTeamAvatar.single('avatar'), validateTeamMember, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { 
      name, 
      role, 
      email, 
      location, 
      joinedYear, 
      bio,
      linkedin,
      twitter,
      github,
      portfolio,
      skills,
      status = 'active', 
      order = 0 
    } = req.body;

    // Parse skills array if it's a string
    let skillsArray = [];
    if (skills) {
      if (typeof skills === 'string') {
        try {
          skillsArray = JSON.parse(skills);
        } catch {
          skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(skills)) {
        skillsArray = skills;
      }
    }

    // Handle avatar upload
    let avatar = req.body.avatar || '';
    let avatarPublicId = '';

    if (req.file) {
      avatar = req.file.path;
      avatarPublicId = req.file.filename;
    }

    // Create team member
    const teamMember = new TeamMember({
      name,
      role,
      email,
      location,
      joinedYear,
      bio,
      avatar,
      avatarPublicId,
      linkedin,
      twitter,
      github,
      portfolio,
      skills: skillsArray,
      status,
      order: parseInt(order) || 0
    });

    await teamMember.save();

    res.status(201).json({
      message: 'Team member created successfully',
      teamMember
    });
  } catch (error) {
    console.error('Create team member error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to create team member'
    });
  }
});

// @route   PUT /api/team/:id
// @desc    Update team member
// @access  Private/Admin
router.put('/:id', authenticateToken, uploadTeamAvatar.single('avatar'), validateTeamMember, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { 
      name, 
      role, 
      email, 
      location, 
      joinedYear, 
      bio,
      linkedin,
      twitter,
      github,
      portfolio,
      skills,
      status, 
      order 
    } = req.body;

    // Find team member
    const teamMember = await TeamMember.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Team member not found'
      });
    }

    // Parse skills array if it's a string
    let skillsArray = [];
    if (skills) {
      if (typeof skills === 'string') {
        try {
          skillsArray = JSON.parse(skills);
        } catch {
          skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
        }
      } else if (Array.isArray(skills)) {
        skillsArray = skills;
      }
    }

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar from Cloudinary
      if (teamMember.avatarPublicId) {
        await deleteImage(teamMember.avatarPublicId);
      }
      
      teamMember.avatar = req.file.path;
      teamMember.avatarPublicId = req.file.filename;
    } else if (req.body.avatar && req.body.avatar !== teamMember.avatar) {
      // URL provided instead of file upload
      if (teamMember.avatarPublicId) {
        await deleteImage(teamMember.avatarPublicId);
      }
      teamMember.avatar = req.body.avatar;
      teamMember.avatarPublicId = '';
    }

    // Update fields
    teamMember.name = name;
    teamMember.role = role;
    teamMember.email = email;
    teamMember.location = location;
    teamMember.joinedYear = joinedYear;
    teamMember.bio = bio;
    teamMember.linkedin = linkedin || teamMember.linkedin;
    teamMember.twitter = twitter || teamMember.twitter;
    teamMember.github = github || teamMember.github;
    teamMember.portfolio = portfolio || teamMember.portfolio;
    teamMember.skills = skillsArray;
    teamMember.status = status || teamMember.status;
    teamMember.order = order !== undefined ? parseInt(order) : teamMember.order;

    await teamMember.save();

    res.json({
      message: 'Team member updated successfully',
      teamMember
    });
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to update team member'
    });
  }
});

// @route   DELETE /api/team/:id
// @desc    Delete team member
// @access  Private/Admin
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id);
    
    if (!teamMember) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Team member not found'
      });
    }

    // Delete avatar from Cloudinary
    if (teamMember.avatarPublicId) {
      await deleteImage(teamMember.avatarPublicId);
    }

    await TeamMember.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to delete team member'
    });
  }
});

// @route   PUT /api/team/reorder
// @desc    Reorder team members
// @access  Private/Admin
router.put('/reorder', authenticateToken, [
  body('teamMembers')
    .isArray()
    .withMessage('Team members must be an array'),
  body('teamMembers.*.id')
    .notEmpty()
    .withMessage('Team member ID is required'),
  body('teamMembers.*.order')
    .isNumeric()
    .withMessage('Order must be a number'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { teamMembers } = req.body;

    // Update order for each team member
    const updatePromises = teamMembers.map(({ id, order }) =>
      TeamMember.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      message: 'Team members reordered successfully'
    });
  } catch (error) {
    console.error('Reorder team members error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to reorder team members'
    });
  }
});

module.exports = router;
