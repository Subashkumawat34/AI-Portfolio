const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const modelsToTest = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
    "gemini-1.0-pro-latest",
    "gemini-pro",
    "gemini-pro-vision",
    "text-bison-001",
];

async function testModel(modelName, apiKey, keyName) {
    try {
        console.log(`\n🧪 Testing: ${modelName} with ${keyName}...`);
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent("Say 'Hello' in one word.");
        const response = await result.response;
        const text = response.text();

        console.log(`✅ SUCCESS with ${modelName}!`);
        console.log(`   Response: ${text}`);
        return { model: modelName, success: true, response: text };
    } catch (error) {
        console.log(`❌ FAILED: ${error.message.substring(0, 100)}...`);
        return { model: modelName, success: false, error: error.message };
    }
}

async function findWorkingModel() {
    console.log("=".repeat(70));
    console.log("TESTING GEMINI MODEL COMPATIBILITY");
    console.log("=".repeat(70));

    const chatbotKey = process.env.GEMINI_API_KEY_CHATBOT;
    const extractKey = process.env.GEMINI_API_KEY_EXTRACT;

    console.log("\n📊 API Keys Status:");
    console.log(`   CHATBOT KEY: ${chatbotKey ? "Present ✓" : "Missing ✗"}`);
    console.log(`   EXTRACT KEY: ${extractKey ? "Present ✓" : "Missing ✗"}`);

    const results = { chatbot: [], extract: [] };

    // Test with CHATBOT key
    console.log("\n\n🔑 TESTING WITH CHATBOT KEY:");
    console.log("-".repeat(70));
    for (const modelName of modelsToTest) {
        const result = await testModel(modelName, chatbotKey, "CHATBOT");
        results.chatbot.push(result);
        await new Promise(resolve => setTimeout(resolve, 500)); // Rate limiting
    }

    // Test with EXTRACT key  
    console.log("\n\n🔑 TESTING WITH EXTRACT KEY:");
    console.log("-".repeat(70));
    for (const modelName of modelsToTest) {
        const result = await testModel(modelName, extractKey, "EXTRACT");
        results.extract.push(result);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Summary
    console.log("\n\n" + "=".repeat(70));
    console.log("SUMMARY OF RESULTS");
    console.log("=".repeat(70));

    const chatbotWorking = results.chatbot.filter(r => r.success);
    const extractWorking = results.extract.filter(r => r.success);

    console.log(`\n✅ CHATBOT KEY - Working Models: ${chatbotWorking.length}/${modelsToTest.length}`);
    if (chatbotWorking.length > 0) {
        chatbotWorking.forEach(r => console.log(`   ✓ ${r.model}`));
        console.log(`\n💡 RECOMMENDATION: Use "${chatbotWorking[0].model}" for chatbot`);
    } else {
        console.log("   ❌ No working models found!");
    }

    console.log(`\n✅ EXTRACT KEY - Working Models: ${extractWorking.length}/${modelsToTest.length}`);
    if (extractWorking.length > 0) {
        extractWorking.forEach(r => console.log(`   ✓ ${r.model}`));
        console.log(`\n💡 RECOMMENDATION: Use "${extractWorking[0].model}" for resume extraction`);
    } else {
        console.log("   ❌ No working models found!");
    }

    // Generate fix suggestions
    if (chatbotWorking.length > 0 || extractWorking.length > 0) {
        console.log("\n\n📝 NEXT STEPS:");
        console.log("-".repeat(70));
        if (chatbotWorking.length > 0) {
            console.log(`\n1. Update chatbot.controller.js line 100:`);
            console.log(`   model = genAI.getGenerativeModel({ model: "${chatbotWorking[0].model}" });`);
        }
        if (extractWorking.length > 0) {
            console.log(`\n2. Update resumeRoute.js line 34:`);
            console.log(`   model = genAI.getGenerativeModel({ model: "${extractWorking[0].model}" });`);
        }
        console.log("\n3. Restart the backend server");
    } else {
        console.log("\n\n⚠️  NO WORKING MODELS FOUND!");
        console.log("You MUST get new API keys from: https://makersuite.google.com/app/apikey");
    }

    console.log("\n" + "=".repeat(70));
}

findWorkingModel().catch(console.error);
