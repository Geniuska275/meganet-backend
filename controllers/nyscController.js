const fs = require("fs");
const path = require("path");
const Form = require("../models/nysc");

// Fields that come in as plain text/body values
const TEXT_FIELDS = [
    "name",
    "Email_address",
    "phone",
    "nin",
    "state",
    "lgo",
    "dob",
    "address",
    "bloodgroup",
    "genotype",
    "registration",
    "matric",
    "place",
     "language",
    "kinRelationship",
     "kinName",
    "kinEmail",
     "kinPhone",
    "shirt",
    "trouser",
    "shoe",
    "stateBefore",
     "prifrom",
    "prito",
    "secfrom",
    "secto",
    "tetfrom",
    "tetto",
    "level"
    
];

const buildFileMeta = (file) => {
  if (!file) return null;
  return {
    originalName: file.originalname,
    fileName: file.filename,
    path: `/uploads/${file.filename}`,
    mimeType: file.mimetype,
    size: file.size,
  };
};

// Helper to remove an uploaded file from disk (used on update/delete/errors)
const removeFileFromDisk = (relativePath) => {
  if (!relativePath) return;
  const absPath = path.join(__dirname, "..", relativePath);
  fs.unlink(absPath, (err) => {
    if (err && err.code !== "ENOENT") console.error("Failed to delete file:", err.message);
  });
};

// @desc   Create a new form submission
// @route  POST /api/forms
exports.createForm = async (req, res) => {
  try {
    const data = {};
    TEXT_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    if (req.files) {
      if (req.files.file) data.file = buildFileMeta(req.files.file[0]);
      if (req.files.file2) data.file2 = buildFileMeta(req.files.file2[0]);
      
    }

    const form = await Form.create(data);
    res.status(201).json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc   Get all form submissions
// @route  GET /api/forms
exports.getForms = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [forms, total] = await Promise.all([
      Form.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Form.countDocuments(),
    ]);

    res.json({
      success: true,
      count: forms.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: forms,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc   Get single form submission
// @route  GET /api/forms/:id
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ success: false, message: "Form not found" });
    res.json({ success: true, data: form });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc   Update a form submission (supports replacing files)
// @route  PUT /api/forms/:id
exports.updateForm = async (req, res) => {
  try {
    const existing = await Form.findById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Form not found" });

    const data = {};
    TEXT_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) data[field] = req.body[field];
    });

    if (req.files) {
      ["file", "file2", "file3"].forEach((field) => {
        if (req.files[field]) {
          // remove old file from disk if replaced
          if (existing[field] && existing[field].path) removeFileFromDisk(existing[field].path);
          data[field] = buildFileMeta(req.files[field][0]);
        }
      });
    }

    const updated = await Form.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc   Delete a form submission (and its uploaded files)
// @route  DELETE /api/forms/:id
exports.deleteForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) return res.status(404).json({ success: false, message: "Form not found" });

    ["file", "file2", "file3"].forEach((field) => {
      if (form[field] && form[field].path) removeFileFromDisk(form[field].path);
    });

    await form.deleteOne();
    res.json({ success: true, message: "Form deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
