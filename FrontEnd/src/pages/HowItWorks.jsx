import { motion } from "framer-motion";
import Step1 from "../assets/Login.jpg";
import Step2 from "../assets/SelectTemplate.avif";
import Step3 from "../assets/Customised.jpg";
import Step4 from "../assets/BuiltAndDeploy.png";
import Step5 from "../assets/DirectHosting.jpeg";
import "../styles/HowItWorks.css";

const steps = [
  {
    id: "step1",
    title: "Step 1: Secure Login",
    description:
      "Sign up or log in with secure authentication. Your data stays private with encrypted storage, and only you can access and manage your portfolio.",
    extra:
      "Role-based access and session security ensure a professional and safe experience.",
    image: Step1,
  },
  {
    id: "step2",
    title: "Step 2: Upload Resume or Provide Input",
    description:
      "Upload your resume (PDF/DOCX) or enter details manually. Our NLP engine extracts key information such as skills, education, projects, and achievements.",
    extra:
      "Using advanced libraries like spaCy and Transformers, we ensure highly accurate parsing of your career data.",
    image: Step2,
  },
  {
    id: "step3",
    title: "Step 3: Customize and Enhance",
    description:
      "Choose a modern template and watch as AI generates professional, recruiter-friendly portfolio sections for you.",
    extra:
      "You can rearrange sections, edit text, change images, and personalize content while AI suggests improvements for better readability.",
    image: Step3,
  },
  {
    id: "step4",
    title: "Step 4: Build and Deploy Instantly",
    description:
      "Click generate, and the system creates a polished portfolio site. With automated GitHub + Vercel integration, your website is live within seconds.",
    extra:
      "A unique live URL is provided, making it easy to share with recruiters, clients, or peers instantly.",
    image: Step4,
  },
  {
    id: "step5",
    title: "Future: Direct Cloud Hosting & Custom Domains",
    description:
      "Upcoming updates will include AWS hosting, allowing direct deployment with custom domains, improved scalability, and enterprise-level reliability.",
    extra:
      "This means professionals can map their own domain (e.g., yourname.com) and enjoy advanced hosting benefits.",
    image: Step5,
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works-container">
      <h1 className="how-it-works-main-title">How It Works</h1>

      <div className="steps-list">
        {steps.map((step, index) => (
          <div
            key={step.id || index}
            className={`step-item ${
              index % 2 !== 0 ? "step-item-reversed" : ""
            }`}
          >
            {/* IMAGE animates from right */}
            <motion.div
              className="step-image-wrapper"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img src={step.image} alt={step.title} className="step-image" />
            </motion.div>

            {/* CONTENT animates from left */}
            <motion.div
              className="step-content-wrapper"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className="step-title">{step.title}</h2>
              <p className="step-description">{step.description}</p>
              <p className="step-extra">{step.extra}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* EXTRA INFO SECTION */}
      <motion.section
        className="extra-info"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>Why This Workflow Stands Out</h2>
        <ul>
          <li>⚡ End-to-end automation — from parsing to deployment</li>
          <li>🧠 AI ensures professional, recruiter-ready portfolios</li>
          <li>🎨 Multiple customizable templates for any career</li>
          <li>☁️ Cloud hosting via GitHub + Vercel integration</li>
          <li>🚀 Future-ready with custom domains and AWS hosting</li>
        </ul>
      </motion.section>

      {/* SUMMARY SECTION */}
      <motion.section
        className="summary-section"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h2>Summary</h2>
        <p>
          Our AI-Based Portfolio Website Generator takes you from{" "}
          <strong>resume → AI enhancement → customization → deployment</strong>.
          This seamless workflow eliminates technical barriers, saves time, and
          ensures everyone — students, professionals, or freelancers — can build
          a polished online presence in minutes.
        </p>
      </motion.section>
    </div>
  );
};

export default HowItWorks;
