const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "meganet-uploads",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"], // add pdf if forms/IDs are uploaded
    resource_type: "auto", // required so PDFs don't get treated as images and rejected
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file, adjust as needed
});

module.exports = upload;