const axios = require('axios');
require("dotenv").config();

async function listModels() {
    const key = process.env.GEMINI_API_KEY_EXTRACT;
    // ...
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        // ...

        if (data.error) {
            console.log("❌ Error response:", JSON.stringify(data.error, null, 2));
            return;
        }

        if (!data.models) {
            console.log("❌ No models found in response.");
            return;
        }

        console.log(`✅ Found ${data.models.length} models.`);
        const models = data.models
            .filter(m => m.supportedGenerationMethods.includes("generateContent"))
            .map(m => m.name.replace("models/", ""));

        console.log("Available generateContent models:");
        console.log(models.join("\n"));

        require("fs").writeFileSync("extract-models.txt", models.join("\n"));

    } catch (error) {
        console.error("❌ Network error:", error.message);
    }
}

listModels();
