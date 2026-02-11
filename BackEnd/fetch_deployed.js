const axios = require('axios');
const fs = require('fs');

const url = "https://test-user-deploy-1770745269550-rln38tqan-subash-kumawats-projects-76448e14.vercel.app";

async function fetchSite() {
    try {
        console.log(`Fetching ${url}...`);
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        console.log(`Status: ${response.status}`);
        fs.writeFileSync('deployed_site.html', response.data);
        console.log('Saved to deployed_site.html');

        const imageUrl = `${url}/uploads/test-image.png`;
        console.log(`Fetching image ${imageUrl}...`);
        const imageResponse = await axios.get(imageUrl);
        console.log(`Image Status: ${imageResponse.status}`);

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            fs.writeFileSync('deployed_error.html', typeof error.response.data === 'string' ? error.response.data : JSON.stringify(error.response.data));
        }
    }
}

fetchSite();
