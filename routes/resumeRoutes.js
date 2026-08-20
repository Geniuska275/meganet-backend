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

// router.route("/").post(formUpload, createForm).get(getForms);

// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

const Application = require("../models/resume");

router.post(
  "/",
  upload.single("file"),
  upload.single("file2"),
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
    phone_number,
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
    phone_number,
    email_address,
    spoken,
    
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
  })
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