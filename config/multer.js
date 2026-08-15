const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'meganet-uploads', // folder name in your Cloudinary account
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    // optional: transform on upload, e.g. resize
    // transformation: [{ width: 1200, crop: 'limit' }],
  },
});

const upload = multer({ storage });

module.exports = upload;