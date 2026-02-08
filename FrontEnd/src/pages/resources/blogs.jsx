import { motion } from "framer-motion";
import "../../styles/Resources.css";

const Blogs = () => {
  const blogs = [
    {
      title: "🚀 AI-Powered Portfolios",
      text: "Artificial Intelligence is transforming personal branding. Discover how ProFolio.AI helps you auto-generate stunning content that impresses recruiters.",
      tag: "AI & Branding",
      link: "#",
    },
    {
      title: "🎨 Designing Portfolios that Stand Out",
      text: "Good design is half the job. Learn how to choose templates, colors, and layouts that match your professional goals.",
      tag: "Design Tips",
      link: "#",
    },
    {
      title: "⚡ One-Click Deployment Explained",
      text: "Hosting doesn’t have to be hard. Understand how ProFolio.AI’s one-click deploy removes the complexity of traditional hosting.",
      tag: "DevOps Simplified",
      link: "#",
    },
    {
      title: "🌍 Why Every Professional Needs a Portfolio",
      text: "Resumes are static, portfolios are dynamic. See why recruiters and clients value portfolios more than ever before.",
      tag: "Career Growth",
      link: "#",
    },
  ];

  return (
    <div className="resources-container">
      {/* Hero */}
      <motion.header
        className="resources-hero blogs-hero"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Latest Blogs & Insights</h1>
        <p>
          Stay updated with the latest trends in AI, portfolio design, and
          digital transformation. Curated insights to help you build your
          professional identity with <strong>ProFolio.AI</strong>.
        </p>
      </motion.header>

      <motion.section
        className="blogs-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {blogs.map((blog, i) => (
          <motion.article
            key={i}
            className="blog-card pro-card"
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <span className="blog-tag">{blog.tag}</span>
            <h2>{blog.title}</h2>
            <p>{blog.text}</p>
            <a href={blog.link} className="read-more">
              Read More →
            </a>
          </motion.article>
        ))}
      </motion.section>
      <motion.section
        className="blogs-cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>✨ Want More Insights?</h2>
        <p>
          Explore detailed guides, expert advice, and case studies on how{" "}
          <strong>ProFolio.AI</strong> is helping professionals showcase their
          identity online.
        </p>
        <button className="explore-btn">Explore All Blogs</button>
      </motion.section>
    </div>
  );
};

export default Blogs;
