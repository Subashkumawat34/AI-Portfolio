const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testSpecificModel() {
    const modelName = "gemini-2.0-flash-exp";
    const chatbotKey = process.env.GEMINI_API_KEY_CHATBOT;
    const extractKey = process.env.GEMINI_API_KEY_EXTRACT;

    console.log(`Testing: ${modelName}\n`);
    console.log("=".repeat(60));

    // Test CHATBOT key
    console.log("\n1. Testing CHATBOT KEY:");
    try {
        const genAI = new GoogleGenerativeAI(chatbotKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello! Respond with just one word.");
        const text = result.response.text();
        console.log(`✅ CHATBOT KEY WORKS!`);
        console.log(`   Response: ${text}\n`);
    } catch (err) {
        console.log(`❌ CHATBOT KEY FAILED`);
        console.log(`   Error: ${err.message}\n`);
    }

    // Test EXTRACT key
    console.log("2. Testing EXTRACT KEY:");
    try {
        const genAI = new GoogleGenerativeAI(extractKey);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello! Respond with just one word.");
        const text = result.response.text();
        console.log(`✅ EXTRACT KEY WORKS!`);
        console.log(`   Response: ${text}\n`);
    } catch (err) {
        console.log(`❌ EXTRACT KEY FAILED`);
        console.log(`   Error: ${err.message}\n`);
    }

    console.log("=".repeat(60));
}

testSpecificModel();
