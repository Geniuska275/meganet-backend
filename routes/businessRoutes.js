const express = require("express");
const router = express.Router();
const uploads = require("../config/uploads");
// const formUpload = require("../middleware/upload");
const Business = require('../models/business'); // 👈 this was missing
const {
  createForm,
  createBusiness,
  getBusinesses ,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/businessController");

// router.route("/").post(formUpload, createForm).get(getForms);
// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm)


const Application = require("../models/business");

router.post(
  "/",
  uploads.fields([
     { name: "file", maxCount: 1 },
     { name: "file2", maxCount: 1 },
     { name: "file3", maxCount: 1 },
   ]),
  async (req, res) => {
    console.log(req.body)
    try {
      const {
       first_choice,
       fullname,
       company_nature,
       business_address,
        second_choice,
        dob,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        l_origin,
        cost,
      } = req.body;

      const application = new Application({
        first_choice,
        second_choice,
        fullname,
        company_nature,
        business_address,
        dob,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        l_origin,
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






router.route("/").get(getBusinesses);


module.exports = router;