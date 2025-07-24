/* eslint-disable @typescript-eslint/no-require-imports */
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create Cloudinary storage for different types of uploads
const createCloudinaryStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'gif', 'webp']) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `annovas-agency/${folder}`,
      allowed_formats: allowedFormats,
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    },
  });
};

// Storage configurations for different upload types
const projectImageStorage = createCloudinaryStorage('projects');
const testimonialAvatarStorage = createCloudinaryStorage('testimonials');
const teamAvatarStorage = createCloudinaryStorage('team');
const userAvatarStorage = createCloudinaryStorage('users');

// Multer configurations
const createMulterUpload = (storage, maxSize = 5 * 1024 * 1024) => { // 5MB default
  return multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
    },
    fileFilter: (req, file, cb) => {
      // Check file type
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  });
};

// Upload middleware for different types
const uploadProjectImage = createMulterUpload(projectImageStorage);
const uploadTestimonialAvatar = createMulterUpload(testimonialAvatarStorage);
const uploadTeamAvatar = createMulterUpload(teamAvatarStorage);
const uploadUserAvatar = createMulterUpload(userAvatarStorage);

// Function to delete image from Cloudinary
const deleteImage = async (publicId) => {
  try {
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return false;
  }
};

// Function to get optimized image URL
const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto:good',
    format = 'auto'
  } = options;

  return cloudinary.url(publicId, {
    width,
    height,
    crop,
    quality,
    fetch_format: format,
  });
};

module.exports = {
  cloudinary,
  uploadProjectImage,
  uploadTestimonialAvatar,
  uploadTeamAvatar,
  uploadUserAvatar,
  deleteImage,
  getOptimizedImageUrl
};
