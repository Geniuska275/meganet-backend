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
   upload.fields([
    { name: "file", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
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
    level,
    cost  
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
    cost ,  

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
  }
);

// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

module.exports = router;
