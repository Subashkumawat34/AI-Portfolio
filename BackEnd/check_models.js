require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_EXTRACT || process.env.GEMINI_API_KEY_CHATBOT);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Dummy init to access client? No, need ModelService.

        // The SDK doesn't always expose listModels directly easily in all versions, 
        // but let's try assuming standard usage or just test a few known ones.
        // Actually, looking at docs, typically one uses specific known strings.
        // Let's try to just generate content with them one by one to see which works.

        function log(message) {
            console.log(message);
            fs.appendFileSync('model_status.txt', message + '\n');
        }

        const models = [
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-1.5-flash-001",
            "gemini-1.5-flash-002",
            "gemini-1.5-pro",
            "gemini-1.5-pro-latest",
            "gemini-pro",
            "gemini-1.0-pro"
        ];

        fs.writeFileSync('model_status.txt', 'Checking models...\n');
        console.log("Checking model availability (Attempt 3)...");

        for (const modelName of models) {
            try {
                const m = genAI.getGenerativeModel({ model: modelName });
                // Try a minimal generation
                await m.generateContent("Hi");
                log(`✅ ${modelName} is AVAILABLE`);
            } catch (error) {
                if (error.message.includes("429")) {
                    log(`✅ ${modelName} is AVAILABLE (but Rate Limited)`);
                } else if (error.message.includes("404")) {
                    log(`❌ ${modelName} is NOT FOUND (404)`);
                } else {
                    log(`⚠️ ${modelName} verification failed: ${error.message.split('\n')[0]}`);
                }
            }
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
