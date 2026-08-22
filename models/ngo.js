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

const NgoSchema = new Schema(
  {
    first_choice: { type: String, required: true, trim: true },
    second_choice: { type: String, trim: true },
    third_choice: { type: String, trim: true },
    aim1: { type: String, trim: true },
    aim2: { type: String, trim: true },
    company_address: { type: String, trim: true },
    company_does: { type: String, trim: true },
    company_nature: { type: String, trim: true },
    dob: { type: Date },
    Email_address: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] }, 
    phone_number: { type: String, trim: true },
    origin: { type: String, trim: true },
    card_number: { type: String, trim: true },
    home_address: { type: String, trim: true },
    ngo_address: { type: String, trim: true },
    d_fullname: { type: String, trim: true },
    d_address: { type: String, trim: true },
    d_dob: { type: Date },
    d_phone_number: { type: String, trim: true },
    d_origin: { type: String, trim: true },
    s_fullname: { type: String, trim: true },
    s_address: { type: String, trim: true },
    s_dob: { type: Date },
    s_phone_number: { type: String, trim: true },
    s_card_number: { type: String, trim: true },
    s_home_address: { type: String, trim: true },
    s_origin: { type: String, trim: true },
    file: { 
       originalName: String,
       fileName: String,
       path: String,
       mime: String,
       size:Number, 
      },
    file2: {
      originalName: String,
       fileName: String,
       path: String,
       mime: String,
       size:Number,
      },
    file3: { 
        originalName: String,
       fileName: String,
       path: String,
       mime: String,
       size:Number,
       },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ngo", NgoSchema);
