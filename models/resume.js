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

const ResumeSchema = new Schema(
  {
   fullname: { type: String, required: true, trim: true },
    gender: { type: String, trim: true },
    dob: { type: Date },
    l_origin: { type: String, trim: true },
    origin: { type: String, trim: true },
    phone_number: { type: String, trim: true },
    email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    card_number: { type: String, trim: true },
    home_address: { type: String, trim: true },
    hobby: { type: String, trim: true },
    spoken: { type: String, trim: true },

    pfrom: { type: String, trim: true },
    pto: { type: String, trim: true },
    sfrom: { type: String, trim: true },
    sto: { type: String, trim: true },
    tfrom: { type: String, trim: true },
    tto: { type: String, trim: true },

    qualification: { type: String, trim: true },
    tqualification: { type: String, trim: true },

    company: { type: String, trim: true },
    post: { type: String, trim: true },
    to: { type: String, trim: true },
    te: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resume", ResumeSchema);
