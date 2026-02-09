const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const apiKey = process.env.GEMINI_API_KEY_EXTRACT ? process.env.GEMINI_API_KEY_EXTRACT.trim() : "";
console.log(`📄 Gemini Extractor initialized. Key present: ${!!apiKey}`);

const genAI = new GoogleGenerativeAI(apiKey);

// Model configuration with fallback priority (ALL FREE TIER MODELS)
// Updated based on actual model availability - avoiding 404 errors
const MODEL_PRIORITY = [
    process.env.EXTRACTOR_MODEL || 'gemini-2.0-flash',  // Primary: User preference or latest
    'gemini-pro',             // Fallback 1: Stable legacy model (reliable)
    'gemini-2.5-flash',       // Fallback 2: Latest flash model (limited free tier: 20 req/day)
];

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const API_TIMEOUT = 30000; // 30 seconds

/**
 * Helper: Extract text from PDF, DOCX, or TXT files
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
        // Fallback for .txt or other text-based files
        // This fixes the "Could not read file text" error in debug scripts
        return fs.readFileSync(filePath, "utf8");
    }
}

/**
 * Build structured prompt
 */
function buildExtractionPrompt(resumeText) {
    return `You are an AI assistant specialized in extracting structured data from resumes.
CRITICAL: Respond with ONLY valid JSON. No markdown, no explanations.

REQUIRED JSON STRUCTURE:
{
  "personalInfo": { "fullName": "", "location": "", "phone": "", "email": "", "github": "", "linkedin": "", "website": "" },
  "summary": { "headline": "", "careerObjective": "" },
  "skills": { "languages": [], "frameworks": [], "tools": [], "problemSolving": [], "concepts": [] },
  "education": [{ "degree": "", "institution": "", "year": "", "grade": "" }],
  "experience": [{ "title": "", "organization": "", "duration": "", "location": "", "description": "" }],
  "projects": [{ "title": "", "date": "", "description": "" }],
  "certifications": [{ "title": "", "date": "", "description": "" }]
}

RESUME CONTENT:
${resumeText.replace(/\n+/g, " ").substring(0, 50000)}
`;
}

/**
 * Parse resume with Gemini - with MODEL FALLBACK
 */
async function parseWithGemini(resumeText) {
    // TRUNCATE TEXT TO AVOID QUOTA ISSUES
    const truncatedText = resumeText.substring(0, 20000);
    if (resumeText.length > 20000) {
        console.log(`✂️ Truncated text from ${resumeText.length} to 20000 characters`);
    }

    let lastError = null;

    // Loop through models with fallback logic
    for (let i = 0; i < MODEL_PRIORITY.length; i++) {
        const modelName = MODEL_PRIORITY[i];

        try {
            console.log(`🤖 Attempting extraction with model: ${modelName} (Attempt ${i + 1}/${MODEL_PRIORITY.length})`);

            // Create timeout promise
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("API_TIMEOUT")), API_TIMEOUT);
            });

            // Create API call promise
            const apiCallPromise = (async () => {
                const model = genAI.getGenerativeModel({
                    model: modelName,
                    generationConfig: { temperature: 0.1, responseMimeType: "application/json" }
                });

                const prompt = buildExtractionPrompt(truncatedText);
                const result = await model.generateContent(prompt);
                const response = await result.response;
                return response.text();
            })();

            // Race between timeout and API call
            const text = await Promise.race([apiCallPromise, timeoutPromise]);

            // Clean up markdown if present
            const jsonText = text.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(jsonText);

            // If we get here, it succeeded
            console.log(`✅ Extraction successful with model: ${modelName}`);
            return parsed;

        } catch (attemptError) {
            lastError = attemptError;
            const errorMessage = attemptError.message || String(attemptError);

            // Categorize the error
            const isQuotaError = errorMessage.includes("quota") || errorMessage.includes("429");
            const isRateLimit = errorMessage.includes("rate limit");
            const isNotFound = errorMessage.includes("404") || errorMessage.includes("not found");
            const isTimeout = errorMessage.includes("timeout") || errorMessage === "API_TIMEOUT";
            const isNetwork = errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED");

            // Log the specific error type
            if (isQuotaError) {
                console.warn(`⚠️ Model ${modelName} quota exceeded`);
            } else if (isRateLimit) {
                console.warn(`⚠️ Model ${modelName} rate limit hit`);
            } else if (isNotFound) {
                console.warn(`⚠️ Model ${modelName} not found`);
            } else if (isTimeout) {
                console.warn(`⏱️ Model ${modelName} timed out after ${API_TIMEOUT}ms`);
            } else if (isNetwork) {
                console.warn(`🌐 Network error with model ${modelName}`);
            } else {
                console.warn(`⚠️ Model ${modelName} failed:`, errorMessage.substring(0, 100));
            }

            // Check if this was the last model in the list
            if (i === MODEL_PRIORITY.length - 1) {
                console.error("❌ All models failed. Returning mock data.");
                throw lastError; // Throw the last error to be caught in main handler
            }

            // Optional: Add a small delay before switching models (helps with rate limits)
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("🔄 Switching to fallback model...");
        }
    }

    // This should never be reached, but just in case
    throw lastError || new Error("All models exhausted");
}

