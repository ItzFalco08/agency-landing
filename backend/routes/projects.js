const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { uploadProjectImage, deleteImage } = require('../config/cloudinary');

const router = express.Router();

// Validation middleware
const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must be between 1 and 500 characters'),
  body('tech')
    .isArray({ min: 1 })
    .withMessage('At least one technology is required'),
  body('link')
    .isURL()
    .withMessage('Please provide a valid URL'),
];

// @route   GET /api/projects
// @desc    Get all projects
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      status = 'active',
      featured,
      limit = 10,
      page = 1,
      sort = 'order'
    } = req.query;

    // Build query
    const query = {};
    
    // Only admins can see inactive projects
    if (req.user && req.user.role === 'admin') {
      if (status) query.status = status;
    } else {
      query.status = 'active';
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
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
      case 'title':
        sortOptions.title = 1;
        break;
      default:
        sortOptions.order = 1;
        sortOptions.createdAt = -1;
    }

    // Execute query
    const projects = await Project.find(query)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch projects'
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    
    // Only admins can see inactive projects
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'active';
    }

    const project = await Project.findOne(query);

    if (!project) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Project not found'
      });
    }

    res.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch project'
    });
  }
});

// @route   POST /api/projects
// @desc    Create new project
// @access  Private/Admin
router.post('/', authenticateToken, uploadProjectImage.single('image'), validateProject, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { title, description, tech, link, featured = false, status = 'active', order = 0 } = req.body;

    // Parse tech array if it's a string
    let techArray;
    if (typeof tech === 'string') {
      try {
        techArray = JSON.parse(tech);
      } catch {
        techArray = tech.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else {
      techArray = tech;
    }

    // Handle image upload
    let image = req.body.image || '';
    let imagePublicId = '';

    if (req.file) {
      image = req.file.path;
      imagePublicId = req.file.filename;
    }

    // Create project
    const project = new Project({
      title,
      description,
      tech: techArray,
      image,
      imagePublicId,
      link,
      featured: featured === 'true' || featured === true,
      status,
      order: parseInt(order) || 0
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to create project'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private/Admin
router.put('/:id', authenticateToken, uploadProjectImage.single('image'), validateProject, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { title, description, tech, link, featured, status, order } = req.body;

    // Find project
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Project not found'
      });
    }

    // Parse tech array if it's a string
    let techArray;
    if (typeof tech === 'string') {
      try {
        techArray = JSON.parse(tech);
      } catch {
        techArray = tech.split(',').map(t => t.trim()).filter(Boolean);
      }
    } else {
      techArray = tech;
    }

    // Handle image upload
    if (req.file) {
      // Delete old image from Cloudinary
      if (project.imagePublicId) {
        await deleteImage(project.imagePublicId);
      }
      
      project.image = req.file.path;
      project.imagePublicId = req.file.filename;
    } else if (req.body.image && req.body.image !== project.image) {
      // URL provided instead of file upload
      if (project.imagePublicId) {
        await deleteImage(project.imagePublicId);
      }
      project.image = req.body.image;
      project.imagePublicId = '';
    }

    // Update fields
    project.title = title;
    project.description = description;
    project.tech = techArray;
    project.link = link;
    project.featured = featured === 'true' || featured === true;
    project.status = status || project.status;
    project.order = order !== undefined ? parseInt(order) : project.order;

    await project.save();

    res.json({
      message: 'Project updated successfully',
      project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to update project'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private/Admin
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Project not found'
      });
    }

    // Delete image from Cloudinary
    if (project.imagePublicId) {
      await deleteImage(project.imagePublicId);
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to delete project'
    });
  }
});

// @route   PUT /api/projects/:id/toggle-featured
// @desc    Toggle project featured status
// @access  Private/Admin
router.put('/:id/toggle-featured', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Project not found'
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      project
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to toggle featured status'
    });
  }
});

// @route   PUT /api/projects/reorder
// @desc    Reorder projects
// @access  Private/Admin
router.put('/reorder', authenticateToken, [
  body('projects')
    .isArray()
    .withMessage('Projects must be an array'),
  body('projects.*.id')
    .notEmpty()
    .withMessage('Project ID is required'),
  body('projects.*.order')
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

    const { projects } = req.body;

    // Update order for each project
    const updatePromises = projects.map(({ id, order }) =>
      Project.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      message: 'Projects reordered successfully'
    });
  } catch (error) {
    console.error('Reorder projects error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to reorder projects'
    });
  }
});

module.exports = router;
