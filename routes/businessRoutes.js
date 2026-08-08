const express = require("express");
const router = express.Router();
const formUpload = require("../middleware/upload");
const {
  createForm,
  getForms,
  getForm,
  updateForm,
  deleteForm,
} = require("../controllers/businessController");

router.route("/").post(formUpload, createForm).get(getForms);

router.route("/:id").get(getForm).put(formUpload, updateForm).delete(deleteForm);

module.exports = router;

