// Simple script to find working Gemini model
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function findWorkingModel() {
    const key = process.env.GEMINI_API_KEY_CHATBOT;
    console.log("Testing API key:", key.substring(0, 15) + "...\n");

    // Try formats from Google's documentation
    const models = [
        "gemini-1.5-flash-8b",
        "gemini-2.0-flash-exp",
        "gemini-exp-1206",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro"
    ];

    for (const modelName of models) {
        try {
            console.log(`Testing: ${modelName}...`);
            const genAI = new GoogleGenerativeAI(key);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            const text = result.response.text();
            console.log(`\n✅✅✅ SUCCESS! Model "${modelName}" WORKS!\n`);
            console.log(`Response: ${text}\n`);
            return modelName;
        } catch (err) {
            console.log(`   ❌ ${err.message.split(':')[0]}`);
        }
    }
    console.log("\n❌ None worked. Checking what models are available...\n");

    // List models via API
    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.models) {
            console.log("📋 Available models:");
            data.models.filter(m => m.supportedGenerationMethods?.includes('generateContent')).forEach(m => {
                console.log(`  ✓ ${m.name.replace('models/', '')}`);
            });
        }
    } catch (e) {
        console.log("Could not list models:", e.message);
    }
}

findWorkingModel();
