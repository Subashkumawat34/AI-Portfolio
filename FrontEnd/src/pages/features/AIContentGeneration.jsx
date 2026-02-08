// AIContentGeneration.jsx
import { motion } from "framer-motion";
import "../../styles/Features.css";

const AIContentGeneration = () => {
  return (
    <div className="feature-page-container">
      {/* Hero Section */}
      <motion.header
        className="feature-hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          AI-Powered Content Generation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Transform resumes into professional portfolio websites with the power
          of NLP and Generative AI — no coding, no design skills required.
        </motion.p>
      </motion.header>

      {/* Why Use AI */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>🌟 Why Use AI for Portfolios?</h2>
        <p>
          In today’s fast-paced and competitive job market, having a
          professional portfolio is no longer optional—it’s essential. However,
          creating one manually can be{" "}
          <strong>
            time-consuming, repetitive, and technically challenging
          </strong>
          .
          <br /> <br />
          With <strong>ProFolio.AI</strong>, our intelligent engine automates
          the process by extracting data from your resume, refining it into
          polished website sections, and presenting it in a visually appealing,
          recruiter-ready format.
        </p>
        <motion.ul
          className="ai-benefits-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            "✨ Smart extraction of personal details, skills, and experiences",
            "📝 AI-enhanced summaries that highlight your achievements",
            "🎯 SEO-friendly descriptions to improve online visibility",
            "📂 Auto-structured portfolio content by categories",
            "🌐 Multiple modern templates to match your style",
            "🕒 Save hours compared to building manually",
          ].map((benefit, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {benefit}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

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
            "Upload your resume in PDF or DOCX format, or fill in your details manually through our intuitive form. Our system ensures compatibility with most resume formats so nothing important gets left out.",
            "Our AI engine uses advanced Natural Language Processing (NLP) to extract key details from your resume. It automatically rewrites and formats the content into a clean, professional tone suitable for portfolio presentation.",
            "All extracted and enhanced content is structured into categories like About, Skills, Education, Experience, and Projects. This ensures your portfolio is well-organized and easy for recruiters or viewers to navigate.",
            "Instantly preview your portfolio in real time and make edits to customize text, colors, or layout. Once you’re satisfied, you’re just one click away from deploying a professional website live on the internet.",
          ].map((step, index) => (
            <motion.div
              className="step"
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6 }}
            >
              <span>{`${index + 1}️⃣`}</span>
              <p>{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Sections Auto-Generate */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Sections You Can Auto-Generate</h2>
        <motion.div
          className="section-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {[
            "About Me",
            "Education",
            "Work Experience",
            "Projects & Case Studies",
            "Skills & Tools",
            "Certifications",
            "Achievements",
            "Contact & Social Links",
          ].map((section, index) => (
            <motion.div
              className="section-card"
              key={index}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              {section}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Highlight CTA */}
      <motion.section
        className="feature-highlight"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Professional Portfolios in Minutes</h2>
        <p>
          With AI Content Generation, anyone — from students to professionals —
          can build a modern, recruiter-ready portfolio that stands out.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate My Portfolio
        </motion.button>
      </motion.section>
    </div>
  );
};

export default AIContentGeneration;
