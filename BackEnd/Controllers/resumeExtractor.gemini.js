const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI for text extraction
const apiKey = process.env.GEMINI_API_KEY_EXTRACT ? process.env.GEMINI_API_KEY_EXTRACT.trim() : "";
console.log(`📄 New Resume Extractor initialized with Key: ${apiKey.substring(0, 10)}...`);
const genAI = new GoogleGenerativeAI(apiKey);

// Model configuration
const EXTRACTOR_MODEL = process.env.EXTRACTOR_MODEL || 'gemini-2.0-flash';

// Constants for error handling
const API_TIMEOUT = 45000; // 45 seconds for document processing
const MAX_RETRIES = 2;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Helper: Extract text from PDF or DOCX files
 */
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
        // Fallback: try reading as text
        return fs.readFileSync(filePath, "utf8");
    }
}

/**
 * Estimate token count (rough approximation)
 */
function estimateTokens(text) {
    return Math.ceil(text.length / 4);
}

/**
 * Build structured prompt for Gemini to extract portfolio data
 */
function buildExtractionPrompt(resumeText) {
    return `You are an AI assistant specialized in extracting structured data from resumes and CVs.

CRITICAL INSTRUCTIONS:
1. You MUST respond with ONLY valid JSON - no explanations, no markdown, no commentary
2. Extract ALL available information from the resume
3. If a field is not found, use empty string "" or empty array []
4. For arrays, extract ALL items found, not just a few
5. Maintain exact formatting and preserve all details

REQUIRED JSON STRUCTURE:
{
  "personalInfo": {
    "fullName": "",
    "location": "",
    "phone": "",
    "email": "",
    "github": "",
    "linkedin": "",
    "website": ""
  },
  "summary": {
    "headline": "",
    "careerObjective": ""
  },
  "skills": {
    "languages": [],
    "frameworks": [],
    "tools": [],
    "problemSolving": [],
    "concepts": []
  },
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "grade": ""
    }
  ],
  "experience": [
    {
      "title": "",
      "organization": "",
      "duration": "",
      "location": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "title": "",
      "date": "",
      "description": ""
    }
  ],
  "certifications": [
    {
      "title": "",
      "date": "",
      "description": ""
    }
  ]
}

RESUME CONTENT:
${resumeText.replace(/\n+/g, " ").substring(0, 50000)}

Remember: Output ONLY the JSON object, nothing else.`;
}

/**
 * Parse resume with Gemini API using retry logic
 */
// Model Priority List for Fallback (ALL FREE TIER MODELS)
const MODEL_PRIORITY = [
    process.env.EXTRACTOR_MODEL || 'gemini-2.5-flash',  // Primary: Latest stable version
    'gemini-2.5-flash-lite',  // Fallback 1: Lite version (most reliable for free tier)
    'gemini-2.0-flash',       // Fallback 2: Previous version (watch for rate limits)
];

/**
 * Parse resume with Gemini API using model fallback logic
 */
async function parseWithGemini(resumeText) {
    const prompt = buildExtractionPrompt(resumeText);
    let lastError;

    // Iterate through models in priority order
    for (const modelName of MODEL_PRIORITY) {
        console.log(`🤖 Attempting generation with model: ${modelName}`);

        // Retry logic per model (optional, but keep it simple for now: 1 attempt per model is usually better for rate limits)
        try {
            // Create timeout promise
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("API_TIMEOUT")), API_TIMEOUT);
            });

            const apiCallPromise = (async () => {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    generationConfig: {
                        temperature: 0.1,
                        topK: 1,
                        topP: 1,
                    }
                });

                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            })();

            const content = await Promise.race([apiCallPromise, timeoutPromise]);

            if (!content || typeof content !== 'string') {
                throw new Error("Empty or invalid response from Gemini API");
            }

            const jsonMatch = content.match(/\{[\s\S]*\}/);
            const jsonText = jsonMatch ? jsonMatch[0] : content;
            const parsed = JSON.parse(jsonText);

            if (!parsed || typeof parsed !== 'object') {
                throw new Error("Invalid JSON structure");
            }

            console.log(`✅ Success with model: ${modelName}`);
            return parsed;

        } catch (error) {
            console.warn(`⚠️ Failed with ${modelName}: ${error.message}`);
            lastError = error;

            // If rate limited (429), strictly convert to Next Model immediately
            if (error.message.includes("429") || error.message.includes("quota")) {
                console.log("📉 Quota exceeded, switching to fallback model...");
                await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause
                continue;
            }
            // For other errors, also continue to next model
        }
    }

    throw lastError || new Error("All models failed to extract resume data");
}

/**
 * Validate and sanitize extracted data
 */
function sanitizeExtractedData(parsed) {
    return {
        personalInfo: parsed.personalInfo || {
            fullName: "",
            location: "",
            phone: "",
            email: "",
            github: "",
            linkedin: "",
            website: "",
        },
        summary: parsed.summary || {
            headline: "",
            careerObjective: ""
        },
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
        certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
    };
}

