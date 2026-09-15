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
  "/business",
  uploads.fields([
     { name: "file", maxCount: 1 },
     { name: "file2", maxCount: 1 },
     { name: "file3", maxCount: 1 },
   ]),
  async (req, res) => {
    try {
      const {
        first_choice,
        second_choice,
        business_address,
        dob,
        dob2,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        Email_address2,
        phone_number2,
        origin2,
        card_number2,
        home_address2,
        l_origin,
        cost
      } = req.body;

      const application = new Application({
        first_choice,
        second_choice,
        business_address,
        dob,
        dob2,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        Email_address2,
        phone_number2,
        origin2,
        card_number2,
        home_address2,
        l_origin,
        cost,

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
          file3: req.file
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






router.route("/").get(getBusinesses);


module.exports = router;