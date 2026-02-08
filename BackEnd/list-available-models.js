// Directly fetch and display available models
const fetch = require('node-fetch');
require("dotenv").config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY_CHATBOT;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    console.log("Fetching available models...\n");

    try {
        const response = await fetch(url);
        const data = await response.json();
        require('fs').writeFileSync('my-models.txt', JSON.stringify(data, null, 2));

        if (data.error) {
            console.log("❌ Error from API:");
            console.log(JSON.stringify(data.error, null, 2));
            return;
        }

        if (!data.models) {
            console.log("❌ No models in response");
            console.log(JSON.stringify(data, null, 2));
            return;
        }

        console.log(`Found ${data.models.length} models:\n`);

        const generateModels = data.models.filter(m =>
            m.supportedGenerationMethods?.includes('generateContent')
        );

        console.log("Models supporting generateContent:");
        console.log("=".repeat(70));

        generateModels.forEach(model => {
            const modelName = model.name.replace('models/', '');
            console.log(`\n✓ ${modelName}`);
            console.log(`  Display: ${model.displayName || 'N/A'}`);
            console.log(`  Methods: ${model.supportedGenerationMethods.join(', ')}`);
        });

        if (generateModels.length > 0) {
            console.log("\n" + "=".repeat(70));
            console.log(`\n🎯 Use this model: "${generateModels[0].name.replace('models/', '')}"`);
        }

    } catch (error) {
        console.log("❌ Fetch error:", error.message);
    }
}

listModels();
