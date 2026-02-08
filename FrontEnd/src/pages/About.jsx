import { motion } from "framer-motion";
import "../styles/About.css";

const About = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>About ProFolio.AI</h1>
        <p>
          At <strong>ProFolio.AI</strong>, we believe that building your online
          presence should be <strong>effortless, fast, and professional</strong>
          . Our platform transforms your resume into a stunning, live portfolio
          website in just minutes.
        </p>
      </motion.section>

      <div className="about-container">
        {/* Mission, Vision, Values */}
        <div className="about-sections">
          {[
            {
              title: "🎯 Our Mission",
              text: "To empower every learner and professional with tools that make personal branding simple and impactful. With ProFolio.AI, anyone can create a polished portfolio website without coding or design skills.",
            },
            {
              title: "🌍 Our Vision",
              text: "We envision a future where AI-driven automation redefines the way individuals showcase their skills, projects, and achievements—helping them stand out globally with a click.",
            },
            {
              title: "💡 Our Values",
              text: "Simplicity in user experience, Innovation in technology, and Empowerment for users to shine in the digital space.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="about-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ scale: 1.05 }}
            >
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="about-features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>✨ Why Choose ProFolio.AI?</h2>
          <div className="features-grid">
            {[
              "📄 AI-powered resume parsing",
              "🎨 Professionally designed templates",
              "⚡ One-click deployment on Vercel",
              "📱 Fully responsive websites",
              "🔒 Secure & scalable",
              "🌍 Share your unique portfolio link",
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-item"
                variants={fadeUp}
                custom={i}
                whileHover={{
                  scale: 1.08,
                  backgroundColor: "rgba(255,255,255,0.25)",
                }}
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="about-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2>⚙️ How It Works</h2>
          <div className="process-steps">
            {[
              {
                step: "1. Upload Resume",
                desc: "Upload your PDF/DOCX resume and let our AI extract your skills, education, projects, and experience.",
              },
              {
                step: "2. Customize & Preview",
                desc: "Choose from a variety of modern templates and preview your portfolio instantly.",
              },
              {
                step: "3. Deploy Instantly",
                desc: "With one click, deploy your portfolio website live on Vercel and share your unique link.",
              },
            ].map((process, i) => (
              <motion.div
                key={i}
                className="process-card"
                variants={fadeUp}
                custom={i}
                whileHover={{ scale: 1.05, rotate: 1 }}
              >
                <h3>{process.step}</h3>
                <p>{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="about-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>🚀 Ready to Build Your Portfolio?</h2>
          <p>
            Join thousands of learners and professionals who are already
            showcasing their achievements with <strong>ProFolio.AI</strong>.
          </p>
          <motion.button
            className="cta-btn"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#02192e",
              color: "#fff",
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
