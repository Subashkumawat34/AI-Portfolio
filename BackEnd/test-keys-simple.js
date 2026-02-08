/**
 * Simple test to verify API keys work
 */
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testKeys() {
    console.log('\n🔑 Testing Gemini API Keys...\n');

    const chatbotKey = process.env.GEMINI_API_KEY_CHATBOT;
    const extractKey = process.env.GEMINI_API_KEY_EXTRACT;

    console.log(`Chatbot Key: ${chatbotKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`Extract Key: ${extractKey ? '✅ Present' : '❌ Missing'}\n`);

    if (!chatbotKey || !extractKey) {
        console.log('❌ ERROR: API keys missing in .env file\n');
        process.exit(1);
    }

    // Test chatbot key
    try {
        console.log('Testing CHATBOT key with gemini-2.0-flash...');
        const genAI = new GoogleGenerativeAI(chatbotKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent('Say "OK" if you can read this.');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ CHATBOT KEY WORKS! Response: "${text.trim()}"\n`);
    } catch (error) {
        console.log(`❌ CHATBOT KEY FAILED: ${error.message}\n`);
    }

    // Test extract key
    try {
        console.log('Testing EXTRACT key with gemini-2.0-flash...');
        const genAI = new GoogleGenerativeAI(extractKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent('Say "OK" if you can read this.');
        const response = await result.response;
        const text = response.text();
        console.log(`✅ EXTRACT KEY WORKS! Response: "${text.trim()}"\n`);
    } catch (error) {
        console.log(`❌ EXTRACT KEY FAILED: ${error.message}\n`);
    }

    console.log('🎉 All tests complete!\n');
}

testKeys().catch(error => {
    console.error('Fatal error:', error.message);
    process.exit(1);
});
