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
    address: { type: String, trim: true },
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

    file: { type: FileMetaSchema, default: null },
    file2: { type: FileMetaSchema, default: null },
    file3: { type: FileMetaSchema, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ngo", NgoSchema);
