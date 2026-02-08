const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Common model names to try
const modelsToTry = [
    "gemini-pro",
    "gemini-1.0-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-flash",
    "gemini-1.0-pro-latest",
    "gemini-1.5-pro-latest",
    "gemini-1.5-flash-latest"
];

async function testModels() {
    console.log("Testing different model names...\n");
    console.log("API Key present:", process.env.GEMINI_API_KEY_CHATBOT ? "✓" : "✗");
    console.log("=".repeat(60) + "\n");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_CHATBOT);

    for (const modelName of modelsToTry) {
        try {
            console.log(`Testing: ${modelName}...`);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ SUCCESS with "${modelName}"`);
            console.log(`   Response: "${text.substring(0, 50)}..."\n`);
            console.log("=".repeat(60));
            console.log(`\n🎯 USE THIS MODEL: "${modelName}"\n`);
            console.log("=".repeat(60));
            break;

        } catch (error) {
            console.log(`❌ Failed: ${error.message.substring(0, 80)}...\n`);
        }
    }
}

testModels();
