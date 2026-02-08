const ejs = require('ejs');
const path = require('path');
const fs = require('fs-extra');

const templatePath = path.join(__dirname, 'Templates', 'template2', 'index.ejs');
const outputDir = path.join(__dirname, 'preview');
const outputPath = path.join(outputDir, 'index.html');

const testData = {
    personalInfo: {
        fullName: "Jane Doe",
        email: "jane.doe@example.com",
        phone: "+1 (555) 987-6543",
        location: "New York, NY",
        github: "https://github.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe",
        twitter: "https://twitter.com/janedoe",
        website: "janedoe.dev",
        resumeLink: "#",
        profileImage: "https://via.placeholder.com/150",
        bio: "Creative Full Stack Developer with a passion for UI/UX."
    },
    summary: {
        headline: "Creative Developer",
        introduction: "I build interactive experiences on the web."
    },
    skills: [
        { category: "Frontend", items: [{ name: "React", percentage: 95 }, { name: "CSS3", percentage: 90 }] },
        { category: "Backend", items: [{ name: "Node.js", percentage: 85 }, { name: "Python", percentage: 80 }] }
    ],
    education: [
        { degree: "B.S. Computer Science", institution: "Tech University", yearStart: "2016", yearEnd: "2020", details: "Graduated with Honors" }
    ],
    workExperience: [
        { position: "Senior Developer", organization: "WebCorp", duration: "2020-Present", description: "Leading frontend team." }
    ],
    projects: [
        { title: "Portfolio Generator", description: "An AI-powered portfolio builder.", skills: ["Node.js", "EJS", "Tailwind"], repo: "https://github.com", demo: "https://example.com" }
    ],
    technologies: [
        { name: "JavaScript" }, { name: "React" }, { name: "Node.js" }
    ],
    testimonials: [
        { name: "John Smith", quote: "Jane is an amazing developer!", position: "CTO", company: "Startup Inc." }
    ]
};

async function generatePreview() {
    try {
        console.log(`Generating preview from: ${templatePath}`);
        if (!fs.existsSync(templatePath)) {
            throw new Error(`Template file not found at ${templatePath}`);
        }

        const html = await ejs.renderFile(templatePath, testData);

        await fs.ensureDir(outputDir);
        await fs.writeFile(outputPath, html);

        console.log(`✅ Preview generated at: ${outputPath}`);
    } catch (error) {
        console.error("❌ Generation failed:", error);
        process.exit(1);
    }
}

generatePreview();
