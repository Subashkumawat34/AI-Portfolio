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
        <h1>🎓 ProFolio.AI Complete Tutorial Guide</h1>
        <p>
          Master the art of creating stunning AI-powered portfolios with{" "}
          <strong>ProFolio.AI</strong>. This comprehensive guide walks you
          through everything from account setup to advanced customization and deployment.
        </p>
        <div className="tutorial-stats">
          <span className="stat-item">⏱️ 30 min total</span>
          <span className="stat-item">📚 10 comprehensive steps</span>
          <span className="stat-item">🎯 Beginner-friendly</span>
        </div>
      </motion.header>

      {/* Step 1 */}
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">1</span>
          <div className="step-header">
            <h2>🚀 Getting Started with ProFolio.AI</h2>
            <span className="time-badge">⏱️ 3 min</span>
          </div>
        </div>
        <p>
          Begin your journey by creating your account and exploring the dashboard.
          ProFolio.AI provides a seamless onboarding experience with secure authentication.
        </p>
        <div className="tutorials-highlight">
          <h3>✅ Quick Checklist</h3>
          <ul>
            <li>Create your free account with email</li>
            <li>Verify your email address</li>
            <li>Complete your profile setup</li>
            <li>Explore the intuitive dashboard</li>
          </ul>
        </div>
        <div className="tutorials-note">
          <strong>💡 Pro Tip:</strong> Use a professional email address as it may appear on your portfolio.
        </div>
      </motion.section>

      {/* Step 2 */}
      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">2</span>
          <div className="step-header">
            <h2>📄 Resume Upload & AI Extraction</h2>
            <span className="time-badge">⏱️ 2 min</span>
          </div>
        </div>
        <p>
          Save time with our intelligent resume parser! Upload your resume and let AI
          extract all your information automatically—work experience, education, skills, and projects.
        </p>
        <div className="tutorials-highlight">
          <h3>Supported Formats</h3>
          <ul>
            <li>📄 PDF (Recommended)</li>
            <li>📝 DOC/DOCX</li>
            <li>📋 TXT</li>
          </ul>
        </div>
        <div className="tutorials-example">
          <h4>What Gets Extracted:</h4>
          <code>
            ✓ Personal Information (Name, Email, Phone)
            ✓ Professional Summary
            ✓ Work Experience with dates
            ✓ Education & Certifications
            ✓ Technical & Soft Skills
            ✓ Projects with descriptions
          </code>
        </div>
      </motion.section>

      {/* Step 3 */}
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">3</span>
          <div className="step-header">
            <h2>🎨 Choosing Your Perfect Template</h2>
            <span className="time-badge">⏱️ 4 min</span>
          </div>
        </div>
        <p>
          Templates are the foundation of your portfolio. ProFolio.AI offers professionally
          designed, mobile-responsive templates optimized for different professions.
        </p>
        <div className="tutorials-highlight">
          <h3>Template Selection Guide</h3>
          <ul>
            <li><strong>Minimalist:</strong> Clean, professional look for corporate roles</li>
            <li><strong>Creative:</strong> Bold designs for designers and artists</li>
            <li><strong>Technical:</strong> Code-focused layouts for developers</li>
            <li><strong>Modern:</strong> Trendy styles for startups and freelancers</li>
          </ul>
        </div>
        <div className="tutorials-note">
          <strong>💡 Pro Tip:</strong> Preview each template before selecting. You can always change it later!
        </div>
      </motion.section>

      {/* Step 4 */}
      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">4</span>
          <div className="step-header">
            <h2>✏️ Customizing with Manual Editor</h2>
            <span className="time-badge">⏱️ 5 min</span>
          </div>
        </div>
        <p>
          Fine-tune every detail of your portfolio using our intuitive form-based editor.
          Add, edit, or remove sections to perfectly represent your professional journey.
        </p>
        <div className="tutorials-highlight">
          <h3>Editable Sections</h3>
          <ul>
            <li>👤 About Me & Professional Summary</li>
            <li>💼 Work Experience with rich descriptions</li>
            <li>🎓 Education & Academic Achievements</li>
            <li>🛠️ Skills with proficiency levels</li>
            <li>📱 Contact Information & Social Links</li>
            <li>🚀 Projects with live demo links</li>
            <li>🏆 Awards & Certifications</li>
          </ul>
        </div>
      </motion.section>

      {/* Step 5 */}
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">5</span>
          <div className="step-header">
            <h2>🤖 AI-Powered Content Enhancement</h2>
            <span className="time-badge">⏱️ 3 min</span>
          </div>
        </div>
        <p>
          Transform basic descriptions into compelling professional narratives! Our AI
          assistant generates SEO-optimized, engaging content for your projects and experience.
        </p>
        <div className="tutorials-example">
          <h4>Before & After Example:</h4>
          <code>
            <strong>Input:</strong> "E-commerce website with React"

            <strong>AI Output:</strong> "Developed a full-stack e-commerce platform
            using React.js and Node.js, featuring secure payment integration,
            real-time inventory management, and responsive design. Achieved
            40% faster page load times through optimization."
          </code>
        </div>
        <div className="tutorials-note">
          <strong>💡 Pro Tip:</strong> Provide specific details (technologies, metrics, achievements) for better AI-generated content.
        </div>
      </motion.section>

      {/* Step 6 */}
      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">6</span>
          <div className="step-header">
            <h2>🎬 Live Preview & Testing</h2>
            <span className="time-badge">⏱️ 2 min</span>
          </div>
        </div>
        <p>
          See your changes in real-time! The live preview feature lets you test your
          portfolio across different devices before deploying.
        </p>
        <div className="tutorials-highlight">
          <h3>Preview Features</h3>
          <ul>
            <li>📱 Mobile responsive view</li>
            <li>💻 Desktop layout preview</li>
            <li>🖥️ Tablet optimization check</li>
            <li>🔄 Real-time update reflection</li>
          </ul>
        </div>
      </motion.section>

      {/* Step 7 */}
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">7</span>
          <div className="step-header">
            <h2>⚡ One-Click Deployment</h2>
            <span className="time-badge">⏱️ 1 min</span>
          </div>
        </div>
        <p>
          Launch your portfolio to the world instantly! ProFolio.AI handles all the
          technical complexity—hosting, SSL certificates, and global CDN distribution.
        </p>
        <div className="tutorials-highlight">
          <h3>Deployment Benefits</h3>
          <ul>
            <li>🔒 Free SSL Certificate (HTTPS)</li>
            <li>🌍 Global CDN for fast loading</li>
            <li>📈 Built-in analytics</li>
            <li>🔗 Custom subdomain (yourname.profolio.ai)</li>
            <li>♻️ Automatic updates on re-deploy</li>
          </ul>
        </div>
      </motion.section>

      {/* Step 8 */}
      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">8</span>
          <div className="step-header">
            <h2>🔗 Custom Domain Setup (Premium)</h2>
            <span className="time-badge">⏱️ 5 min</span>
          </div>
        </div>
        <p>
          Take your portfolio to the next level with a custom domain. Connect your
          existing domain or purchase a new one through our partners.
        </p>
        <div className="tutorials-example">
          <h4>DNS Configuration Steps:</h4>
          <code>
            1. Purchase domain from registrar (e.g., GoDaddy, Namecheap)
            2. Access DNS settings in your domain panel
            3. Add CNAME record: www → yourportfolio.profolio.ai
            4. Add A record: @ → ProFolio.AI IP
            5. Wait 24-48 hours for DNS propagation
          </code>
        </div>
      </motion.section>

      {/* Step 9 */}
      <motion.section
        className="resources-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">9</span>
          <div className="step-header">
            <h2>🛠️ Managing & Updating Your Portfolio</h2>
            <span className="time-badge">⏱️ 3 min</span>
          </div>
        </div>
        <p>
          Your career evolves, and so should your portfolio. Easily manage all your
          deployments from a central dashboard.
        </p>
        <div className="tutorials-highlight">
          <h3>Dashboard Features</h3>
          <ul>
            <li>📊 View all your portfolios</li>
            <li>✏️ Quick edit and re-deploy</li>
            <li>🗑️ Delete outdated versions</li>
            <li>📈 Track visitor analytics</li>
            <li>📋 Copy portfolio link instantly</li>
            <li>⭐ Bookmark favorite templates</li>
          </ul>
        </div>
      </motion.section>

      {/* Step 10 */}
      <motion.section
        className="resources-section alt-bg"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="tutorial-step">
          <span className="step-badge">10</span>
          <div className="step-header">
            <h2>📈 SEO Optimization & Best Practices</h2>
            <span className="time-badge">⏱️ 4 min</span>
          </div>
        </div>
        <p>
          Make your portfolio discoverable! Follow these SEO best practices to ensure
          recruiters and clients can find you online.
        </p>
        <div className="tutorials-highlight">
          <h3>SEO Checklist</h3>
          <ul>
            <li>✅ Use relevant keywords in your bio</li>
            <li>✅ Add meta descriptions for projects</li>
            <li>✅ Include alt text for images</li>
            <li>✅ Link to your social media profiles</li>
            <li>✅ Keep content fresh and updated</li>
            <li>✅ Use descriptive project titles</li>
          </ul>
        </div>
        <div className="tutorials-note">
          <strong>💡 Pro Tip:</strong> Share your portfolio link on LinkedIn, GitHub, and Twitter to boost visibility!
        </div>
      </motion.section>

      {/* Keyboard Shortcuts */}
      <motion.section
        className="resources-section shortcuts-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>⌨️ Keyboard Shortcuts</h2>
        <p className="section-intro">Work faster with these handy shortcuts:</p>
        <div className="shortcuts-grid">
          <div className="shortcut-item">
            <kbd>Ctrl</kbd> + <kbd>S</kbd>
            <span>Save changes</span>
          </div>
          <div className="shortcut-item">
            <kbd>Ctrl</kbd> + <kbd>P</kbd>
            <span>Preview portfolio</span>
          </div>
          <div className="shortcut-item">
            <kbd>Ctrl</kbd> + <kbd>D</kbd>
            <span>Deploy now</span>
          </div>
          <div className="shortcut-item">
            <kbd>Ctrl</kbd> + <kbd>Z</kbd>
            <span>Undo changes</span>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="resources-section tutorials-faq"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>❓ Frequently Asked Questions</h2>
        <div className="faq-item">
          <h4>1. Do I need coding knowledge to use ProFolio.AI?</h4>
          <p>Absolutely not! ProFolio.AI is designed for everyone—no coding required. Our intuitive interface and AI assistance make portfolio creation accessible to all.</p>
        </div>
        <div className="faq-item">
          <h4>2. Can I use my own custom domain?</h4>
          <p>Yes! Premium users can connect their own domains. We provide detailed DNS configuration instructions and support.</p>
        </div>
        <div className="faq-item">
          <h4>3. Is ProFolio.AI free to use?</h4>
          <p>Yes! We offer a free tier with all essential features. Premium plans unlock custom domains, advanced analytics, and priority support.</p>
        </div>
        <div className="faq-item">
          <h4>4. How many portfolios can I create?</h4>
          <p>Free users can create up to 3 portfolios. Premium users enjoy unlimited portfolio creation.</p>
        </div>
        <div className="faq-item">
          <h4>5. Can I edit my portfolio after deployment?</h4>
          <p>Yes! You can edit and re-deploy your portfolio anytime. Changes go live in seconds.</p>
        </div>
        <div className="faq-item">
          <h4>6. What resume formats are supported?</h4>
          <p>We support PDF, DOC, DOCX, and TXT formats. PDF is recommended for best extraction accuracy.</p>
        </div>
        <div className="faq-item">
          <h4>7. How secure is my data?</h4>
          <p>Very secure! We use industry-standard encryption, secure authentication, and never share your data with third parties.</p>
        </div>
      </motion.section>

      {/* Video Tutorials */}
      <motion.section
        className="resources-section video-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>🎥 Video Tutorial Series</h2>
        <p className="section-intro">Visual learner? Watch our step-by-step video guides:</p>
        <div className="video-grid">
          <div className="video-card">
            <div className="video-thumbnail">🎬</div>
            <h4>Getting Started Guide</h4>
            <p>Complete walkthrough for beginners</p>
            <span className="video-duration">⏱️ 8:24</span>
          </div>
          <div className="video-card">
            <div className="video-thumbnail">🎨</div>
            <h4>Template Customization</h4>
            <p>Master the art of personalization</p>
            <span className="video-duration">⏱️ 12:15</span>
          </div>
          <div className="video-card">
            <div className="video-thumbnail">🚀</div>
            <h4>Deployment Deep Dive</h4>
            <p>Advanced deployment strategies</p>
            <span className="video-duration">⏱️ 6:40</span>
          </div>
        </div>
      </motion.section>

      {/* Summary */}
      <motion.footer
        className="resources-summary tutorials-summary"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>🎉 You're All Set!</h2>
        <p>
          Congratulations! You now have everything you need to create a stunning
          professional portfolio with <strong>ProFolio.AI</strong>. With AI-driven content,
          modern templates, and one-click deployment, building your online presence has
          never been easier. Start creating today and stand out from the crowd!
        </p>
        <button className="cta-button-primary">Create Your Portfolio Now →</button>
      </motion.footer>
    </div>
  );
};

export default Tutorials;
