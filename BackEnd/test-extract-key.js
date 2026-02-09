const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testExtractKey() {
    const key = process.env.GEMINI_API_KEY_EXTRACT;
    console.log(`Testing key: ${key.substring(0, 10)}...`);

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        console.log("Sending request to gemini-2.0-flash...");
        const result = await model.generateContent("Hello");
        console.log("✅ Success! Response:", result.response.text());
    } catch (error) {
        console.error("❌ Failed:", error.message);
    }
}

testExtractKey();
