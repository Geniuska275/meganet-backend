require("dotenv").config();
const fs = require("fs");

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
const personalRoutes = require("./routes/personalRoutes");
const nyscRoutes = require("./routes/nyscRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
const businessRoutes = require("./routes/businessRoutes");
const nerdRoutes = require("./routes/businessRoutes");




const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/check-image", (req, res) => {
  const filePath = path.join(
    __dirname,
    "uploads",
    "images",
    "1787237418679-22672290.jpeg"
  );

  res.json({
    filePath: filePath,
    exists: fs.existsSync(filePath),
    uploadsExists: fs.existsSync(path.join(__dirname, "uploads")),
    imagesExists: fs.existsSync(path.join(__dirname, "uploads", "images")),
    files: fs.existsSync(path.join(__dirname, "uploads", "images"))
      ? fs.readdirSync(path.join(__dirname, "uploads", "images"))
      : []
  });
});
// Routes
app.use("/api/forms", formRoutes);
app.use("/api/personal", personalRoutes);
app.use("/api/nysc", nyscRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/business", businessRoutes);

app.use("/api/nerd", nerdRoutes);
// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Form backend is running" });
});


// Multer / general error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
