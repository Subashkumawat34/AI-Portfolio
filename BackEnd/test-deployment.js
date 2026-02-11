const axios = require("axios");

/**
 * Test script for website generation and deployment
 * This simulates a form submission from the frontend
 */

const testData = {
    template: 1, // Using template 1 for simplicity
    data: {
        personalInfo: {
            fullName: "Test User Deploy",
            nickname: "",
            location: "",
            email: "test@example.com",
            phone: "1234567890",
            github: "https://github.com/testuser",
            linkedin: "https://linkedin.com/in/testuser",
            twitter: "",
            website: "",
            profileImage: "uploads/test-image.png",
            resumeLink: "#"
        },
        summary: {
            introduction: "This is a test portfolio website generated to verify the automated GitHub + Vercel deployment process.",
            tagline: "Full Stack Developer",
            highlights: []
        },
        education: [
            {
                degree: "Bachelor of Computer Science",
                institution: "Test University",
                yearStart: "2020",
                yearEnd: "2024",
                score: "3.8 GPA",
                details: "Focused on software engineering and web development"
            }
        ],
        workExperience: [],
        projects: [
            {
                title: "Test Project",
                image: "",
                description: "A sample project to test deployment",
                skills: ["JavaScript", "Node.js", "React"],
                repo: "https://github.com/testuser/test-project",
                demo: "https://example.com"
            }
        ],
        skills: [
            { name: "React.js", percentage: "90", category: "Frontend" },
            { name: "Node.js", percentage: "85", category: "Backend" },
            { name: "Git", percentage: "80", category: "Tools" }
        ],
        technologies: [
            { name: "JavaScript", image: "" },
            { name: "Node.js", image: "" }
        ],
        testimonials: [],
        contactInfo: {
            email: "test@example.com",
            phone: "1234567890",
            address: ""
        }
    }
};

async function testDeployment() {
    console.log("🧪 Starting deployment test...\n");
    console.log("📋 Test Data:");
    console.log(`  - Template: ${testData.template}`);
    console.log(`  - Full Name: ${testData.data.personalInfo.fullName}`);
    console.log(`  - Email: ${testData.data.personalInfo.email}\n`);

    try {
        console.log("📤 Sending POST request to http://localhost:8080/generator/generate-and-deploy\n");

        const response = await axios.post(
            "http://localhost:8080/generator/generate-and-deploy",
            testData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                timeout: 120000, // 2 minutes timeout for deployment
            }
        );

        console.log("✅ DEPLOYMENT SUCCESSFUL!\n");
        console.log("✅ DEPLOYMENT SUCCESSFUL!");
        console.log("   Deployment URL:", response.data.deploymentUrl);
        console.log("   Repo URL:", response.data.repoUrl);
        console.log("   Live Site:", response.data.deploymentUrl); // Helper for user to click

        fs.writeFileSync('deployment_url.txt', response.data.deploymentUrl);

        return true;
    } catch (error) {
        console.error("❌ DEPLOYMENT FAILED\n");

        if (error.response) {
            console.error("📊 Error Response:");
            console.error(`  - Status: ${error.response.status}`);
            console.error(`  - Message: ${error.response.data.message || error.response.data}`);
            console.error(`  - Details:`, JSON.stringify(error.response.data, null, 2));
        } else if (error.request) {
            console.error("📡 No response received from server");
            console.error("  Make sure backend is running on http://localhost:8080");
        } else {
            console.error("⚠️  Error:", error.message);
        }

        console.error("\n🔍 Check backend terminal for detailed logs");
        return false;
    }
}

// Run the test
testDeployment()
    .then((success) => {
        process.exit(success ? 0 : 1);
    })
    .catch((err) => {
        console.error("Unexpected error:", err);
        process.exit(1);
    });
