// CommonJS version (if your project uses require). If you use ES modules, convert imports.
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Helper: extract text from PDF or DOCX
async function extractTextFromFile(filePath, mimetype) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".pdf" || mimetype === "application/pdf") {
    const data = fs.readFileSync(filePath);
    const parsed = await pdfParse(data);
    return parsed.text || "";
  } else if (ext === ".docx" || mimetype.includes("word")) {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  } else {
    // fallback: try reading as text
    return fs.readFileSync(filePath, "utf8");
  }
}

// Build a safe prompt instructing model to return ONLY JSON in required shape:
function buildPrompt(resumeText) {
  return `
You are an assistant that MUST extract structured portfolio data from a resume. 
Return ONLY valid JSON (no extra commentary). The JSON keys and expected types are:

{
  "personalInfo": {
    "fullName": string,
    "location": string,
    "phone": string,
    "email": string,
    "github": string,
    "linkedin": string,
    "website": string
  },
  "summary": {
    "headline": string,
    "careerObjective": string
  },
  "skills": {
    "languages": [string],
    "frameworks": [string],
    "tools": [string],
    "problemSolving": [string],
    "concepts": [string]
  },
  "education": [
    { "degree": string, "institution": string, "year": string, "grade": string }
  ],
  "experience": [
    { "title": string, "organization": string, "duration": string, "location": string, "description": string }
  ],
  "projects": [
    { "title": string, "date": string, "description": string }
  ],
  "certifications": [
    { "title": string, "date": string, "description": string }
  ]
}

If some sections or fields are not present, return empty strings or empty arrays/objects as appropriate. Keep lists short — split items by commas if needed.

Resume content:
"""${resumeText.replace(/\n+/g, " ")}"""
  `;
}

async function parseWithOpenAI(resumeText) {
  const prompt = buildPrompt(resumeText);

  // Use Chat Completions (OpenAI node client). Adjust model to your access level.
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // use model you have access to
    messages: [
      { role: "system", content: "You are a strict JSON extractor." },
      { role: "user", content: prompt },
    ],
    temperature: 0,
    max_tokens: 1000,
  });

  const content = completion.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI");

  // Try to find JSON substring if model accidentally adds text
  const jsonTextMatch = content.match(/\{[\s\S]*\}$/);
  const jsonText = jsonTextMatch ? jsonTextMatch[0] : content;

  return JSON.parse(jsonText);
}

exports.extractResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = req.file.path;
  try {
    const rawText = await extractTextFromFile(filePath, req.file.mimetype);

    // Optional lightweight fallback: if text too short, reply with error
    if (!rawText || rawText.trim().length < 20) {
      throw new Error("Could not extract text from file");
    }

    const parsed = await parseWithOpenAI(rawText);

    // Safety: ensure keys exist and types match; provide defaults
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
    console.error("Resume extraction error:", err);
    res
      .status(500)
      .json({ error: "Failed to parse resume", detail: err.message });
  } finally {
    // cleanup uploaded file
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      /* ignore */
    }
  }
};
