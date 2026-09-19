const express = require("express");
const router = express.Router();
const uploads = require("../config/uploads");
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
        fullname,
        fullname2,
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
        d_address,
        d_dob,
        d_fullname,
        d_phone_number,
        d_origin,
        company_nature,
        l_origin,
        s_dob,
        s_card_number,
        s_home_address,
        cost
      } = req.body;

      const application = new Application({
        first_choice,
        second_choice,
        business_address,
        fullname,
        fullname2,
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
        company_nature,
        d_address,
        d_dob,
        d_fullname,
        d_phone_number,
        d_origin,
        l_origin,
        s_dob,
        s_card_number,
        s_home_address,
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