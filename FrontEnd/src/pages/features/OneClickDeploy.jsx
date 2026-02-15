// OneClickDeploy.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../styles/Features.css";

const OneClickDeploy = () => {
  const navigate = useNavigate();
  return (
    <div className="feature-page-container">
      {/* Hero Section */}
      <motion.header
        className="feature-hero deploy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          One-Click Deployment
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Push your portfolio to the live web instantly.
          Powered by GitHub and Vercel for scalable, secure hosting.
        </motion.p>
      </motion.header>

      {/* Intro */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Global Scale, Zero Config</h2>
        <p>
          Forget FTP and complex server setups. We handle the heavy lifting so you
          can focus on showcasing your best work.
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
            { text: "Instant HTTPS & SSL", icon: "🔒" },
            { text: "Global CDN Delivery", icon: "🌍" },
            { text: "Automated Git Backups", icon: "💾" },
            { text: "Live Preview URL", icon: "👁️" },
            { text: "DDoS Protection", icon: "🛡️" },
            { text: "Custom Domain Support", icon: "🔗" },
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
          { number: "< 60s", label: "Deploy Time" },
          { number: "99.9%", label: "Uptime SLA" },
          { number: "100+", label: "Edge Locations" },
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

      {/* Tech Stack */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>The Power Stack</h2>
        <p>
          Built on top of the world's most reliable infrastructure.
        </p>
        <motion.div
          className="tech-stack"
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
          {["Vercel", "GitHub", "React", "Node.js", "Cloudflare CDN"].map((tech, index) => (
            <motion.div
              key={index}
              className="tech-badge"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              {tech}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Deployment Steps */}
      <motion.section
        className="feature-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2>Three Steps to Live</h2>
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
            "Review your generated portfolio content in the dashboard.",
            "Click 'Deploy Now' to initialize the automated build pipeline.",
            "Receive your unique URL instantly and share it with the world.",
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

      {/* CTA */}
      <motion.section
        className="feature-highlight"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Go Live Today</h2>
        <p>
          Don't let technical hurdles hold you back. Launch your professional brand now.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/generate-website")}
        >
          Deploy My Portfolio
        </motion.button>
      </motion.section>
    </div>
  );
};

export default OneClickDeploy;
