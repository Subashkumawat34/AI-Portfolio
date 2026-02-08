const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
require("dotenv").config();

async function testGemini() {
    try {
        console.log("Chatbot API Key:", process.env.GEMINI_API_KEY_CHATBOT ? "Present" : "Missing");
        console.log("Extract API Key:", process.env.GEMINI_API_KEY_EXTRACT ? "Present" : "Missing");

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_CHATBOT);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = "Hello, please respond with a simple greeting.";
        console.log("Sending request to Gemini...");
        const result = await model.generateContent(prompt);
        console.log("Got result, extracting response...");
        const response = await result.response;
        const text = response.text();

        console.log("Success! Response:", text);
        fs.writeFileSync("gemini-test-result.txt", "SUCCESS: " + text);
    } catch (error) {
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            name: error.name,
            fullError: JSON.stringify(error, null, 2)
        };

        fs.writeFileSync("gemini-test-result.txt", JSON.stringify(errorDetails, null, 2));
        console.error("ERROR - Details written to gemini-test-result.txt");
        console.error("Message:", error.message);
    }
}

testGemini();
