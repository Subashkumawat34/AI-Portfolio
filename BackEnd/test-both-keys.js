const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testBothKeys() {
    console.log("=".repeat(60));
    console.log("TESTING NEW API KEYS");
    console.log("=".repeat(60));

    const extractKey = process.env.GEMINI_API_KEY_EXTRACT;
    const chatbotKey = process.env.GEMINI_API_KEY_CHATBOT;

    console.log("\nAPI Keys:");
    console.log(`Extract: ${extractKey}`);
    console.log(`Chatbot: ${chatbotKey}`);

    // Test Extract Key
    console.log("\n" + "-".repeat(60));
    console.log("Testing EXTRACT Key (for Resume Upload)");
    console.log("-".repeat(60));
    try {
        const genAI = new GoogleGenerativeAI(extractKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say hello in one word");
        const response = await result.response;
        const text = response.text();
        console.log("✅ EXTRACT KEY WORKS!");
        console.log(`Response: ${text}`);
    } catch (error) {
        console.log("❌ EXTRACT KEY FAILED!");
        console.log(`Error: ${error.message}`);
    }

    // Test Chatbot Key
    console.log("\n" + "-".repeat(60));
    console.log("Testing CHATBOT Key (for AI Chatbot)");
    console.log("-".repeat(60));
    try {
        const genAI = new GoogleGenerativeAI(chatbotKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Say hello in one word");
        const response = await result.response;
        const text = response.text();
        console.log("✅ CHATBOT KEY WORKS!");
        console.log(`Response: ${text}`);
    } catch (error) {
        console.log("❌ CHATBOT KEY FAILED!");
        console.log(`Error: ${error.message}`);
    }

    console.log("\n" + "=".repeat(60));
}

testBothKeys();
