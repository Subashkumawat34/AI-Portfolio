// Test the newly found models
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function testModels() {
    const key = process.env.GEMINI_API_KEY_CHATBOT;

    // Try these newer model names found from API
    const modelsToTest = [
        "gemini-2.0-flash-exp",
        "gemini-exp-1206",
        "gemini-1.5-flash-8b",
        "learnlm-1.5-pro-experimental"
    ];

    console.log("Testing models found from API list...\n");

    for (const modelName of modelsToTest) {
        try {
            console.log(`Testing: ${modelName}`);
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say hello in one word");
            const text = result.response.text();
            console.log(`✅ WORKS! Response: ${text}\n`);

            // If this one works, use it!
            console.log(`\n🎯 RECOMMENDED MODEL: ${modelName}\n`);
            return modelName;

        } catch (err) {
            console.log(`❌ Failed: ${err.message.substring(0, 60)}...\n`);
        }
    }
}

testModels();
