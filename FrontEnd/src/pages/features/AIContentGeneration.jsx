// AIContentGeneration.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/Features.css";

const AIContentGeneration = () => {
  const navigate = useNavigate();
  return (
    <div className="feature-page-container">
      {/* Hero Section */}
      <motion.header
        className="feature-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          AI-Powered Content Generation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Transform your resume into a professional portfolio website instantly.
          Our advanced NLP engine crafts engaging narratives for you—no writing skills needed.
        </motion.p>
      </motion.header>

      {/* Intro / Why AI */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Choose AI?</h2>
        <p>
          Writing about yourself is hard. ProFolio.AI analyzes your experience and
          generates recruiter-ready content that highlights your strengths.
        </p>

        <motion.ul
          className="ai-benefits-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {[
            { text: "Smart Resume Parsing", icon: "📄" },
            { text: "Recruiter-Ready Summaries", icon: "✍️" },
            { text: "SEO-Optimized Descriptions", icon: "🚀" },
            { text: "Auto-Formatted Projects", icon: "✨" },
            { text: "Skill Highlighting", icon: "⭐" },
            { text: "Instant Updates & Edits", icon: "🔄" },
          ].map((benefit, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <span>{benefit.icon}</span> {benefit.text}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Stats Section */}
      <motion.div
        className="stats-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {[
          { number: "10x", label: "Faster Creation" },
          { number: "95%", label: "Placement Rate" },
          { number: "24/7", label: "AI Availability" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="stat-number">{stat.number}</span>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* How It Works */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>How It Works</h2>
        <motion.div
          className="step-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          {[
            "Upload your resume (PDF/DOCX) or enter key details manually.",
            "Our AI extracts, organizes, and enhances your professional story.",
            "Choose a template and customize the generated content effortlessly.",
            "Deploy your stunning new portfolio with a single click.",
          ].map((step, index) => (
            <motion.div
              className="step"
              key={index}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <span>{index + 1}</span>
              <p>{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Auto-Generated Sections */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Complete Content Coverage</h2>
        <p>From your bio to your contact info, we handle every section.</p>
        <motion.div
          className="section-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {[
            "Professional Bio", "Work History", "Education",
            "Core Skills", "Project Showcase", "Certifications",
            "Awards", "Contact Info",
          ].map((item, index) => (
            <motion.div
              className="section-card"
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        className="feature-highlight"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Ready to Stand Out?</h2>
        <p>
          Join thousands of professionals building their careers with ProFolio.AI.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/generate-website")}
        >
          Start Generating Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default AIContentGeneration;
