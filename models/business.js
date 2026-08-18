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
    second_choice: { type: String, trim: true ,required: true,},

    business_address: { type: String, trim: true,required: true, },
    company_nature: { type: String, trim: true ,required: true,},

    dob: { type: Date },
    Email_address: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      required: true,
    },
    phone_number: { type: String, trim: true ,required: true,},
    origin: { type: String, trim: true ,required: true,},
    card_number: { type: String, trim: true ,required: true,},
    home_address: { type: String, trim: true ,required: true,},
    l_origin: { type: String, trim: true ,required: true,},

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

module.exports = mongoose.model("business", BusinessSchema);
