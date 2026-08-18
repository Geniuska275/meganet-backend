const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
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
  upload.single("file"),
  upload.single("file2"),
  upload.single("file3"),
  async (req, res) => {
    try {
      const {
        first_choice,
        second_choice,
        business_address,
        dob,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        l_origin
      } = req.body;

      const application = new Application({
       first_choice,
        second_choice,
        business_address,
        dob,
        Email_address,
        phone_number,
        origin,
        card_number,
        home_address,
        l_origin,

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




const fileFields = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "file2", maxCount: 1 },
  { name: "file3", maxCount: 1 },
]);


router.route("/").post(fileFields, createBusiness).get(getBusinesses);


module.exports = router;