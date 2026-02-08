// Test website generation without AI features
const axios = require('axios');

async function testWebsiteGeneration() {
    console.log("🧪 Testing Website Generation (Manual Data Entry)\n");
    console.log("=".repeat(70));

    // Sample portfolio data (what a user would manually enter)
    const testData = {
        template: 2, // Template ID
        data: {
            personalInfo: {
                fullName: `John Doe ${Math.floor(Math.random() * 10000)}`,
                email: "john.doe@example.com",
                phone: "+1 (555) 123-4567",
                location: "San Francisco, CA",
                github: "github.com/johndoe",
                linkedin: "linkedin.com/in/johndoe",
                website: "johndoe.dev"
            },
            summary: {
                headline: "Full Stack Developer & Software Engineer",
                careerObjective: "Passionate software developer with 5 years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies."
            },
            skills: {
                languages: ["JavaScript", "Python", "TypeScript", "Java"],
                frameworks: ["React", "Node.js", "Express", "Django"],
                tools: ["Git", "Docker", "AWS", "MongoDB"],
                concepts: ["RESTful APIs", "Microservices", "CI/CD", "Agile"]
            },
            education: [
                {
                    degree: "Bachelor of Science in Computer Science",
                    institution: "University of California, Berkeley",
                    duration: "2015 - 2019",
                    grade: "3.8 GPA"
                }
            ],
            workExperience: [
                {
                    position: "Senior Software Engineer",
                    organization: "Tech Corp Inc.",
                    duration: "2021 - Present",
                    description: "Leading development of microservices architecture",
                    bulletPoints: [
                        "Architected scalable backend systems handling 1M+ requests/day",
                        "Mentored junior developers and conducted code reviews",
                        "Reduced deployment time by 50% through CI/CD optimization"
                    ]
                }
            ],
            projects: [
                {
                    title: "E-Commerce Platform",
                    description: "Full-stack e-commerce solution with payment integration",
                    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
                    link: "github.com/johndoe/ecommerce",
                    bulletPoints: [
                        "Implemented secure payment processing with Stripe",
                        "Built real-time inventory management system",
                        "Achieved 99.9% uptime with load balancing"
                    ]
                }
            ],
            certifications: [
                {
                    title: "AWS Certified Solutions Architect",
                    issuer: "Amazon Web Services",
                    date: "2022"
                }
            ],
            technologies: [
                { name: "React", iconClass: "bx bxl-react" },
                { name: "Node.js", iconClass: "bx bxl-nodejs" }
            ],
            contactInfo: {
                formFields: [
                    { name: "fullName", label: "Full Name", type: "text", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "message", label: "Message", type: "textarea", required: true }
                ]
            }
        }
    };

    try {
        // console.log("📤 Sending generation request to backend...");
        // console.log(`   Template: ${testData.template}`);
        // console.log(`   Name: ${testData.data.personalInfo.fullName}`);
        // console.log(`   Email: ${testData.data.personalInfo.email}\n`);

        const response = await axios.post(
            'http://localhost:8081/generator/generate-and-deploy',
            testData,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 120000 // 2 minute timeout for deployment
            }
        );

        console.log("✅ SUCCESS! Website Generated and Deployed!\n");
        console.log("=".repeat(70));
        console.log("📊 Response Details:");
        console.log("=".repeat(70));
        console.log(`Status: ${response.status}`);
        console.log(`Deployment URL: ${response.data.deploymentUrl || response.data.url || 'N/A'}`);
        console.log(`Message: ${response.data.message || 'N/A'}`);

        if (response.data.deploymentUrl) {
            console.log("\n🎉 Your portfolio is live at:");
            console.log(`   ${response.data.deploymentUrl}`);
            console.log("\n✅ Manual website generation works perfectly!");
        }

        console.log("\n" + "=".repeat(70));
        console.log("Full Response:", JSON.stringify(response.data, null, 2));

    } catch (error) {
        if (error.response) {
            const fs = require('fs');
            fs.writeFileSync('final_error.json', JSON.stringify(error.response.data, null, 2));
            console.log("Error details written to final_error.json");
        } else {
            console.log(error.message);
        }
    }
}

console.log("Starting manual website generation test...\n");
testWebsiteGeneration();
