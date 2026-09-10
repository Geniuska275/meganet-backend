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
    firstname: { type: String, required: true, trim: true },
    Email_address: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    PhoneNumber: { type: String, trim: true },
    nin: { type: String, trim: true },
    Dob: { type: Date },
    State: { type: String, trim: true },
    Lga: { type: String, trim: true },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    Phone: { type: String, trim: true },
    FullName: { type: String, trim: true },
    Email_Address: { type: String, trim: true },
    institution: { type: String, trim: true },
    faculty: { type: String, trim: true },
    Department: { type: String, trim: true },
    programmeType: { type: String, trim: true },
    MatricNumber: { type: String, trim: true },
    Course: { type: String, trim: true },
    middlename: { type: String, trim: true },
    surname: { type: String, trim: true },
    nationality: { type: String, trim: true },
    MaritalStatus: { type: String, trim: true },
    

   
    cost:{
      type:Number,
      trim:true
    },

    // --- Uploaded files ---
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
       file4: {
      originalName: String,
       fileName: String,
       path: String,
       mime: String,
       size:Number,
      },
       file5: {
      originalName: String,
       fileName: String,
       path: String,
       mime: String,
       size:Number,
      },
  },
  { timestamps: true }
  
);

module.exports = mongoose.model("nerd", NerdSchema);
