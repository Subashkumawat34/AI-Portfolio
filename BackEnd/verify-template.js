const ejs = require('ejs');
const path = require('path');

const templatePath = path.join(__dirname, 'Templates', 'template2', 'index.ejs');

const testData = {
    personalInfo: {
        fullName: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        twitter: "https://twitter.com/johndoe",
        website: "johndoe.dev",
        resumeLink: "#"
    },
    summary: {
        headline: "Full Stack Developer",
        introduction: "Passionate software developer..."
    },
    skills: [
        { category: "Languages", items: [{ name: "JavaScript", percentage: 90 }] }
    ],
    education: [
        { degree: "BS CS", institution: "UCB", yearStart: "2015", yearEnd: "2019" }
    ],
    workExperience: [
        { position: "Dev", organization: "Tech", duration: "2020-Present", description: "Coding" }
    ],
    projects: [
        { title: "Project 1", description: "A cool project", skills: ["React"] }
    ],
    technologies: [
        { name: "React" }
    ],
    // testimonials: [] // Removed to test robustness
};

async function verify() {
    try {
        console.log(`Checking template at: ${templatePath}`);
        const html = await ejs.renderFile(templatePath, testData);
        console.log("✅ Template rendered successfully!");
        console.log(`Rendered length: ${html.length} chars`);
    } catch (error) {
        console.error("❌ Template rendering failed:");
        console.error(error.message);
        if (error.message.includes("Could not find the include file")) {
            console.error("💡 This confirms the include path issue is persisting or not resolved.");
        }
        process.exit(1);
    }
}

verify();
