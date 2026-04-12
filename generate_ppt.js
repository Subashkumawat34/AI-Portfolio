const pptxgen = require('pptxgenjs');

let pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'AI Portfolio Team';
pptx.company = 'Projectathon';
pptx.revision = '1';
pptx.subject = 'Pitch Deck';
pptx.title = 'AI-Based Portfolio Website Generator';

// Slide 1: Title
let slide1 = pptx.addSlide();
slide1.addText('Team Name: [Your Team Name]', { x:1.5, y:2.5, fontSize:24, bold:true, align:'center', w:'70%' });
slide1.addText('Title: AI-Based Portfolio Website Generator', { x:1.5, y:3.5, fontSize:36, bold:true, align:'center', w:'70%', color:'363636' });

// Slide 2: The Problem
let slide2 = pptx.addSlide();
slide2.addText('1. The Problem', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide2.addText([
  { text: 'What problem are you trying to solve?', options: { bold:true, bullet:true } },
  { text: 'Building a portfolio is hard and time-consuming. It involves coding from scratch, formatting resume data to a web layout, and handling complex deployment pipelines.', options: { bullet:{type:'number'} } },
  { text: 'Customer Pain Points (Persona)', options: { bold:true, bullet:true } },
  { text: 'Developers and professionals struggle to create and deploy premium quality portfolios quickly without learning multiple tools.', options: { bullet:{type:'number'} } },
  { text: 'How the innovation solves it', options: { bold:true, bullet:true } },
  { text: 'A 1-click easy generator that bridges the gap between raw resume data and a live, deployed website using Google\'s Gemini 2.0 Flash AI.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 3: The Solution
let slide3 = pptx.addSlide();
slide3.addText('2. The Solution', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide3.addText([
  { text: 'How we plan to solve the problem', options: { bold:true, bullet:true } },
  { text: 'By utilizing Google Gemini AI to write compelling content, select premium templates, and automatically deploy the site via Vercel and GitHub APIs.', options: { bullet:{type:'number'} } },
  { text: 'How the innovation works (Flowchart Concept)', options: { bold:true, bullet:true } },
  { text: 'User Profile / Resume Data', options: { bullet:{type:'number'} } },
  { text: 'AI Engine (Content Generation)', options: { bullet:{type:'number'} } },
  { text: 'Template Selection (React + Vite)', options: { bullet:{type:'number'} } },
  { text: 'Automated Build & Deployment (GitHub -> Vercel)', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 4: The Innovation
let slide4 = pptx.addSlide();
slide4.addText('3. The Innovation', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide4.addText([
  { text: 'Relevance to Customers', options: { bold:true, bullet:true } },
  { text: 'Provides a fully customizable, responsive, and high-quality portfolio with ZERO manual coding.', options: { bullet:{type:'number'} } },
  { text: 'Value Proposition', options: { bold:true, bullet:true } },
  { text: 'Go from "No Portfolio" to "Live Link" in under 2 minutes.', options: { bullet:{type:'number'} } },
  { text: 'Benefits & Impact', options: { bold:true, bullet:true } },
  { text: 'Democratizes professional web presence, saves developers hours of tedious work, and ensures top-tier quality.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 5: Market & Opportunity
let slide5 = pptx.addSlide();
slide5.addText('4. Market & Opportunity', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide5.addText([
  { text: 'Total Addressable Market (TAM)', options: { bold:true, bullet:true } },
  { text: 'All job seekers, professionals, and freelancers seeking an online presence.', options: { bullet:{type:'number'} } },
  { text: 'Serviceable Addressable Market (SAM)', options: { bold:true, bullet:true } },
  { text: 'Tech professionals, software developers, and designers.', options: { bullet:{type:'number'} } },
  { text: 'Target Market', options: { bold:true, bullet:true } },
  { text: 'Recent bootcamp grads, university students, and professionals needing rapid portfolio deployment.', options: { bullet:{type:'number'} } },
  { text: 'Differentiation', options: { bold:true, bullet:true } },
  { text: 'Unlike Wix or Squarespace, our tool builds a tailored codebase intelligently and deploys it effortlessly.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 6: Feasibility and viability
let slide6 = pptx.addSlide();
slide6.addText('5. Feasibility and Viability', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide6.addText([
  { text: 'Feasibility', options: { bold:true, bullet:true } },
  { text: 'Highly feasible using modern, proven web technologies (MERN stack, Vercel APIs, Gemini API).', options: { bullet:{type:'number'} } },
  { text: 'Challenges & Risks', options: { bold:true, bullet:true } },
  { text: 'API rate limits, template design scalability, maintaining generated link uptime.', options: { bullet:{type:'number'} } },
  { text: 'Strategies to Overcome', options: { bold:true, bullet:true } },
  { text: 'Implementing queuing mechanisms for deployments, creating modular template components, caching API responses.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 7: Impact and benefits
let slide7 = pptx.addSlide();
slide7.addText('6. Impact and Benefits', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide7.addText([
  { text: 'Impact on Target Audience', options: { bold:true, bullet:true } },
  { text: 'Empowers users to focus on job applications rather than building websites.', options: { bullet:{type:'number'} } },
  { text: 'Key Benefits', options: { bold:true, bullet:true } },
  { text: 'Zero coding required, high-speed generation, beautiful mobile-responsive designs.', options: { bullet:{type:'number'} } },
  { text: 'Collaboration and Co-creation', options: { bold:true, bullet:true } },
  { text: 'Open-source potential, inviting designers to contribute new EJS/React templates.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 8: Business Model
let slide8 = pptx.addSlide();
slide8.addText('7. Business Model', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide8.addText([
  { text: 'Revenue Model', options: { bold:true, bullet:true } },
  { text: 'Freemium approach: Basic templates are free. Premium AI features, custom domains, and advanced templates are part of a subscription or one-time payment.', options: { bullet:{type:'number'} } },
  { text: 'Source of Revenue', options: { bold:true, bullet:true } },
  { text: 'Premium user subscriptions, white-labeling for educational institutions or bootcamps.', options: { bullet:{type:'number'} } },
  { text: 'Market Validation', options: { bold:true, bullet:true } },
  { text: 'Competitors charge heavy monthly fees for static builders. One-click deploy tools have high adoption rates in the dev community.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 9: The Team
let slide9 = pptx.addSlide();
slide9.addText('8. The Team', { x:0.5, y:0.5, fontSize:28, bold:true, color:'003366' });
slide9.addText([
  { text: 'Key Team Members', options: { bold:true, bullet:true } },
  { text: '[Name 1] - Lead Developer: Expertise in MERN stack and AI integrations.', options: { bullet:{type:'number'} } },
  { text: '[Name 2] - UI/UX Designer: Focuses on premium template generation.', options: { bullet:{type:'number'} } },
  { text: 'Role & Passion', options: { bold:true, bullet:true } },
  { text: 'We started this project because we experienced the struggle of spending weeks building personal portfolios. We wanted to make professional web presence accessible to all.', options: { bullet:{type:'number'} } }
], { x:0.5, y:1.5, w:'90%', h:4, fontSize:18, margin:0.1 });

// Slide 10: Thank You
let slide10 = pptx.addSlide();
slide10.addText('Thank You', { x:2.0, y:2.5, fontSize:48, bold:true, align:'center', w:'60%', color:'363636' });

pptx.writeFile({ fileName: 'Presentation.pptx' }).then(fileName => {
    console.log(`created file: ${fileName}`);
});
