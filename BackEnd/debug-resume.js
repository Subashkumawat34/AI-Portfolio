const { extractResume } = require("./Controllers/resumeExtractor.gemini");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Define path relative to where script is run
const samplePath = path.join(__dirname, "resume-sample.txt");

// Create dummy resume file
const dummyResumeContent = `
John Doe
Software Engineer
San Francisco, CA
john@example.com
(555) 123-4567

Summary:
Experienced software engineer with expertise in Node.js and React.

Experience:
Senior Developer at Tech Co (2020-Present)
- Built scalable APIs
- Managed team of 5

Education:
BS Computer Science, University of Tech (2016-2020)

Skills:
JavaScript, TypeScript, Node.js, React, AWS
`;

fs.writeFileSync(samplePath, dummyResumeContent);

if (!fs.existsSync(samplePath)) {
    console.error("❌ Failed to create sample file!");
    process.exit(1);
}

// Mock Express Request and Response
const mockReq = {
    file: {
        path: samplePath,
        originalname: "resume-sample.txt",
        size: Buffer.byteLength(dummyResumeContent),
        mimetype: "text/plain"
    }
};

const mockRes = {
    status: (code) => {
        console.log(`\n[Response Status]: ${code}`);
        fs.appendFileSync("response.log", `Status: ${code}\n`);
        return mockRes;
    },
    json: (data) => {
        console.log("\n[Response Data]:");
        console.log(JSON.stringify(data, null, 2));
        fs.appendFileSync("response.log", JSON.stringify(data, null, 2));
        return mockRes;
    }
};

console.log("🚀 Starting Resume Extraction Debug...");
console.log("File Path:", samplePath);
console.log("Check API Key present:", !!process.env.GEMINI_API_KEY_EXTRACT);
console.log("Model Extractor:", process.env.EXTRACTOR_MODEL);

(async () => {
    try {
        await extractResume(mockReq, mockRes);
    } catch (error) {
        console.error("🔥 CRITICAL ERROR IN SCRIPT:", error);
        fs.writeFileSync("error.log", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    }
})();
