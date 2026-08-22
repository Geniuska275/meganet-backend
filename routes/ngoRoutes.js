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
} = require("../controllers/ngoController");

// router.route("/").get(getForms);



const Application = require("../models/ngo");

router.post(
  "/",
     upload.fields([
    { name: "file", maxCount: 1 },
    { name: "file2", maxCount: 1 },
    { name: "file3", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log(req.file)

    try {
      const {
    first_choice,
    second_choice,
    third_choice,
    aim1,
    aim2,
    company_address,
    company_does,
    company_nature,
     dob=parseDDMMYYYY(dob),
     Email_address,
     phone_number,
     origin,
     card_number,
      home_address,
      ngo_address,
      d_address,
      d_dob=parseDDMMYYYY(d_dob),
      d_fullname,
      d_phone_number,
      d_origin,
      s_address,
      s_dob=parseDDMMYYYY(s_dob),
      s_fullname,
      s_phone_number,
       s_card_number,
       s_home_address,
       s_origin,
      } = req.body;

      console.log("files:",req.files.file[0])
      console.log("files:",req.files.file2[0])
      console.log("files:",req.files.file3[0])


      const application = new Application({
    first_choice,
    second_choice,
    third_choice,
    aim1,
    aim2,
    company_address,
    company_does,
    company_nature,
     dob,
     Email_address,
     phone_number,
     origin,
     card_number,
      home_address,
      ngo_address,
      d_address,
      d_dob,
      d_fullname,
      d_phone_number,
      d_origin,
      s_address,
      s_dob,
      s_fullname,
      s_phone_number,
       s_card_number,
       s_home_address,
       s_origin,

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
       console.log("application",application)
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
// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);
const fileFields = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "file2", maxCount: 1 },
  { name: "file3", maxCount: 1 },
]);


router.route("/").get(getForms);

module.exports = router;
