// Simpler test with minimal data to isolate the issue
const axios = require('axios');

async function testSimpleGeneration() {
    console.log("🧪 Testing with minimal data...\n");

    const minimalData = {
        template: 1,
        data: {
            personalInfo: {
                fullName: "John Doe",
                email: "john@example.com",
                phone: "+1234567890",
                location: "San Francisco"
            },
            summary: {
                tagline: "Software Developer",
                introduction: "Experienced developer"
            },
            education: [
                {
                    yearStart: "2015",
                    yearEnd: "2019",
                    degree: "BS Computer Science",
                    institution: "UC Berkeley"
                }
            ],
            workExperience: [
                {
                    position: "Software Engineer",
                    organization: "Tech Corp",
                    duration: "2020-Present",
                    description: "Building great software",
                    bulletPoints: ["Led team", "Improved performance"]
                }
            ],
            projects: [
                {
                    title: "E-commerce Platform",
                    description: "Online shopping site",
                    tools: "React, Node.js",
                    repo: "https://github.com/test/repo"
                }
            ],
            technologies: [
                {
                    name: "React",
                    iconClass: "fa-brands fa-react"
                },
                {
                    name: "Node.js",
                    iconClass: "fa-brands fa-node-js"
                }
            ],
            contactInfo: {
                email: "john@example.com",
                phone: "+1234567890"
            }
        }
    };

    try {
        console.log("Sending request...\n");
        const response = await axios.post(
            'http://localhost:8080/generator/generate-and-deploy',
            minimalData,
            { timeout: 120000 }
        );

        console.log("✅ SUCCESS!\n");
        console.log(`Deployment URL: ${response.data.deploymentUrl}`);
        console.log(`Message: ${response.data.message}`);

    } catch (error) {
        console.log("❌ FAILED\n");

        if (error.response) {
            console.log(`Status: ${error.response.status}`);
            console.log(`Error:`, error.response.data);

            // Try to extract more details
            if (error.response.data.message) {
                console.log("\nError Message:");
                console.log(error.response.data.message);
            }
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

testSimpleGeneration();
