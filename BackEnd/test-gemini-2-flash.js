/**
 * Test script to verify Gemini 2.0 Flash model availability and functionality
 * Run with: node test-gemini-2-flash.js
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Test models in priority order
const MODELS_TO_TEST = [
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-1.5-flash',
];

async function testModel(apiKey, modelName, keyName) {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: modelName });

        const prompt = "Respond with only 'OK' if you can read this.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (text) {
            console.log(`✅ ${keyName} + ${modelName}: SUCCESS`);
            console.log(`   Response: "${text.trim().substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
            return true;
        }

        return false;
    } catch (error) {
        console.log(`❌ ${keyName} + ${modelName}: FAILED`);
        console.log(`   Error: ${error.message.substring(0, 100)}${error.message.length > 100 ? '...' : ''}`);
        return false;
    }
}

async function runTests() {
    console.log('\n' + '='.repeat(70));
    console.log('TESTING GEMINI 2.0 FLASH AND MODEL AVAILABILITY');
    console.log('='.repeat(70) + '\n');

    // Check API keys
    const chatbotKey = process.env.GEMINI_API_KEY_CHATBOT;
    const extractKey = process.env.GEMINI_API_KEY_EXTRACT;

    console.log('🔑 API Keys Status:');
    console.log(`   CHATBOT KEY: ${chatbotKey ? '✅ Present' : '❌ Missing'}`);
    console.log(`   EXTRACT KEY: ${extractKey ? '✅ Present' : '❌ Missing'}`);
    console.log();

    if (!chatbotKey && !extractKey) {
        console.log('❌ ERROR: No API keys found!');
        console.log('📝 Please add your API keys to the .env file:');
        console.log('   GEMINI_API_KEY_CHATBOT=your-api-key-here');
        console.log('   GEMINI_API_KEY_EXTRACT=your-api-key-here');
        console.log();
        console.log('🔗 Get API keys from: https://aistudio.google.com/api-keys');
        return;
    }

    const results = {
        chatbot: {},
        extract: {}
    };

    // Test with chatbot key
    if (chatbotKey) {
        console.log('🤖 TESTING WITH CHATBOT KEY:');
        console.log('-'.repeat(70));
        for (const model of MODELS_TO_TEST) {
            const success = await testModel(chatbotKey, model, 'CHATBOT');
            results.chatbot[model] = success;
            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit protection
        }
        console.log();
    }

    // Test with extract key
    if (extractKey && extractKey !== chatbotKey) {
        console.log('📄 TESTING WITH EXTRACT KEY:');
        console.log('-'.repeat(70));
        for (const model of MODELS_TO_TEST) {
            const success = await testModel(extractKey, model, 'EXTRACT');
            results.extract[model] = success;
            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit protection
        }
        console.log();
    }

    // Summary
    console.log('='.repeat(70));
    console.log('SUMMARY OF RESULTS');
    console.log('='.repeat(70) + '\n');

    if (chatbotKey) {
        const chatbotWorking = Object.values(results.chatbot).filter(Boolean).length;
        const chatbotTotal = MODELS_TO_TEST.length;
        console.log(`🤖 CHATBOT KEY - Working Models: ${chatbotWorking}/${chatbotTotal}`);

        if (chatbotWorking > 0) {
            const workingModels = Object.entries(results.chatbot)
                .filter(([_, success]) => success)
                .map(([model, _]) => model);
            console.log(`   ✅ Working: ${workingModels.join(', ')}`);

            if (results.chatbot['gemini-2.0-flash']) {
                console.log('   🎯 RECOMMENDED: gemini-2.0-flash is available!');
            } else {
                console.log('   ⚠️  gemini-2.0-flash not available, using fallback');
                console.log(`   📌 Best available: ${workingModels[0]}`);
            }
        } else {
            console.log('   ❌ No working models found! Check your API key.');
        }
        console.log();
    }

    if (extractKey && extractKey !== chatbotKey) {
        const extractWorking = Object.values(results.extract).filter(Boolean).length;
        const extractTotal = MODELS_TO_TEST.length;
        console.log(`📄 EXTRACT KEY - Working Models: ${extractWorking}/${extractTotal}`);

        if (extractWorking > 0) {
            const workingModels = Object.entries(results.extract)
                .filter(([_, success]) => success)
                .map(([model, _]) => model);
            console.log(`   ✅ Working: ${workingModels.join(', ')}`);

            if (results.extract['gemini-2.0-flash']) {
                console.log('   🎯 RECOMMENDED: gemini-2.0-flash is available!');
            } else {
                console.log('   ⚠️  gemini-2.0-flash not available, using fallback');
                console.log(`   📌 Best available: ${workingModels[0]}`);
            }
        } else {
            console.log('   ❌ No working models found! Check your API key.');
        }
        console.log();
    }

    // Recommendations
    const anyWorking = Object.values(results.chatbot).some(Boolean) ||
        Object.values(results.extract).some(Boolean);

    if (!anyWorking) {
        console.log('🚨 NO WORKING MODELS FOUND!');
        console.log('   This likely means:');
        console.log('   1. Your API keys are invalid or expired');
        console.log('   2. You need to generate new keys from Google AI Studio');
        console.log('   3. There may be network/firewall restrictions');
        console.log();
        console.log('   🔗 Get new API keys: https://aistudio.google.com/api-keys');
    } else {
        console.log('✅ CONFIGURATION READY!');
        console.log('   Your Gemini API is working correctly.');
        console.log('   You can now use the chatbot and extraction features.');
    }

    console.log('\n' + '='.repeat(70) + '\n');
}

// Run the tests
runTests().catch(error => {
    console.error('Fatal error running tests:', error);
    process.exit(1);
});
