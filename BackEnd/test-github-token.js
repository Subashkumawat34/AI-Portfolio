// Test GitHub token directly
const axios = require('axios');
require('dotenv').config();

async function testGitHubToken() {
    const token = process.env.GITHUB_TOKEN;
    const username = process.env.GITHUB_USERNAME;

    console.log("Testing GitHub Token Validity\n");
    console.log("=".repeat(60));
    console.log(`Token: ${token.substring(0, 10)}...${token.substring(token.length - 5)}`);
    console.log(`Username: ${username}`);
    console.log("=".repeat(60) + "\n");

    // Test 1: Check token authentication
    console.log("Test 1: Verifying token authentication...");
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        console.log("✅ Token is VALID!");
        console.log(`   Authenticated as: ${response.data.login}`);
        console.log(`   Account type: ${response.data.type}`);
        console.log("");
    } catch (error) {
        console.log("❌ Token is INVALID!");
        console.log(`   Status: ${error.response?.status}`);
        console.log(`   Message: ${error.response?.data?.message}`);
        console.log("\n⚠️  This token cannot authenticate with GitHub API.");
        console.log("Please generate a new token from: https://github.com/settings/tokens\n");
        return;
    }

    // Test 2: Check repo creation permissions
    console.log("Test 2: Checking repository permissions...");
    try {
        const response = await axios.get('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        // Check scopes from headers
        const scopes = response.headers['x-oauth-scopes'] || '';
        console.log(`✅ Token scopes: ${scopes || 'None visible'}`);

        if (scopes.includes('repo') || scopes.includes('public_repo')) {
            console.log("✅ Token has repository permissions!");
        } else {
            console.log("❌ Token MISSING 'repo' permission!");
            console.log("   Please regenerate token with 'repo' scope enabled.");
        }
    } catch (error) {
        console.log("❌ Could not verify permissions");
    }

    console.log("\n" + "=".repeat(60));
}

testGitHubToken();
