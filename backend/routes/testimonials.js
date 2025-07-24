const express = require('express');
const { body, validationResult } = require('express-validator');
const Testimonial = require('../models/Testimonial');
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const { uploadTestimonialAvatar, deleteImage } = require('../config/cloudinary');

const router = express.Router();

// Validation middleware
const validateTestimonial = [
  body('quote')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Quote must be between 1 and 1000 characters'),
  body('author')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Author name must be between 1 and 100 characters'),
  body('role')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Role must be between 1 and 100 characters'),
  body('company')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Company name must be between 1 and 100 characters'),
];

// @route   GET /api/testimonials
// @desc    Get all testimonials
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
    
    // Only admins can see inactive testimonials
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
      case 'author':
        sortOptions.author = 1;
        break;
      case 'rating':
        sortOptions.rating = -1;
        break;
      default:
        sortOptions.order = 1;
        sortOptions.createdAt = -1;
    }

    // Execute query
    const testimonials = await Testimonial.find(query)
      .sort(sortOptions)
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const total = await Testimonial.countDocuments(query);

    res.json({
      testimonials,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total,
        limit: limitNum
      }
    });
  } catch (error) {
    console.error('Get testimonials error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch testimonials'
    });
  }
});

// @route   GET /api/testimonials/:id
// @desc    Get testimonial by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const query = { _id: req.params.id };
    
    // Only admins can see inactive testimonials
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'active';
    }

    const testimonial = await Testimonial.findOne(query);

    if (!testimonial) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Testimonial not found'
      });
    }

    res.json({ testimonial });
  } catch (error) {
    console.error('Get testimonial error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to fetch testimonial'
    });
  }
});

// @route   POST /api/testimonials
// @desc    Create new testimonial
// @access  Private/Admin
router.post('/', authenticateToken, uploadTestimonialAvatar.single('avatar'), validateTestimonial, async (req, res) => {
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
      quote, 
      author, 
      role, 
      company, 
      rating = 5, 
      featured = false, 
      status = 'active', 
      order = 0 
    } = req.body;

    // Handle avatar upload
    let avatar = req.body.avatar || '';
    let avatarPublicId = '';

    if (req.file) {
      avatar = req.file.path;
      avatarPublicId = req.file.filename;
    }

    // Create testimonial
    const testimonial = new Testimonial({
      quote,
      author,
      role,
      company,
      avatar,
      avatarPublicId,
      rating: parseInt(rating) || 5,
      featured: featured === 'true' || featured === true,
      status,
      order: parseInt(order) || 0
    });

    await testimonial.save();

    res.status(201).json({
      message: 'Testimonial created successfully',
      testimonial
    });
  } catch (error) {
    console.error('Create testimonial error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to create testimonial'
    });
  }
});

// @route   PUT /api/testimonials/:id
// @desc    Update testimonial
// @access  Private/Admin
router.put('/:id', authenticateToken, uploadTestimonialAvatar.single('avatar'), validateTestimonial, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        messages: errors.array().map(err => err.msg)
      });
    }

    const { quote, author, role, company, rating, featured, status, order } = req.body;

    // Find testimonial
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Testimonial not found'
      });
    }

    // Handle avatar upload
    if (req.file) {
      // Delete old avatar from Cloudinary
      if (testimonial.avatarPublicId) {
        await deleteImage(testimonial.avatarPublicId);
      }
      
      testimonial.avatar = req.file.path;
      testimonial.avatarPublicId = req.file.filename;
    } else if (req.body.avatar && req.body.avatar !== testimonial.avatar) {
      // URL provided instead of file upload
      if (testimonial.avatarPublicId) {
        await deleteImage(testimonial.avatarPublicId);
      }
      testimonial.avatar = req.body.avatar;
      testimonial.avatarPublicId = '';
    }

    // Update fields
    testimonial.quote = quote;
    testimonial.author = author;
    testimonial.role = role;
    testimonial.company = company;
    testimonial.rating = rating !== undefined ? parseInt(rating) : testimonial.rating;
    testimonial.featured = featured === 'true' || featured === true;
    testimonial.status = status || testimonial.status;
    testimonial.order = order !== undefined ? parseInt(order) : testimonial.order;

    await testimonial.save();

    res.json({
      message: 'Testimonial updated successfully',
      testimonial
    });
  } catch (error) {
    console.error('Update testimonial error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to update testimonial'
    });
  }
});

// @route   DELETE /api/testimonials/:id
// @desc    Delete testimonial
// @access  Private/Admin
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Testimonial not found'
      });
    }

    // Delete avatar from Cloudinary
    if (testimonial.avatarPublicId) {
      await deleteImage(testimonial.avatarPublicId);
    }

    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to delete testimonial'
    });
  }
});

// @route   PUT /api/testimonials/:id/toggle-featured
// @desc    Toggle testimonial featured status
// @access  Private/Admin
router.put('/:id/toggle-featured', authenticateToken, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        error: 'Not found',
        message: 'Testimonial not found'
      });
    }

    testimonial.featured = !testimonial.featured;
    await testimonial.save();

    res.json({
      message: `Testimonial ${testimonial.featured ? 'featured' : 'unfeatured'} successfully`,
      testimonial
    });
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to toggle featured status'
    });
  }
});

// @route   PUT /api/testimonials/reorder
// @desc    Reorder testimonials
// @access  Private/Admin
router.put('/reorder', authenticateToken, [
  body('testimonials')
    .isArray()
    .withMessage('Testimonials must be an array'),
  body('testimonials.*.id')
    .notEmpty()
    .withMessage('Testimonial ID is required'),
  body('testimonials.*.order')
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

    const { testimonials } = req.body;

    // Update order for each testimonial
    const updatePromises = testimonials.map(({ id, order }) =>
      Testimonial.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({
      message: 'Testimonials reordered successfully'
    });
  } catch (error) {
    console.error('Reorder testimonials error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Unable to reorder testimonials'
    });
  }
});

module.exports = router;
