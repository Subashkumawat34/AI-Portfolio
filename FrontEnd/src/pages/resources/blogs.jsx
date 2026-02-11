import { motion } from "framer-motion";
import { useState } from "react";
import "../../styles/Resources.css";

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const blogs = [
    {
      title: "🚀 The Future of AI-Powered Portfolio Building",
      text: "Discover how artificial intelligence is revolutionizing personal branding and portfolio creation. Learn about AI-driven content generation, smart templates, and automated optimization that helps you stand out in today's competitive job market.",
      tag: "AI & Technology",
      author: { name: "Sarah Chen", role: "AI Engineer", avatar: "👩‍💻" },
      date: "Feb 5, 2026",
      readTime: "5 min read",
      featured: true,
      views: "12.5k",
      likes: "847",
    },
    {
      title: "🎨 Design Principles for Outstanding Portfolios",
      text: "Master the art of visual storytelling. This comprehensive guide covers color theory, typography, layout design, and UX principles that make portfolios memorable and impactful. Perfect for designers and creatives.",
      tag: "Design Tips",
      author: { name: "Alex Rivera", role: "UX Designer", avatar: "🎨" },
      date: "Feb 3, 2026",
      readTime: "8 min read",
      featured: true,
      views: "10.2k",
      likes: "624",
    },
    {
      title: "💼 Why Every Professional Needs a Digital Portfolio",
      text: "Resumes are static, portfolios are dynamic. Explore why recruiters and clients value portfolios 3x more than traditional resumes. Backed by industry research and hiring manager insights.",
      tag: "Career Growth",
      author: { name: "Michael Torres", role: "Career Coach", avatar: "👨‍💼" },
      date: "Jan 28, 2026",
      readTime: "6 min read",
      featured: false,
      views: "8.7k",
      likes: "512",
    },
    {
      title: "⚡ One-Click Deployment: How It Works",
      text: "Demystify the magic behind instant portfolio deployment. Learn about containerization, CDN distribution, SSL certificates, and the infrastructure that makes ProFolio.AI lightning-fast and globally accessible.",
      tag: "DevOps",
      author: { name: "Priya Sharma", role: "DevOps Lead", avatar: "⚙️" },
      date: "Jan 25, 2026",
      readTime: "7 min read",
      featured: false,
      views: "6.3k",
      likes: "438",
    },
    {
      title: "🎯 SEO Strategies to Get Your Portfolio Noticed",
      text: "Rank higher on Google and LinkedIn! Comprehensive SEO tactics including keyword optimization, meta tags, schema markup, and link building strategies specifically tailored for professional portfolios.",
      tag: "SEO & Marketing",
      author: { name: "David Kim", role: "SEO Specialist", avatar: "📊" },
      date: "Jan 20, 2026",
      readTime: "9 min read",
      featured: false,
      views: "9.1k",
      likes: "701",
    },
    {
      title: "🌟 Success Story: From Unemployed to Dream Job",
      text: "Meet Jessica, who landed her dream role at Google after redesigning her portfolio with ProFolio.AI. Her inspiring journey shows the power of professional presentation and strategic personal branding.",
      tag: "Case Studies",
      author: { name: "Jessica Martinez", role: "Software Engineer", avatar: "⭐" },
      date: "Jan 15, 2026",
      readTime: "4 min read",
      featured: false,
      views: "15.8k",
      likes: "1.2k",
    },
    {
      title: "💻 Developer Portfolio Best Practices 2026",
      text: "Stand out in the tech industry with these proven strategies. Learn how to showcase your GitHub projects, technical skills, and coding achievements in a way that impresses hiring managers at top tech companies.",
      tag: "For Developers",
      author: { name: "Ryan Cooper", role: "Senior Developer", avatar: "💻" },
      date: "Jan 10, 2026",
      readTime: "10 min read",
      featured: false,
      views: "11.4k",
      likes: "895",
    },
    {
      title: "🎓 Student Portfolio Guide: Land Your First Internship",
      text: "No experience? No problem! Discover how students and recent graduates can create compelling portfolios that highlight academic projects, extracurricular activities, and potential—even without professional experience.",
      tag: "For Students",
      author: { name: "Emily Zhang", role: "Student Advisor", avatar: "🎓" },
      date: "Jan 5, 2026",
      readTime: "6 min read",
      featured: false,
      views: "7.9k",
      likes: "563",
    },
    {
      title: "🔒 Privacy & Security in Online Portfolios",
      text: "Protect your personal information while maintaining professional visibility. Essential security practices, privacy settings, and data protection strategies for your online portfolio.",
      tag: "Security",
      author: { name: "Marcus Johnson", role: "Security Expert", avatar: "🔐" },
      date: "Dec 30, 2025",
      readTime: "5 min read",
      featured: false,
      views: "5.6k",
      likes: "412",
    },
    {
      title: "📸 Photography Tips for Portfolio Images",
      text: "First impressions matter! Professional photography tips for portfolio headshots, project screenshots, and visual content. Learn lighting, composition, and editing techniques that make your portfolio shine.",
      tag: "Photography",
      author: { name: "Olivia Brown", role: "Photographer", avatar: "📷" },
      date: "Dec 25, 2025",
      readTime: "7 min read",
      featured: false,
      views: "6.8k",
      likes: "489",
    },
    {
      title: "🌍 Global Portfolio Trends Across Industries",
      text: "Analyze portfolio trends from 50+ countries and 20+ industries. Data-driven insights on what works in tech vs. creative fields, regional preferences, and emerging design patterns worldwide.",
      tag: "Industry Insights",
      author: { name: "Sophie Anderson", role: "Data Analyst", avatar: "📈" },
      date: "Dec 20, 2025",
      readTime: "11 min read",
      featured: false,
      views: "4.2k",
      likes: "327",
    },
    {
      title: "🗣️ Storytelling Through Your Portfolio",
      text: "Transform your portfolio from a list of achievements into a compelling narrative. Master the art of storytelling to emotionally connect with recruiters and clients, making your portfolio unforgettable.",
      tag: "Personal Branding",
      author: { name: "James Wilson", role: "Brand Strategist", avatar: "🎭" },
      date: "Dec 15, 2025",
      readTime: "8 min read",
      featured: false,
      views: "9.3k",
      likes: "756",
    },
    {
      title: "🤝 Networking with Your Portfolio",
      text: "Your portfolio is your networking superpower. Learn how to leverage your online presence for LinkedIn outreach, conference networking, and building professional relationships that lead to opportunities.",
      tag: "Networking",
      author: { name: "Lisa Davis", role: "HR Director", avatar: "🤝" },
      date: "Dec 10, 2025",
      readTime: "6 min read",
      featured: false,
      views: "7.1k",
      likes: "582",
    },
  ];

  const categories = [
    "All",
    "AI & Technology",
    "Design Tips",
    "Career Growth",
    "Case Studies",
    "For Developers",
    "SEO & Marketing",
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.tag === selectedCategory);

  const featuredBlogs = blogs.filter((blog) => blog.featured);

  return (
    <div className="resources-container">
      {/* Hero */}
      <motion.header
        className="resources-hero blogs-hero"
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>📚 Latest Blogs & Insights</h1>
        <p>
          Stay ahead of the curve with expert insights on AI, portfolio design,
          career development, and digital transformation. Curated knowledge to
          help you build an outstanding professional identity with{" "}
          <strong>ProFolio.AI</strong>.
        </p>
        <div className="blog-stats">
          <span className="stat-item">📝 {blogs.length} Articles</span>
          <span className="stat-item">👥 50k+ Readers</span>
          <span className="stat-item">⭐ Expert Authors</span>
        </div>
      </motion.header>

      {/* Search and Filter */}
      <motion.section
        className="filter-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search articles, topics, or authors..."
            className="search-input"
          />
        </div>
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? "active" : ""
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Featured Blogs */}
      {selectedCategory === "All" && (
        <motion.section
          className="featured-section"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2>⭐ Featured Articles</h2>
          <div className="featured-grid">
            {featuredBlogs.map((blog, i) => (
              <motion.article
                key={i}
                className="blog-card featured-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="featured-badge">FEATURED</div>
                <span className="blog-tag">{blog.tag}</span>
                <h2>{blog.title}</h2>
                <p>{blog.text}</p>
                <div className="blog-meta">
                  <div className="author-info">
                    <span className="author-avatar">{blog.author.avatar}</span>
                    <div>
                      <div className="author-name">{blog.author.name}</div>
                      <div className="author-role">{blog.author.role}</div>
                    </div>
                  </div>
                  <div className="blog-stats-small">
                    <span>👁️ {blog.views}</span>
                    <span>❤️ {blog.likes}</span>
                  </div>
                </div>
                <div className="blog-footer">
                  <span className="blog-date">📅 {blog.date}</span>
                  <span className="blog-read-time">⏱️ {blog.readTime}</span>
                  <a href="#" className="read-more">
                    Read Article →
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      )}

      {/* All Blogs Grid */}
      <motion.section
        className="blogs-grid"
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
        <h2 className="section-title">
          {selectedCategory === "All"
            ? "All Articles"
            : `${selectedCategory} Articles`}
        </h2>
        {filteredBlogs.map((blog, i) => (
          <motion.article
            key={i}
            className={`blog-card pro-card ${blog.featured ? "featured-card" : ""
              }`}
            variants={{
              hidden: { opacity: 0, y: 60 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
          >
            <span className="blog-tag">{blog.tag}</span>
            <h2>{blog.title}</h2>
            <p>{blog.text}</p>
            <div className="blog-meta">
              <div className="author-info">
                <span className="author-avatar">{blog.author.avatar}</span>
                <div>
                  <div className="author-name">{blog.author.name}</div>
                  <div className="author-role">{blog.author.role}</div>
                </div>
              </div>
              <div className="blog-stats-small">
                <span title="Views">👁️ {blog.views}</span>
                <span title="Likes">❤️ {blog.likes}</span>
              </div>
            </div>
            <div className="blog-footer">
              <span className="blog-date">📅 {blog.date}</span>
              <span className="blog-read-time">⏱️ {blog.readTime}</span>
              <a href="#" className="read-more">
                Read More →
              </a>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Newsletter Subscription */}
      <motion.section
        className="newsletter-section"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>📬 Subscribe to Our Newsletter</h2>
        <p>
          Get the latest articles, portfolio tips, and career insights delivered
          to your inbox every week. Join 10,000+ professionals!
        </p>
        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
            className="newsletter-input"
          />
          <button className="subscribe-btn">Subscribe Now</button>
        </div>
        <p className="newsletter-note">
          ✅ No spam, ever. Unsubscribe anytime.
        </p>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="blogs-cta"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>✨ Ready to Build Your Portfolio?</h2>
        <p>
          You've learned the strategies, now it's time to take action.{" "}
          <strong>ProFolio.AI</strong> helps you create a stunning professional
          portfolio in minutes. Join thousands of successful professionals who
          transformed their careers.
        </p>
        <button className="explore-btn">Start Building Your Portfolio →</button>
      </motion.section>
    </div>
  );
};

export default Blogs;
