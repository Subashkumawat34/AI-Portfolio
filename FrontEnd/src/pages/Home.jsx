import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Home.css";
// Import assets
import HeroImage from "../assets/section1.png";
import Feature1 from "../assets/CreateIcon.png";
import Feature2 from "../assets/DeployIcon.png";
import Feature3 from "../assets/EditIcon.png";
import Template1 from "../assets/Template1.png";
import Template2 from "../assets/Template2.png";
import Template3 from "../assets/Template3.png";
import Template4 from "../assets/Template4.png";
import Template5 from "../assets/Template5.png";
import Template6 from "../assets/Template6.png";
import Customised from "../assets/Customised.jpg";

const Home = ({ isAuthenticated, userName }) => {
    const navigate = useNavigate();

    // FAQ State
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/signup");
        }
    };

    const templates = [Template1, Template2, Template3, Template4, Template5, Template6];

    const faqs = [
        {
            question: "Is it really free to generate a website?",
            answer: "Yes! You can generate a basic portfolio website for free. We also offer premium templates and advanced features for power users."
        },
        {
            question: "Do I need coding skills?",
            answer: "Not at all. Our AI handles all the code generation. You just provide your details or upload your resume, and we build the site for you."
        },
        {
            question: "Can I host the website on my own domain?",
            answer: "Yes, you can download the source code and host it anywhere, or use our one-click deployment to Vercel/GitHub."
        },
        {
            question: "How does the AI content generation work?",
            answer: "We use advanced LLMs to analyze your profile and generate professional, SEO-optimized content tailored to your industry."
        }
    ];

    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const scaleUp = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    return (
        <div className="page-container">
            {/* HERO SECTION */}
            <section className="hero-section">
                <div className="content-wrapper">
                    <motion.div
                        className="left-col"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div className="breadcrumb" variants={fadeInUp}>
                            <span>AI-POWERED</span>
                            <span>•</span>
                            <span>PORTFOLIO BUILDER</span>
                        </motion.div>
                        <motion.h1 variants={fadeInUp}>
                            Build Your <span className="home-gradient-text">Dream Portfolio</span> <br />
                            in Seconds with AI
                        </motion.h1>
                        <motion.p className="subheading" variants={fadeInUp}>
                            Transform your resume into a stunning, professional website effortlessly.
                            No coding required. Just upload, customize, and deploy.
                        </motion.p>
                        <motion.div className="button-group" variants={fadeInUp}>
                            <button onClick={handleGetStarted} className="cta-btn">
                                {isAuthenticated ? `Go To Dashboard` : "Get Started"}
                            </button>
                            <Link to="/how-it-works" className="link-btn">
                                How it Works
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="right-col"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="image-card">
                            <img src={HeroImage} alt="AI Website Builder Preview" className="responsive-image" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* MARQUEE */}
            <div className="marquee-container">
                <div className="marquee-content">
                    <div className="marquee-item"><i className="bi bi-code-slash"></i> React</div>
                    <div className="marquee-item"><i className="bi bi-filetype-html"></i> HTML5</div>
                    <div className="marquee-item"><i className="bi bi-filetype-css"></i> CSS3</div>
                    <div className="marquee-item"><i className="bi bi-box-seam"></i> Parcel</div>
                    <div className="marquee-item"><i className="bi bi-github"></i> GitHub</div>
                    <div className="marquee-item"><i className="bi bi-hdd-network"></i> Vercel</div>
                    <div className="marquee-item"><i className="bi bi-lightning-charge"></i> Vite</div>
                    <div className="marquee-item"><i className="bi bi-bootstrap"></i> Bootstrap</div>
                    {/* Duplicate for seamless loop */}
                    <div className="marquee-item"><i className="bi bi-code-slash"></i> React</div>
                    <div className="marquee-item"><i className="bi bi-filetype-html"></i> HTML5</div>
                    <div className="marquee-item"><i className="bi bi-filetype-css"></i> CSS3</div>
                    <div className="marquee-item"><i className="bi bi-box-seam"></i> Parcel</div>
                    <div className="marquee-item"><i className="bi bi-github"></i> GitHub</div>
                    <div className="marquee-item"><i className="bi bi-hdd-network"></i> Vercel</div>
                    <div className="marquee-item"><i className="bi bi-lightning-charge"></i> Vite</div>
                    <div className="marquee-item"><i className="bi bi-bootstrap"></i> Bootstrap</div>
                </div>
            </div>

            {/* STATS */}
            <div className="stats-wrapper">
                <motion.section
                    className="stats-section"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div className="stat-box" variants={scaleUp}>
                        <span className="stat-number">1000+</span>
                        <span className="stat-label">Websites Created</span>
                    </motion.div>
                    <motion.div className="stat-box" variants={scaleUp}>
                        <span className="stat-number">50+</span>
                        <span className="stat-label">Templates</span>
                    </motion.div>
                    <motion.div className="stat-box" variants={scaleUp}>
                        <span className="stat-number">5s</span>
                        <span className="stat-label">Generation Time</span>
                    </motion.div>
                    <motion.div className="stat-box" variants={scaleUp}>
                        <span className="stat-number">4.9/5</span>
                        <span className="stat-label">User Rating</span>
                    </motion.div>
                </motion.section>
            </div>

            {/* TEMPLATE SHOWCASE */}
            <section className="template-showcase-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Stunning Templates for Every Profession
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    Choose from a wide variety of professionally designed, responsive templates.
                </motion.p>

                <div className="template-scroll-container">
                    <motion.div
                        className="template-track"
                        initial={{ x: 0 }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                        {[...templates, ...templates].map((template, index) => (
                            <div key={index} className="template-card">
                                <img src={template} alt={`Template ${index + 1}`} className="template-img" />
                                <div className="template-overlay">
                                    <button onClick={handleGetStarted} className="preview-btn">View Template</button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* FEATURE DEEP DIVES */}
            <section className="deep-dive-section">
                {/* Feature 1: AI Writing */}
                <motion.div
                    className="deep-dive-row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="row-bg-overlay" style={{ backgroundImage: `url(${Feature1})` }}></div>
                    <motion.div className="deep-dive-content" variants={fadeInUp}>
                        <div className="icon-badge"><img src={Feature1} alt="Create" /></div>
                        <h2>AI-Powered Writing Assistant</h2>
                        <p>
                            Struggling with what to write? Our advanced AI analyzes your role and industry to generate professional bios, project descriptions, and skill summaries instantly.
                        </p>
                        <ul className="feature-list">
                            <li><i className="bi bi-check-circle-fill"></i> SEO-optimized content</li>
                            <li><i className="bi bi-check-circle-fill"></i> Industry-specific terminology</li>
                            <li><i className="bi bi-check-circle-fill"></i> Tone adjustment</li>
                        </ul>
                    </motion.div>
                    <motion.div className="deep-dive-image" variants={fadeInUp}>
                        {/* Placeholder for a UI mockup of AI writing */}
                        <div className="ui-mockup-card">
                            <div className="mockup-header">
                                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
                            </div>
                            <div className="mockup-body">
                                <div className="typing-indicator">AI is writing your bio...</div>
                                <div className="generated-text">
                                    "Passionate Full Stack Developer with 5+ years of experience in building scalable web applications..."
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Feature 2: Customization */}
                <motion.div
                    className="deep-dive-row reverse"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="row-bg-overlay" style={{ backgroundImage: `url(${Customised})` }}></div>
                    <motion.div className="deep-dive-image" variants={fadeInUp}>
                        <img src={Customised} alt="Customization" className="feature-highlight-img" />
                    </motion.div>
                    <motion.div className="deep-dive-content" variants={fadeInUp}>
                        <div className="icon-badge"><img src={Feature3} alt="Edit" /></div>
                        <h2>Real-Time Customization</h2>
                        <p>
                            Make it truly yours. Tweak colors, fonts, and layouts in real-time without touching a single line of code.
                        </p>
                        <ul className="feature-list">
                            <li><i className="bi bi-check-circle-fill"></i> Live preview</li>
                            <li><i className="bi bi-check-circle-fill"></i> Custom color palettes</li>
                            <li><i className="bi bi-check-circle-fill"></i> Drag-and-drop ordering</li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Feature 3: Deployment */}
                <motion.div
                    className="deep-dive-row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <div className="row-bg-overlay" style={{ backgroundImage: `url(${Feature2})` }}></div>
                    <motion.div className="deep-dive-content" variants={fadeInUp}>
                        <div className="icon-badge"><img src={Feature2} alt="Deploy" /></div>
                        <h2>One-Click Global Deployment</h2>
                        <p>
                            Push your portfolio to the world instantly. We integrate deeply with GitHub and Vercel for free, SSL-secured hosting.
                        </p>
                        <ul className="feature-list">
                            <li><i className="bi bi-check-circle-fill"></i> Free .vercel.app domain</li>
                            <li><i className="bi bi-check-circle-fill"></i> Automated CI/CD pipelines</li>
                            <li><i className="bi bi-check-circle-fill"></i> SSL Security included</li>
                        </ul>
                    </motion.div>
                    <motion.div className="deep-dive-image" variants={fadeInUp}>
                        <div className="deployment-card">
                            <div className="deploy-status success">
                                <i className="bi bi-check-circle"></i> Deployment Successful
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* BENTO GRID SUMMARY */}
            <section className="bento-grid">
                <div className="bento-item bento-large">
                    <i className="bi bi-stars bento-icon"></i>
                    <h3 className="bento-title">Smart Resume Parser</h3>
                    <p className="bento-desc">
                        Upload your existing PDF resume and watch as we extract skills, education, and experience to populate your site automatically.
                    </p>
                </div>
                <div className="bento-item">
                    <i className="bi bi-shield-lock bento-icon"></i>
                    <h3 className="bento-title">Secure & Private</h3>
                    <p className="bento-desc">Your data is yours. We don't store your personal info longer than needed.</p>
                </div>
                <div className="bento-item bento-tall">
                    <i className="bi bi-palette bento-icon"></i>
                    <h3 className="bento-title">Premium Designs</h3>
                    <p className="bento-desc">
                        Access a growing library of high-quality designs that stand out to recruiters.
                    </p>
                </div>
                <div className="bento-item">
                    <i className="bi bi-phone bento-icon"></i>
                    <h3 className="bento-title">Mobile First</h3>
                    <p className="bento-desc">100% responsive designs that look perfect on any device.</p>
                </div>
                <div className="bento-item">
                    <i className="bi bi-graph-up bento-icon"></i>
                    <h3 className="bento-title">Analytics Ready</h3>
                    <p className="bento-desc">Integrate Google Analytics to track who visits your portfolio.</p>
                </div>
            </section>

            {/* TARGET AUDIENCE */}
            <section className="audience-section">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Built For Everyone
                </motion.h2>
                <div className="audience-grid">
                    <motion.div className="audience-card" whileHover={{ y: -10 }}>
                        <div className="audience-icon"><i className="bi bi-code-square"></i></div>
                        <h3>Developers</h3>
                        <p>Showcase your GitHub repos, live projects, and tech stack with dedicated code-friendly sections.</p>
                    </motion.div>
                    <motion.div className="audience-card" whileHover={{ y: -10 }}>
                        <div className="audience-icon"><i className="bi bi-briefcase"></i></div>
                        <h3>Job Seekers</h3>
                        <p>Stand out from the pile of resumes with a personal brand website that highlights your soft skills.</p>
                    </motion.div>
                    <motion.div className="audience-card" whileHover={{ y: -10 }}>
                        <div className="audience-icon"><i className="bi bi-bezier2"></i></div>
                        <h3>Designers</h3>
                        <p>Let your visual work speak for itself with image-heavy galleries and clean, minimal layouts.</p>
                    </motion.div>
                </div>
            </section>

            {/* CTA BANNER */}
            <motion.section
                className="cta-banner"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2>Ready to Showcase Your Work?</h2>
                <motion.button
                    onClick={handleGetStarted}
                    className="cta-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Create Your Portfolio Now
                </motion.button>
            </motion.section>

            {/* TESTIMONIALS */}
            <section className="testimonial-section">
                <motion.h2
                    className="testimonial-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    What Our Users Say
                </motion.h2>
                <motion.div
                    className="testimonial-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    <motion.div className="testimonial-card" variants={fadeInUp}>
                        <div className="role">Software Engineer</div>
                        <h4>Sarah Jenkins</h4>
                        <p>"I built my portfolio in 5 minutes. The AI wrote better copy than I could have myself. Highly recommended!"</p>
                    </motion.div>
                    <motion.div className="testimonial-card" variants={fadeInUp}>
                        <div className="role">Graphic Designer</div>
                        <h4>Mike Ross</h4>
                        <p>"The templates are gorgeous. I got 3 job offers within a week of sharing my new site."</p>
                    </motion.div>
                    <motion.div className="testimonial-card" variants={fadeInUp}>
                        <div className="role">Student</div>
                        <h4>Emily Chen</h4>
                        <p>"As a fresh grad, I didn't know where to start. This tool made it so easy to look professional."</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* FAQ SECTION */}
            <section className="faq-section">
                <div className="faq-container">
                    <div className="faq-header">
                        <motion.h2
                            className="faq-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Frequently Asked Questions
                        </motion.h2>
                        <motion.p
                            className="faq-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Everything you need to know about the product and billing. Can't find the answer you're looking for?
                            <br />
                            <a href="mailto:support@portfolio-ai.com" className="faq-contact-link">Chat to our friendly team</a>.
                        </motion.p>
                    </div>

                    <div className="faq-list">
                        <AnimatePresence>
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                                    onClick={() => toggleFAQ(index)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <button className="faq-question">
                                        <span className="question-text">{faq.question}</span>
                                        <motion.span
                                            className="faq-toggle-icon"
                                            animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                        >
                                            <i className="bi bi-chevron-down"></i>
                                        </motion.span>
                                    </button>
                                    <motion.div
                                        className="faq-answer-wrapper"
                                        initial={false}
                                        animate={{ height: activeIndex === index ? "auto" : 0, opacity: activeIndex === index ? 1 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="faq-answer">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
