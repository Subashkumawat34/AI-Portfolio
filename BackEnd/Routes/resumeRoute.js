const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse"); // This must be a function!
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only PDF, DOCX, and TXT files are allowed!"), false);
  },
});

// Gemini model setup
// Gemini model setup
if (!process.env.GEMINI_API_KEY_EXTRACT) {
  console.error("❌ GEMINI_API_KEY_EXTRACT is missing in environment variables!");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_EXTRACT);
let model;
try {
  model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
} catch (err) {
  console.warn("⚠️ Falling back to gemini-2.5-flash due to model error");
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

// Extraction Helper — robust & clean
async function extractTextFromFile(filePath, mimetype) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (ext === ".pdf" || mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      if (typeof pdfParse !== "function") {
        throw new Error(
          "pdfParse is not a function after reinstallation! Check your node_modules."
        );
      }
      const parsed = await pdfParse(dataBuffer);
      if (!parsed.text || parsed.text.trim().length === 0)
        throw new Error("No text extracted from PDF.");
      return parsed.text;
    } else if (ext === ".docx" || mimetype.includes("word")) {
      const result = await mammoth.extractRawText({ path: filePath });
      if (!result.value || result.value.trim().length === 0)
        throw new Error("No text extracted from DOCX.");
      return result.value;
    } else {
      const txt = fs.readFileSync(filePath, "utf8");
      if (!txt || txt.trim().length === 0)
        throw new Error("No text extracted from TXT file.");
      return txt;
    }
  } catch (err) {
    console.error("❌ [extractTextFromFile] Error:", err.message);
    throw new Error("Failed to extract text: " + err.message);
  }
}

// Prompt for Gemini
function buildPrompt(resumeText) {
  return `
You are an intelligent resume parser. Return ONLY a valid JSON object with this shape, no other commentary or formatting:
{
  "personalInfo": { "fullName": "", "location": "", "phone": "", "email": "", "github": "", "linkedin": "", "website": "" },
  "summary": { "headline": "", "careerObjective": "" },
  "skills": { "languages": [], "frameworks": [], "tools": [], "problemSolving": [], "concepts": [] },
  "education": [],
  "experience": [],
  "projects": [],
  "certifications": []
}
If any field is missing, return empty strings or empty arrays. Resume content:
"""${resumeText.replace(/\n+/g, " ")}"""
`;
}

// Gemini model parser call
async function parseWithGemini(resumeText) {
  const prompt = buildPrompt(resumeText);
  try {
    const result = await model.generateContent(prompt);
    const raw = result.response.text();
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Model output does not contain valid JSON");
    const jsonText = jsonMatch[0];
    const parsed = JSON.parse(jsonText);
    return parsed;
  } catch (err) {
    console.error("❌ [parseWithGemini] Error:", err.message || err);
    throw new Error("Gemini parsing failed: " + err.message);
  }
}

// Main API route for extracting resume data
router.post("/extract-resume", upload.single("resume"), async (req, res) => {
  if (!req.file) {
    console.error("[Upload] No file in request");
    return res.status(400).json({ error: "No file uploaded." });
  }
  const filePath = req.file.path;
  const mimetype = req.file.mimetype;

  try {
    console.log(`[Upload] Processing file: ${filePath}, type: ${mimetype}`);
    const resumeText = await extractTextFromFile(filePath, mimetype);
    if (!resumeText || resumeText.trim().length < 20) {
      throw new Error("Resume content too short or empty.");
    }
    const parsed = await parseWithGemini(resumeText);
    const safe = {
      personalInfo: parsed.personalInfo || {
        fullName: "",
        location: "",
        phone: "",
        email: "",
        github: "",
        linkedin: "",
        website: "",
      },
      summary: parsed.summary || { headline: "", careerObjective: "" },
      skills: parsed.skills || {
        languages: [],
        frameworks: [],
        tools: [],
        problemSolving: [],
        concepts: [],
      },
      education: Array.isArray(parsed.education) ? parsed.education : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects : [],
      certifications: Array.isArray(parsed.certifications)
        ? parsed.certifications
        : [],
    };
    res.json(safe);
  } catch (err) {
    console.error("Resume extraction error:", err.message || err);
    res.status(500).json({
      error: "Failed to process resume.",
      detail: err.message || err,
    });
  } finally {
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.warn("File cleanup failed:", e.message || e);
    }
  }
});

module.exports = router;

// node modules
