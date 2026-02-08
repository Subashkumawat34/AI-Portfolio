import { motion } from "framer-motion";
import "../../styles/Resources.css";

const Tutorials = () => {
  return (
    <div className="resources-container">
      <motion.header
        className="resources-hero tutorials-hero"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>ProFolio.AI Tutorials</h1>
        <p>
          Learn how to create stunning AI-powered portfolios with{" "}
          <strong>ProFolio.AI</strong>. This step-by-step guide walks you
          through the entire journey — from getting started to deploying your
          live professional portfolio.
        </p>
      </motion.header>
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">1</span>
          <h2>🚀 Getting Started with ProFolio.AI</h2>
        </div>
        <p>
          Begin your journey by signing up and exploring your personalized
          dashboard. ProFolio.AI ensures secure login and smooth onboarding.
        </p>
        <div className="tutorials-highlight">
          <h3>Quick Checklist</h3>
          <ul>
            <li>✅ Create your account</li>
            <li>✅ Verify your email</li>
            <li>✅ Access your dashboard</li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">2</span>
          <h2>🎨 Choosing the Right Template</h2>
        </div>
        <p>
          Templates are the backbone of your portfolio. ProFolio.AI offers a
          variety of professional, mobile-optimized layouts for every role —
          developers, designers, or freelancers.
        </p>
        <div className="tutorials-note">
          <strong>Pro Tip:</strong> Select a template that matches your
          personality and career focus.
        </div>
      </motion.section>

      <motion.section
        className="resources-section"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">3</span>
          <h2>✏️ Customizing with the Smart Editor</h2>
        </div>
        <p>
          Edit every detail of your portfolio — About Me, Projects, Skills,
          Education, and Contact. Our intuitive editor ensures customization is
          effortless.
        </p>
        <div className="tutorials-highlight">
          <h3>What You Can Customize</h3>
          <ul>
            <li>👤 Personal Bio & Contact Info</li>
            <li>💼 Projects with links & visuals</li>
            <li>🎓 Education & Certifications</li>
            <li>🛠️ Skills with proficiency bars</li>
          </ul>
        </div>
      </motion.section>

      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">4</span>
          <h2>🤖 AI-Powered Content Assistance</h2>
        </div>
        <p>
          Let AI handle the hard part! ProFolio.AI generates professional,
          SEO-friendly descriptions for your skills and projects.
        </p>
        <div className="tutorials-example">
          <h4>Example</h4>
          <code>
            Input: "Weather App built in React"
            <br />
            Output: "Developed a responsive Weather App using React that
            delivers accurate real-time weather forecasts with an intuitive
            interface."
          </code>
        </div>
      </motion.section>

      <motion.section
        className="resources-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">5</span>
          <h2>⚡ One-Click Deployment</h2>
        </div>
        <p>
          Deploy your portfolio instantly with one click. ProFolio.AI ensures
          your site is live, secure (SSL-enabled), and globally accessible.
        </p>
      </motion.section>

      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">6</span>
          <h2>🛠️ Managing & Updating</h2>
        </div>
        <p>
          Keep your portfolio up-to-date as your career evolves. Add projects,
          update skills, and redeploy — all from your dashboard.
        </p>
      </motion.section>

      <motion.section
        className="resources-section tutorials-faq"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>1. Do I need coding knowledge?</h4>
          <p>No. ProFolio.AI is built for everyone — no coding needed.</p>
        </div>
        <div className="faq-item">
          <h4>2. Can I use a custom domain?</h4>
          <p>Yes. Easily link your own domain after deployment.</p>
        </div>
        <div className="faq-item">
          <h4>3. Is it free?</h4>
          <p>
            The basic version is free. Premium features like analytics and
            domain integration are available on paid plans.
          </p>
        </div>
      </motion.section>

      <motion.footer
        className="resources-summary tutorials-summary"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>📘 Summary</h2>
        <p>
          <strong>ProFolio.AI</strong> empowers you to build and launch a
          professional online presence in minutes. With AI-driven content,
          modern templates, and one-click deployment, creating a portfolio has
          never been easier.
        </p>
      </motion.footer>
    </div>
  );
};

export default Tutorials;
