```javascript
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testWithDifferentFormats() {
    const apiKey = process.env.GEMINI_API_KEY_CHATBOT;
    console.log("Testing with API Key:", apiKey.substring(0, 20) + "...");
    console.log("\n" + "=".repeat(70));

    for (const modelName of modelsToTry) {
        try {
            console.log(`\nTrying: "${modelName}"`);
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: modelName });

            const result = await model.generateContent("Return only the word 'SUCCESS'");
            const response = await result.response;
            const text = response.text();

            console.log(`✅ SUCCESS with "${modelName}"!`);
            console.log(`   Response: ${ text } `);
            console.log(`\n🎉 WORKING MODEL FOUND: ${ modelName } `);
            return modelName;

        } catch (error) {
            console.log(`❌ Failed: ${ error.message.substring(0, 80) }...`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log("\n" + "=".repeat(70));
    console.log("❌ NO WORKING MODELS FOUND");
    console.log("\nTrying to list available models...\n");

    // Try to list models
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
const data = await response.json();

if (data.models) {
    console.log("✅ Available models:");
    data.models.forEach(m => {
        console.log(`   - ${m.name} (${m.displayName || 'N/A'})`);
        if (m.supportedGenerationMethods) {
            console.log(`     Methods: ${m.supportedGenerationMethods.join(', ')}`);
        }
    });
} else {
    console.log("❌ Could not list models");
    console.log("Response:", JSON.stringify(data, null, 2));
}
    } catch (e) {
    console.log("❌ Error listing models:", e.message);
}
}

testWithDifferentFormats();
