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

const BusinessSchema = new Schema(
  {
    first_choice: { type: String, required: true, trim: true },
    second_choice: { type: String, trim: true },

    business_address: { type: String, trim: true },
    company_nature: { type: String, trim: true },

    dob: { type: Date },
    Email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone_number: { type: String, trim: true },
    origin: { type: String, trim: true },
    card_number: { type: String, trim: true },
    home_address: { type: String, trim: true },
    l_origin: { type: String, trim: true },

    file: { type: FileMetaSchema, default: null },
    file2: { type: FileMetaSchema, default: null },
    file3: { type: FileMetaSchema, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("business", BusinessSchema);
