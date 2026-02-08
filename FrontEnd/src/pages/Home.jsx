import "../styles/Home.css";
import { Button } from "react-bootstrap";
import SchoolImage from "../assets/school-image.jpg";
import Section1 from "../assets/section1.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home({ isAuthenticated, userName }) {
  const navigate = useNavigate();

  const handleHowItWorksClick = () => {
    navigate("/how-it-works");
  };

  const handlePrimaryActionClick = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <>
      <div className="page-container">
        <motion.div
          className="hero-section"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <div className="content-wrapper">
            <motion.div className="left-col" variants={fadeLeft}>
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <a href="/">Home</a>
                <span aria-hidden="true">›</span>
                <span>Create Portfolios</span>
              </nav>

              <h1>
                Online Portfolio
                <br />
                Creator
              </h1>

              <p className="subheading">
                Build and deploy a professional portfolio in minutes —
                templates, drag-and-drop editor and one-click deployment.
              </p>

              <div className="button-group">
                <Button
                  className="cta-btn"
                  onClick={handlePrimaryActionClick}
                  aria-label="Create portfolio"
                >
                  {isAuthenticated
                    ? "Go to Dashboard"
                    : "Create a portfolio website"}
                </Button>

                <Button
                  variant="link"
                  className="link-btn"
                  onClick={handleHowItWorksClick}
                  aria-label="See how it works"
                >
                  See How it Works
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="right-col"
              variants={fadeRight}
              aria-hidden="true"
            >
              <div className="image-card">
                <img
                  src={SchoolImage}
                  alt="Portfolio preview on a laptop"
                  className="responsive-image"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="features-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          {[
            { icon: "🧩", text: "Easy drag-and-drop editor" },
            { icon: "🖼️", text: "3M+ free stock photos and graphics" },
            { icon: "✨", text: "Generate content and media with AI" },
            { icon: "🔗", text: "Download or share designs easily" },
          ].map((f, i) => (
            <motion.div key={i} className="feature" variants={fadeUp}>
              <div className="icon">{f.icon}</div>
              <p>{f.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="extra-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div className="extra-content" variants={fadeLeft}>
          <h2>Smart online portfolio website maker</h2>
          <p>
            Create a portfolio website that’s as unique and creative as you are.
            Impress potential clients and employers from the get-go with a
            stunning portfolio design made using ProFolio.AI free online
            portfolio website builder. Easily create professional-looking
            portfolios that showcase your skills, qualifications, and best work.
          </p>
        </motion.div>

        <motion.div className="extra-image" variants={fadeRight}>
          <img
            src={Section1}
            alt="Example portfolio template"
            className="extra-responsive-img"
            loading="lazy"
          />
        </motion.div>

        <motion.div className="extra-content" variants={fadeLeft}>
          <p>
            Powered by our smart drag-and-drop editing tools and features, you
            can create a creative portfolio website in minutes. Showcase your
            projects, work experiences, and skills through beautiful layouts and
            publish instantly.
          </p>
          <Button className="cta-btn">Start Building</Button>
        </motion.div>
      </motion.div>
      <motion.div
        className="three-divs-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        {[
          {
            title: "Showcase your best work in one site",
            text: "A good portfolio website design is made out of well-chosen pieces that tell your story. Whether you are a writer, designer, or developer, highlight your best projects.",
          },
          {
            title: "Get your digital portfolio in minutes",
            text: "Publish and share your new portfolio with just a few clicks. Create a one-page portfolio with a free ProFolio.AI domain, or connect your custom domain.",
          },
          {
            title: "Spotlight your printed portfolio",
            text: "When you need a physical copy of your portfolio, ProFolio.AI Print is ready. Choose a template and get noticed both online and offline.",
          },
        ].map((d, i) => (
          <motion.div key={i} className="three-div" variants={fadeUp}>
            <h2>{d.title}</h2>
            <p>{d.text}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="cta-banner"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>
          Create digital portfolios for products, services, and brands in
          minutes
        </h2>
        <button className="cta-button">Make a digital portfolio</button>
      </motion.div>
      <motion.div
        className="testimonial-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <h2 className="testimonial-title">What people say about ProFolio.AI</h2>

        <div className="testimonial-grid">
          {[
            {
              name: "Student User",
              role: "Built Portfolio from Resume",
              text: "I uploaded my resume and within minutes ProFolio.AI created a complete portfolio site. It looked professional and really helped me showcase my academic projects.",
            },
            {
              name: "Job Seeker",
              role: "AI-Enhanced Personal Branding",
              text: "The AI-generated content gave me polished project descriptions and skill summaries that I could never phrase so well on my own.",
            },
            {
              name: "Freelancer",
              role: "Instant Website Deployment",
              text: "ProFolio.AI saved me hours of setup. I deployed instantly and shared my portfolio link with clients without worrying about hosting.",
            },
            {
              name: "Career Switcher",
              role: "From Resume to Online Identity",
              text: "Having a professional website helped me present my transferable skills clearly. ProFolio.AI made the whole process effortless.",
            },
          ].map((t, i) => (
            <motion.div key={i} className="testimonial-card" variants={fadeUp}>
              <h4>{t.name}</h4>
              <p className="role">{t.role}</p>
              <p>{t.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="foot-button"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Button
          className="cta-btn"
          onClick={handlePrimaryActionClick}
          aria-label="Create portfolio"
        >
          {isAuthenticated ? "Go to Dashboard" : "Create a portfolio website"}
        </Button>

        <Button
          variant="link"
          className="link-btn"
          onClick={handleHowItWorksClick}
          aria-label="See how it works"
        >
          See How it Works
        </Button>
      </motion.div>
    </>
  );
}

export default Home;
