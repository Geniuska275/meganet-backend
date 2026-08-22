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

router.route("/").get(getForms);

// router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

const Application = require("../models/resume");

router.post(
  "/",
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
    email_address,
    spoken, 
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

