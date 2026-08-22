const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
// const formUpload = require("../middleware/upload");
const {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/resumeController");

router.route("/").get(getForms);

// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

const Application = require("../models/resume");

router.post(
  "/",
       upload.fields([
      { name: "file", maxCount: 1 },
      { name: "file2", maxCount: 1 },
    ]),
  async (req, res) => {
    try {
    const {
    pto,
    pfrom,
    sfrom,
    sto,
    tfrom,
    tto,
    qualification,
    tqualification,
    company,
    fullname,
    gender,
    l_origin,
    dob,
    to,
    te,
    hobby,
    post,
    phone_number,
    origin,
    card_number,
    home_address,
    email_address,
    spoken,
    
      } = req.body;

      const application = new Application({
    pto,
    pfrom,
    sfrom,
    sto,
    tfrom,
    tto,
    qualification,
    tqualification,
    company,
    fullname,
    gender,
    l_origin,
    dob,
    to,
    te,
    hobby,
    post,
    phone_number,
    origin,
    card_number,
    home_address,
    email_address,
    spoken,
    
        file: req.files.file[0]
          ? {
              originalName: req.files.file[0].originalname,
              fileName: req.files.file[0].filename,
              path: req.files.file[0].path,
              mimeType: req.files.file[0].mimetype,
              size: req.files.file[0].size,
            }
          : null,
          file2: req.files.file2[0]
          ? {
              originalName: req.files.file2[0].originalname,
              fileName: req.files.file2[0].filename,
              path: req.files.file2[0].path,
              mimeType: req.files.file2[0].mimetype,
              size: req.files.file2[0].size,
            }
          : null,

      });

      await application.save();

      res.status(201).json({
        success: true,
        message: "Application submitted successfully",
        application,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message: "Failed to submit application",
      });
    }
  })
module.exports = router;