/**
 * Main extraction endpoint
 * @route POST /api/resume/extract
 */
exports.extractResume = async (req, res) => {
    const startTime = Date.now();

    try {
        // ========== FILE VALIDATION ==========

        if (!req.file) {
            console.warn("⚠️ No file uploaded");
            return res.status(400).json({
                success: false,
                error: "No file uploaded",
                code: "MISSING_FILE"
            });
        }

        const filePath = req.file.path;
        const fileSize = req.file.size;
        const mimetype = req.file.mimetype;

        console.log(`📄 Processing file: ${req.file.originalname} (${(fileSize / 1024).toFixed(2)} KB)`);

        // Check file size
        if (fileSize > MAX_FILE_SIZE) {
            return res.status(400).json({
                success: false,
                error: `File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
                code: "FILE_TOO_LARGE"
            });
        }

        // Check file type
        const allowedTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'text/plain'
        ];

        if (!allowedTypes.includes(mimetype)) {
            return res.status(400).json({
                success: false,
                error: "Invalid file type. Please upload PDF, DOCX, or TXT files only",
                code: "INVALID_FILE_TYPE"
            });
        }

        // ========== API KEY CHECK ==========

        if (!process.env.GEMINI_API_KEY_EXTRACT) {
            console.error("❌ GEMINI_API_KEY_EXTRACT is not configured!");
            return res.status(500).json({
                success: false,
                error: "Extraction service is not properly configured. Please contact administrator.",
                code: "API_KEY_MISSING"
            });
        }

        // ========== TEXT EXTRACTION ==========

        let rawText;
        try {
            rawText = await extractTextFromFile(filePath, mimetype);
        } catch (extractError) {
            console.error("❌ Text extraction error:", extractError.message);
            return res.status(400).json({
                success: false,
                error: "Could not extract text from file. Please ensure the file is not corrupted.",
                code: "TEXT_EXTRACTION_FAILED",
                details: extractError.message
            });
        }

        // Validate extracted text
        if (!rawText || rawText.trim().length < 20) {
            console.warn("⚠️ Extracted text too short or empty");
            return res.status(400).json({
                success: false,
                error: "Could not extract sufficient text from file. The file may be empty or corrupted.",
                code: "INSUFFICIENT_TEXT"
            });
        }

        console.log(`📝 Extracted ${rawText.length} characters (≈${estimateTokens(rawText)} tokens)`);

        // ========== AI PARSING ==========

        let parsed;
        try {
            parsed = await parseWithGemini(rawText);
        } catch (parseError) {
            console.error("❌ AI parsing error:", parseError.message);

            // Specific error handling
            if (parseError.message === "API_TIMEOUT") {
                return res.status(504).json({
                    success: false,
                    error: "Processing took too long. Please try with a smaller file.",
                    code: "TIMEOUT_ERROR"
                });
            }

            if (parseError.message?.includes("API key") || parseError.message?.includes("401")) {
                return res.status(401).json({
                    success: false,
                    error: "Authentication failed with AI service. Please contact administrator.",
                    code: "AUTH_ERROR"
                });
            }

            if (parseError.message?.includes("rate limit") || parseError.message?.includes("429")) {
                return res.status(429).json({
                    success: false,
                    error: "Service is experiencing high demand. Please try again in a moment.",
                    code: "RATE_LIMIT_ERROR"
                });
            }

            return res.status(500).json({
                success: false,
                error: "Failed to parse resume. Please try again or contact support.",
                code: "PARSING_FAILED",
                ...(process.env.NODE_ENV === 'development' && {
                    debugMessage: parseError.message
                })
            });
        }

        // ========== DATA SANITIZATION ==========

        const sanitizedData = sanitizeExtractedData(parsed);

        // ========== SUCCESS RESPONSE ==========

        const responseTime = Date.now() - startTime;
        console.log(`✅ Resume extraction completed in ${responseTime}ms`);

        return res.json({
            success: true,
            data: sanitizedData,
            metadata: {
                filename: req.file.originalname,
                fileSize: fileSize,
                processingTime: responseTime,
                model: EXTRACTOR_MODEL,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        const responseTime = Date.now() - startTime;
        console.error(`❌ Unexpected error after ${responseTime}ms:`, error.message);
        console.error("Error stack:", error.stack);

        return res.status(500).json({
            success: false,
            error: "An unexpected error occurred during resume extraction.",
            code: "INTERNAL_ERROR",
            ...(process.env.NODE_ENV === 'development' && {
                debugMessage: error.message
            })
        });

    } finally {
        // ========== CLEANUP ==========

        // Delete uploaded file
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
                console.log(`🗑️ Cleaned up temporary file: ${req.file.originalname}`);
            } catch (cleanupError) {
                console.warn("⚠️ Failed to cleanup temporary file:", cleanupError.message);
            }
        }
    }
};
