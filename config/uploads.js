// const express = require("express");
// const multer = require("multer");
// const path = require("path");

// const app = express();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/pdfs/");
//   },

//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + "-" + file.originalname;
//     cb(null, uniqueName);
//   }
// });

// const uploads = multer({
//   storage: storage,

//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === "application/pdf") {
//       cb(null, true);
//     } else {
//       cb(new Error("Only PDF files are allowed"));
//     }
//   },

//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB
//   }
// });

// module.exports = uploads;
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/pdfs/");
    } else {
      cb(null, "uploads/images/");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const uploads = multer({
  storage,

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only PDF, JPG, JPEG, PNG, and WEBP files are allowed"
        ),
        false
      );
    }
  },

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

module.exports = uploads;