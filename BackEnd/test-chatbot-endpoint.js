/**
 * Test chatbot endpoint
 */
require('dotenv').config();

async function testChatbot() {
    try {
        console.log('\n🤖 Testing Chatbot Endpoint...\n');

        const response = await fetch('http://localhost:8080/api/chatbot/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Hello! Can you help me choose a color scheme for my portfolio?'
            })
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ CHATBOT ENDPOINT WORKS!\n');
            console.log(`Response: ${data.message.substring(0, 200)}...\n`);
            console.log(`Response Time: ${data.responseTime}ms\n`);
        } else {
            console.log('❌ CHATBOT FAILED:');
            console.log(data);
        }
    } catch (error) {
        console.log(`❌ ERROR: ${error.message}\n`);
        console.log('Make sure the backend server is running on port 8080\n');
    }
}

testChatbot();
