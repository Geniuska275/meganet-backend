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

const PersonalSchema = new Schema(
  {
    fullname: { type: String, required: true, trim: true },
    Email_address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    phone_number: { type: String, trim: true },
    institution: { type: String, trim: true },
    study: { type: String, trim: true },
    destination: { type: String, trim: true },
    website: { type: String, trim: true },
    cost:{
      type:Number,
      trim:true
    },
    file:{ 
           originalName: String,
           fileName: String,
           path: String,
           mime: String,
           size:Number,
          
          },
  },
  { timestamps: true }

);

module.exports = mongoose.model("personal", PersonalSchema);
