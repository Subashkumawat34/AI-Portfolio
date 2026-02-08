const http = require('http');

// Test chatbot API
const testChatbot = () => {
    const data = JSON.stringify({
        message: "Hello, can you help me with my portfolio?"
    });

    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/chatbot/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        console.log(`\n✅ Chatbot API Response - Status: ${res.statusCode}`);

        let responseData = '';

        res.on('data', (chunk) => {
            responseData += chunk;
        });

        res.on('end', () => {
            try {
                const parsed = JSON.parse(responseData);
                console.log('\n📨 Response:', JSON.stringify(parsed, null, 2));

                if (parsed.success) {
                    console.log('\n✅ CHATBOT TEST PASSED!');
                    console.log('Message received:', parsed.message.substring(0, 100) + '...');
                } else {
                    console.log('\n❌ CHATBOT TEST FAILED!');
                    console.log('Error:', parsed.error);
                }
            } catch (e) {
                console.log('\n❌ Failed to parse response');
                console.log('Raw response:', responseData);
            }
        });
    });

    req.on('error', (error) => {
        console.error('\n❌ Request Error:', error.message);
    });

    req.write(data);
    req.end();
};

console.log('🧪 Testing Gemini API fixes...\n');
console.log('='.repeat(50));
console.log('Test 1: Chatbot API');
console.log('='.repeat(50));
testChatbot();
