const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Import the proper controller with model fallback logic
const { extractResume } = require("../Controllers/resumeExtractor.gemini");

// Configure multer for file uploads
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOCX, and TXT files are allowed!"), false);
    }
  },
});

// Route: POST /extract-resume
// Handles resume file upload and extraction using the proper controller
router.post("/extract-resume", upload.single("resume"), extractResume);

module.exports = router;
