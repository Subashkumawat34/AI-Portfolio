const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const templatePath = path.join(__dirname, 'Templates', 'template2.ejs');

async function testRobustness() {
    try {
        const template = fs.readFileSync(templatePath, 'utf-8');

        // Render with minimal/empty data
        // We must provide an empty object as "locals" at least, or just {}
        const data = {
            // No personalInfo
            // No education
            // No projects
            // No skills
            // No technologies
            // No testimonials
        };

        const html = ejs.render(template, data, {
            filename: templatePath,
            root: path.join(__dirname, 'Templates')
        });

        console.log("✅ Rendered successfully with empty data!");
        console.log("Length:", html.length);

    } catch (error) {
        console.error("❌ Validated failed:", error);
        process.exit(1);
    }
}

testRobustness();
