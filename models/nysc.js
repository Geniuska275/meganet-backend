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

const NyscSchema = new Schema(
  {
    name: { type: String, trim: true },
    Email_address: { type: String, required: true, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"] },
    phone: { type: String, trim: true },
    nin: { type: String, trim: true },
    dob: { type: Date },

    state: { type: String, trim: true },
    lgo: { type: String, trim: true },
    address: { type: String, trim: true },
    stateBefore: { type: String, trim: true },

    bloodgroup: { type: String, trim: true, },
    genotype: { type: String, trim: true },

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

    kinRelationship: { type: String, trim: true },
    kinName: { type: String, trim: true },
    kinEmail: { type: String, trim: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, "Please provide a valid kin email"] },
    kinPhone: { type: String, trim: true },

    shirt: { type: String, trim: true },
    trouser: { type: String, trim: true },
    shoe: { type: String, trim: true },
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
  },
  { timestamps: true }
  
);

module.exports = mongoose.model("nysc", NyscSchema);
