const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function listAvailableModels() {
    try {
        console.log("Checking API keys...");
        console.log("GEMINI_API_KEY_CHATBOT:", process.env.GEMINI_API_KEY_CHATBOT ? "Present ✓" : "Missing ✗");
        console.log("GEMINI_API_KEY_EXTRACT:", process.env.GEMINI_API_KEY_EXTRACT ? "Present ✓" : "Missing ✗");
        console.log("\n" + "=".repeat(60));

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_CHATBOT);

        console.log("\nFetching available models...\n");

        // List all available models
        const models = await genAI.listModels();

        console.log(`Found ${models.length} available models:\n`);

        models.forEach((model, index) => {
            console.log(`${index + 1}. Model: ${model.name}`);
            console.log(`   Display Name: ${model.displayName}`);
            console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(", ") || "N/A"}`);
            console.log(`   Description: ${model.description || "N/A"}`);
            console.log("");
        });

        // Filter models that support generateContent
        const contentModels = models.filter(m =>
            m.supportedGenerationMethods?.includes("generateContent")
        );

        console.log("=".repeat(60));
        console.log(`\n✅ Models supporting 'generateContent' (${contentModels.length}):\n`);

        contentModels.forEach((model, index) => {
            console.log(`${index + 1}. ${model.name}`);
            console.log(`   → Use as: "${model.name.replace('models/', '')}"`);
        });

        if (contentModels.length > 0) {
            console.log("\n" + "=".repeat(60));
            console.log("\n💡 RECOMMENDATION:");
            console.log(`   Use this model name: "${contentModels[0].name.replace('models/', '')}"\n`);
        }

    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
        console.error("\nFull error:", error);
    }
}

listAvailableModels();
