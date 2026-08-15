const upload = require('../config/multer');
const express = require("express");
const router = express.Router();
const formUpload = require("../middleware/upload");
const Business = require('../models/business'); // 👈 this was missing
const {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/businessController");

router.route("/").post(formUpload, createForm).get(getForms);

router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);


router.post(
  '/business',
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'file2', maxCount: 1 },
    { name: 'file3', maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("body:",req.body)
    try {
      const buildFileData = (f) =>
        f
          ? {
              originalName: f.originalname,
              fileName: f.filename,
              path: f.path,        // Cloudinary secure URL, e.g. https://res.cloudinary.com/...
              mimeType: f.mimetype,
              size: f.size,
            }
            : undefined;
            
            const business = await Business.create({
              ...req.body,
              file: buildFileData(req.files.file?.[0]),
              file2: buildFileData(req.files.file2?.[0]),
              file3: buildFileData(req.files.file3?.[0]),
      });
      console.log("data:",business)
      
      res.status(201).json({ success: true, data: business });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

module.exports = router;