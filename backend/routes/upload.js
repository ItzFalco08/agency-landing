const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  uploadProjectImage,
  uploadTestimonialAvatar,
  uploadTeamAvatar,
  uploadUserAvatar,
  deleteImage 
} = require('../config/cloudinary');

const router = express.Router();

// @route   POST /api/upload/project-image
// @desc    Upload project image
// @access  Private/Admin
router.post('/project-image', authenticateToken, uploadProjectImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file provided',
        message: 'Please select an image to upload'
      });
    }

    res.json({
      message: 'Image uploaded successfully',
      image: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload project image error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: 'Unable to upload image'
    });
  }
});

// @route   POST /api/upload/testimonial-avatar
// @desc    Upload testimonial avatar
// @access  Private/Admin
router.post('/testimonial-avatar', authenticateToken, uploadTestimonialAvatar.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file provided',
        message: 'Please select an image to upload'
      });
    }

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload testimonial avatar error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: 'Unable to upload avatar'
    });
  }
});

// @route   POST /api/upload/team-avatar
// @desc    Upload team member avatar
// @access  Private/Admin
router.post('/team-avatar', authenticateToken, uploadTeamAvatar.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file provided',
        message: 'Please select an image to upload'
      });
    }

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload team avatar error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: 'Unable to upload avatar'
    });
  }
});

// @route   POST /api/upload/user-avatar
// @desc    Upload user avatar
// @access  Private
router.post('/user-avatar', authenticateToken, uploadUserAvatar.single('avatar'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file provided',
        message: 'Please select an image to upload'
      });
    }

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: {
        url: req.file.path,
        publicId: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
      }
    });
  } catch (error) {
    console.error('Upload user avatar error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: 'Unable to upload avatar'
    });
  }
});

// @route   DELETE /api/upload/:publicId
// @desc    Delete image from Cloudinary
// @access  Private/Admin
router.delete('/:publicId', authenticateToken, async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Public ID is required'
      });
    }

    const success = await deleteImage(publicId);
    
    if (success) {
      res.json({
        message: 'Image deleted successfully'
      });
    } else {
      res.status(404).json({
        error: 'Not found',
        message: 'Image not found or already deleted'
      });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      error: 'Delete failed',
      message: 'Unable to delete image'
    });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images
// @access  Private/Admin
router.post('/multiple', authenticateToken, uploadProjectImage.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: 'No files provided',
        message: 'Please select images to upload'
      });
    }

    const uploadedImages = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      originalName: file.originalname,
      size: file.size
    }));

    res.json({
      message: `${uploadedImages.length} images uploaded successfully`,
      images: uploadedImages
    });
  } catch (error) {
    console.error('Upload multiple images error:', error);
    res.status(500).json({
      error: 'Upload failed',
      message: 'Unable to upload images'
    });
  }
});

// Error handling middleware for multer
router.use((error, req, res, _next) => {
  if (error) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'File size must be less than 5MB'
      });
    }
    
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        error: 'Too many files',
        message: 'Maximum 5 files allowed'
      });
    }
    
    if (error.message === 'Only image files are allowed!') {
      return res.status(400).json({
        error: 'Invalid file type',
        message: 'Only image files are allowed'
      });
    }
    
    return res.status(500).json({
      error: 'Upload error',
      message: error.message || 'An error occurred during file upload'
    });
  }
  _next();
});

module.exports = router;
