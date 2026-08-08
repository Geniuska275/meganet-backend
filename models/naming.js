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

const NamingSchema = new Schema(
  {
     // --- Applicant's choices ---
    first_choice: { type: String, required: true, trim: true },
    second_choice: { type: String, trim: true },
    Email_address: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] },
    
    // --- Company info ---
    company_address: { type: String, trim: true },
    company_does: { type: String, trim: true }, // what the company does
    company_nature: { type: String, trim: true }, // nature of the company

    // --- Applicant personal info ---
    dob: { type: Date },
    address: { type: String, trim: true },
    phone_number: { type: String, trim: true },
    origin: { type: String, trim: true },
    card_number: { type: String, trim: true },
    home_address: { type: String, trim: true },

    // --- Dependent ("d_") info ---
    d_fullname: { type: String, trim: true },
    d_address: { type: String, trim: true },
    d_dob: { type: Date },
    d_phone_number: { type: String, trim: true },
    d_origin: { type: String, trim: true },

    // --- Uploaded files ---
    file: { type: FileMetaSchema, default: null },
    file2: { type: FileMetaSchema, default: null },
    file3: { type: FileMetaSchema, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("naming", NamingSchema);
