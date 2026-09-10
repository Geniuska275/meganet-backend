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
    { name: "file3", maxCount: 1 },
    { name: "file4", maxCount: 1 },
    { name: "file5", maxCount: 1 },

  ]),
  async (req, res) => {
    try {
      const {
        firstname,
        middlename,
        surname,
        sex,
        Dob,
        nin,
        nationality,
        Phone,
        PhoneNumber,
        insttution,
        Lga,
        State,
        MaritalStatus,
        MatricNumber,
        address,
        Email_address,
        Email_address,
        faculty,
        Department,
        Course,
        city,
        FullName,
        programmeType,
        cost  
      } = req.body;

      const application = new Application({
     firstname,
        middlename,
        surname,
        sex,
        Dob,
        nin,
        nationality,
        Phone,
        PhoneNumber,
        insttution,
        Lga,
        State,
        MaritalStatus,
        MatricNumber,
        address,
        Email_address,
        Email_address,
        faculty,
        Department,
        Course,
        city,
        FullName,
        programmeType,
        cost,
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
          file3: req.files.file3[0]
          ? {
              originalName: req.files.file3[0].originalname,
              fileName: req.files.file3[0].filename,
              path: req.files.file3[0].path,
              mimeType: req.files.file3[0].mimetype,
              size: req.files.file3[0].size,
            }
          : null,
          file4: req.files.file4[0]
          ? {
              originalName: req.files.file4[0].originalname,
              fileName: req.files.file4[0].filename,
              path: req.files.file4[0].path,
              mimeType: req.files.file4[0].mimetype,
              size: req.files.file4[0].size,
            }
          : null,
          file5: req.files.file5[0]
          ? {
              originalName: req.files.file5[0].originalname,
              fileName: req.files.file5[0].filename,
              path: req.files.file5[0].path,
              mimeType: req.files.file5[0].mimetype,
              size: req.files.file5[0].size,
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
