import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-lg-4 col-md-6 mb-4 footer-column"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h5 className="footer-heading">ProFolio.AI</h5>
            <p className="small">
              ProFolio.AI is your AI-powered portfolio website generator. Upload
              your resume, choose a template, and instantly deploy a
              professional, responsive portfolio site—without writing a single
              line of code.
            </p>
            <p className="small">
              Our mission is to empower students, professionals, and creators to
              showcase their skills and achievements globally with ease.
            </p>
          </motion.div>
          <motion.div
            className="col-lg-2 col-md-3 col-6 mb-4 footer-column"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className="footer-link">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="footer-link">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="footer-link">
                  Dashboard
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="col-lg-3 col-md-3 col-6 mb-4 footer-column"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5 className="footer-heading">Resources</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/templates" className="footer-link">
                  Templates
                </Link>
              </li>
            </ul>
          </motion.div>
          <motion.div
            className="col-lg-3 col-md-12 footer-column text-lg-start text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h5 className="footer-heading">Stay Connected</h5>
            <p className="small">
              Have questions or ideas? Reach out to us anytime—we’d love to hear
              from you!
            </p>
            <div className="social-icons mb-3">
              <a
                href="https://facebook.com/profolioai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-icon"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://twitter.com/profolioai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="social-icon"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://linkedin.com/company/profolioai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-icon"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://instagram.com/profolioai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="mailto:contact@profolio.ai"
                aria-label="Email"
                className="social-icon"
              >
                <i className="bi bi-envelope"></i>
              </a>
            </div>
            <p className="small">📧 contact@profolio.ai</p>
          </motion.div>
        </div>
        <motion.div
          className="row"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="col-12 text-center pt-4 mt-4 border-top copyright-text">
            <p>© {currentYear} ProFolio.AI. All Rights Reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
