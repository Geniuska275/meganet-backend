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
} = require("../controllers/nerdController");

// router.route("/").post(formUpload, createForm).get(getForms);


const Application = require("../models/nerd");

router.post(
  "/",
  upload.single("file"),
  upload.single("file2"),
  async (req, res) => {
    try {
      const {
    name,
    email,
    phone,
    nin,
    state,
    lgo,
    dob,
    address,
    bloodgroup,
    genotype,
    registration,
    matric,
    place,
    language,
    kinRelationship,
    kinName,
    kinEmail,
    kinPhone,
    shirt,
    trouser,
    shoe,
    stateBefore,
    prifrom,
    prito,
    secfrom,
    secto,
    tetfrom,
    tetto,
    level   
      } = req.body;

      const application = new Application({
    name,
    email,
    phone,
    nin,
    state,
    lgo,
    dob,
    address,
    bloodgroup,
    genotype,
    registration,
    matric,
    place,
    language,
    kinRelationship,
    kinName,
    kinEmail,
    kinPhone,
    shirt,
    trouser,
    shoe,
    stateBefore,
    prifrom,
    prito,
    secfrom,
    secto,
    tetfrom,
    tetto,
    level,   

        file: req.file
          ? {
              originalName: req.file.originalname,
              fileName: req.file.filename,
              path: req.file.path,
              mimeType: req.file.mimetype,
              size: req.file.size,
            }
          : null,
          file2: req.file
          ? {
              originalName: req.file.originalname,
              fileName: req.file.filename,
              path: req.file.path,
              mimeType: req.file.mimetype,
              size: req.file.size,
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
  }
);

// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

module.exports = router;
