// OneClickDeploy.jsx
import { motion } from "framer-motion";
import "../../styles/Features.css";

const OneClickDeploy = () => {
  return (
    <div className="feature-page-container">
      <motion.header
        className="feature-hero deploy"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          One-Click Portfolio Deployment
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Launch your AI-generated portfolio online instantly with our automated
          deployment pipeline — GitHub + Vercel integration built-in.
        </motion.p>
      </motion.header>
      <motion.section
        className="feature-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Seamless Hosting Experience</h2>
        <p>
          Forget about manual coding, servers, or FTP uploads. Your portfolio is
          automatically hosted on Vercel’s global CDN with GitHub version
          control.
        </p>
        <motion.ul
          className="ai-benefits-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            "⚡ Instant live preview before publishing",
            "🔒 HTTPS and SSL security by default",
            "🌍 Global CDN ensures blazing-fast performance",
            "📈 Scales automatically to handle recruiter traffic",
            "💾 GitHub backup for safe storage & collaboration",
            "📊 Built-in analytics to track visitors",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
      <motion.section
        className="feature-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Deploy in Three Steps</h2>
        <motion.div
          className="step-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {[
            "Finalize your portfolio with AI-enhanced content.",
            "Click Deploy Now — our system pushes your code to GitHub and connects to Vercel.",
            "Get a live link instantly — share it with recruiters, clients, or peers.",
          ].map((step, i) => (
            <motion.div
              className="step"
              key={i}
              variants={{
                hidden: { opacity: 0, rotateY: 90 },
                visible: { opacity: 1, rotateY: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
            >
              <span>{`${i + 1}️⃣`}</span>
              <p>{step}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Manage & Update Easily</h2>
        <p>
          Updating your portfolio is simple: re-upload your resume or add new
          inputs, and redeploy with one click. Stay current without technical
          hassle.
        </p>
        <motion.ul
          className="ai-benefits-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {[
            "📝 Edit content anytime with AI suggestions",
            "🚀 Re-deploy updated versions instantly",
            "👩‍💻 Maintain multiple portfolio versions",
            "📂 Auto-save to GitHub for safe versioning",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
      <motion.section
        className="feature-highlight"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2>Go Live in Seconds</h2>
        <p>
          From resume to live professional portfolio in just a few minutes —
          that’s the power of AI + automation.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{
            scale: 1.07,
            boxShadow: "0px 0px 18px rgba(243,156,18,0.6)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Deploy My Portfolio
        </motion.button>
      </motion.section>
    </div>
  );
};

export default OneClickDeploy;
