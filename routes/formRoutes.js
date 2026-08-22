const express = require("express");
const router = express.Router();
const upload = require("../config/upload");

const {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/formController");

router.route("/").get(getForms);


const Application = require("../models/naming");

router.post(
  "/",
  upload.single("file"),
  upload.single("file2"),
  upload.single("file3"),
  async (req, res) => {
    try {
      const {
    first_choice,
    second_choice,
    Email_address,
    company_address,
    company_does,
    company_nature,
     dob,
     address,
     phone_number,
     origin,
     card_number,
    home_address,
    d_fullname,
    d_phone_number,
    d_origin,
      } = req.body;

      const application = new Application({
      first_choice,
    second_choice,
    Email_address,
    company_address,
    company_does,
    company_nature,
     dob,
     address,
     phone_number,
     origin,
     card_number,
    home_address,
    d_fullname,
    d_phone_number,
    d_origin,

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














module.exports = router;




// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const fd = new FormData();
//   Object.entries(form).forEach(([key, value]) => {
//     if (["file", "file2", "file3"].includes(key)) {
//       if (value) fd.append(key, value); // must be a real File object, not ""
//     } else {
//       fd.append(key, value);
//     }
//   });

//   const res = await fetch("http://localhost:5000/api/forms", {
//     method: "POST",
//     body: fd,
//     // don't set Content-Type yourself — the browser adds the multipart boundary
//   });

//   const data = await res.json();
//   console.log(data);
// };