/**
 * Mock Fallback Data (Safe Mode)
 */
function getMockData() {
    return {
        personalInfo: { fullName: "", email: "", phone: "", location: "" },
        summary: { headline: "Error extracting data", careerObjective: "Please enter details manually." },
        skills: { languages: [], frameworks: [], tools: [] },
        education: [],
        experience: [],
        projects: []
    };
}

/**
 * Sanitize Data
 */
function sanitizeExtractedData(parsed) {
    return {
        personalInfo: parsed.personalInfo || {},
        summary: parsed.summary || {},
        skills: parsed.skills || { languages: [], frameworks: [], tools: [] },
        education: Array.isArray(parsed.education) ? parsed.education : [],
        experience: Array.isArray(parsed.experience) ? parsed.experience : [],
        projects: Array.isArray(parsed.projects) ? parsed.projects : [],
        certifications: Array.isArray(parsed.certifications) ? parsed.certifications : [],
    };
}

/**
 * Main Controller
 */
exports.extractResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, error: "No file uploaded" });

        const filePath = req.file.path;
        console.log(`📄 Processing: ${req.file.originalname}`);

        // 1. Extract Text
        let rawText = "";
        try {
            rawText = await extractTextFromFile(filePath, req.file.mimetype);
        } catch (e) {
            console.error("Text extraction failed:", e);
            return res.json({ success: false, error: "Could not read file text", data: getMockData() });
        }

        if (!rawText || rawText.length < 50) {
            return res.json({ success: false, error: "File content too short", data: getMockData() });
        }

        // 2. Parse with AI (with automatic model fallback)
        let parsedData = {};
        try {
            parsedData = await parseWithGemini(rawText);
            console.log("✅ AI Extraction Successful");
        } catch (aiError) {
            const errorMessage = aiError.message || String(aiError);

            // ========== ERROR CATEGORIZATION ==========

            // Categorize error types
            const isQuotaError = errorMessage.includes("quota") || errorMessage.includes("429");
            const isRateLimit = errorMessage.includes("rate limit");
            const isApiKeyError = errorMessage.includes("API key") || errorMessage.includes("401") || errorMessage.includes("unauthorized");
            const isNetworkError = errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED") || errorMessage.includes("network");
            const isTimeout = errorMessage.includes("timeout") || errorMessage === "API_TIMEOUT";

            // Log specific error type
            if (isQuotaError) {
                console.error("🚦 Quota/Rate Limit Error - All models exhausted");
            } else if (isApiKeyError) {
                console.error("🔑 API Key Error");
            } else if (isNetworkError) {
                console.error("🌐 Network Connectivity Error");
            } else if (isTimeout) {
                console.error("⏱️ Request Timeout");
            } else {
                console.error("⚠️ AI Extraction Failed:", errorMessage.substring(0, 150));
            }

            // Determine user-friendly error message
            let userErrorMessage = "AI Extraction failed. Please fill details manually.";
            let errorCode = "AI_EXTRACTION_FAILED";

            if (isQuotaError || isRateLimit) {
                userErrorMessage = "AI quota limit reached. Please wait a moment or fill details manually.";
                errorCode = "QUOTA_EXCEEDED";
            } else if (isApiKeyError) {
                userErrorMessage = "AI service authentication failed. Please contact administrator.";
                errorCode = "AUTH_ERROR";
            } else if (isNetworkError) {
                userErrorMessage = "Network connection issue. Please check your internet and try again.";
                errorCode = "NETWORK_ERROR";
            } else if (isTimeout) {
                userErrorMessage = "AI service timed out. Please try with a shorter resume or fill manually.";
                errorCode = "TIMEOUT_ERROR";
            }

            console.warn(`⚠️ Returning fallback data with error: ${errorCode}`);

            // RETURN SUCCESS FALSE BUT WITH DATA so frontend doesn't crash
            return res.json({
                success: false,
                error: userErrorMessage,
                errorCode: errorCode,
                data: getMockData(),
                // Include debug info in development
                ...(process.env.NODE_ENV === 'development' && {
                    debugMessage: errorMessage.substring(0, 200)
                })
            });
        }

        // 3. Success Response
        const cleanData = sanitizeExtractedData(parsedData);
        res.json({ success: true, data: cleanData });

    } catch (error) {
        console.error("🔥 Critical Error:", error);
        // Always return JSON, never 500 HTML
        res.status(200).json({
            success: false,
            error: "System error during processing.",
            data: getMockData()
        });
    } finally {
        if (req.file) {
            try { fs.unlinkSync(req.file.path); } catch (e) { }
        }
    }
};
