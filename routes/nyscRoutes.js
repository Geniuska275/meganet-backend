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
} = require("../controllers/nyscController");

// router.route("/").post(formUpload, createForm).get(getForms);


const Application = require("../models/nysc");

router.post(
  "/",
  upload.single("file"),
  upload.single("file2"),
  upload.single("file3"),
  async (req, res) => {
    try {
      const {
    name,
    Email_address,
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
    Email_address,
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
  })
router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

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