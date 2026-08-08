const mongoose = require("mongoose");
const { Schema } = mongoose;

// Sub-schema used for each uploaded file field (file, file2, file3)
const FileMetaSchema = new Schema(
  {
    originalName: { type: String },
    fileName: { type: String }, // name stored on disk
    path: { type: String }, // relative path e.g. /uploads/xxxx.png
    mimeType: { type: String },
    size: { type: Number },
  },
  { _id: false }
);

const NerdSchema = new Schema(
  {
       // --- Basic info ---
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone: { type: String, trim: true },
    nin: { type: String, trim: true },
    dob: { type: Date },

    // --- Location ---
    state: { type: String, trim: true },
    lgo: { type: String, trim: true },
    address: { type: String, trim: true },
    stateBefore: { type: String, trim: true },

    // --- Medical ---
    bloodgroup: {
      type: String,
      trim: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", ""],
    },
    genotype: {
      type: String,
      trim: true,
      enum: ["AA", "AS", "SS", "AC", "SC", ""],
    },

    // --- Registration / education ---
    registration: { type: String, trim: true },
    matric: { type: String, trim: true },
    place: { type: String, trim: true },
    language: { type: String, trim: true },
    level: { type: String, trim: true },

    prifrom: { type: String, trim: true },
    prito: { type: String, trim: true },
    secfrom: { type: String, trim: true },
    secto: { type: String, trim: true },
    tetfrom: { type: String, trim: true },
    tetto: { type: String, trim: true },

    // --- Next of kin ---
    kinRelationship: { type: String, trim: true },
    kinName: { type: String, trim: true },
    kinEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid kin email"],
    },
    kinPhone: { type: String, trim: true },

    // --- Uniform sizes ---
    shirt: { type: String, trim: true },
    trouser: { type: String, trim: true },
    shoe: { type: String, trim: true },

    // --- Uploaded files ---
    file: { type: FileMetaSchema, default: null },
    file2: { type: FileMetaSchema, default: null },
  },
  { timestamps: true }
  
);

module.exports = mongoose.model("nerd", NerdSchema);
