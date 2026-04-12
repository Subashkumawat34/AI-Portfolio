import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink, Edit, Rocket, Trash2, PlusCircle, Upload,
  Layout, TrendingUp, Award, Lightbulb, Target, Zap,
  CheckCircle, BarChart3, Search, Calendar, Clock, Eye, MousePointer2
} from "lucide-react";
import "../styles/MyDashboard.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 120, damping: 14 } 
  }
};

const hoverEffect = {
  y: -10,
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

const MyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Creative" };
  const userName = user.name;

  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getRandomGradient = () => {
    const gradients = [
      "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // Indigo-Purple
      "linear-gradient(135deg, #f97316 0%, #facc15 100%)", // Orange-Yellow
      "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)", // Emerald-Blue
      "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)", // Rose-Orange
      "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", // Cyan-Blue
      "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)"  // Violet-Pink
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sites");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const enhancedSites = parsed.map(site => ({
            ...site,
            views: site.views || Math.floor(Math.random() * 1000) + 50,
            clicks: site.clicks || Math.floor(Math.random() * 200) + 10,
            lastActive: site.lastActive || "Just now",
            gradient: site.gradient || getRandomGradient()
          }));
          setSites(enhancedSites);
          return;
        }
      }
      setSites([]);
    } catch (error) {
      console.error("Error loading sites:", error);
      setSites([]);
    }
  }, []);

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (siteId, siteName) => {
    if (window.confirm(`Delete "${siteName}"? This action is permanent.`)) {
      const updatedSites = sites.filter(site => site.id !== siteId);
      setSites(updatedSites);
      localStorage.setItem('sites', JSON.stringify(updatedSites));
    }
  };

  const stats = [
    { label: "Active Sites", value: sites.length, trend: "↗ Healthy", icon: Layout, color: "#8b5cf6" },
    { label: "Total Views", value: sites.reduce((s, x) => s + x.views, 0).toLocaleString(), trend: "↗ Hot", icon: Eye, color: "#3b82f6" },
    { label: "Live Units", value: sites.filter(s => s.status === 'Deployed').length, trend: "🚀 Active", icon: Rocket, color: "#f97316" },
    { label: "User Clicks", value: sites.reduce((s, x) => s + x.clicks, 0).toLocaleString(), trend: "🔥 High", icon: MousePointer2, color: "#ec4899" }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay"></div>

      <motion.div 
        className="dashboard-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.header className="dashboard-header" variants={itemVariants}>
          <div className="header-content">
            <h1 className="welcome-text">
              Welcome back, <span className="highlight-name">{userName}</span>
            </h1>
            <p className="sub-text">Everything looks great today. Here's what's happening with your portfolios.</p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/generate-website" className="create-btn-main">
              <PlusCircle size={24} />
              <span>Create New Portfolio</span>
            </Link>
          </motion.div>
        </motion.header>

        {/* Stats Section */}
        <motion.section className="stats-section" variants={containerVariants}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="stat-card" 
              variants={itemVariants}
              whileHover={hoverEffect}
            >
              <div className="stat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>{stat.label}</h3>
                <stat.icon size={22} color={stat.color} style={{ opacity: 0.7 }} />
              </div>
              <p className="stat-number">{stat.value}</p>
              <span className="stat-trend" style={{ color: stat.color }}>{stat.trend}</span>
            </motion.div>
          ))}
        </motion.section>

        {/* Quick Actions */}
        <motion.section className="quick-actions-section" variants={itemVariants}>
          <h2 className="section-title"><Zap size={28} style={{ color: '#f97316' }} /> Core Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/generate-website" className="quick-action-card">
              <div className="action-icon upload-icon">
                <Upload size={32} />
              </div>
              <h3>Swift Upload</h3>
              <p>Extract your data from Resume/PDF in seconds.</p>
            </Link>
            <Link to="/generate-website" className="quick-action-card">
              <div className="action-icon template-icon">
                <Layout size={32} />
              </div>
              <h3>Template Library</h3>
              <p>Choose from our selection of premium themes.</p>
            </Link>
            <div className="quick-action-card disabled">
              <div className="action-icon analytics-icon">
                <BarChart3 size={32} />
              </div>
              <h3>AI Optimizer</h3>
              <p>Let AI suggest improvements (Coming Soon).</p>
            </div>
          </div>
        </motion.section>

        {/* Search Bar */}
        <motion.div className="controls-bar" variants={itemVariants}>
          <div className="search-wrapper">
            <Search className="search-icon" size={22} />
            <input
              type="text"
              placeholder="Search your portfolios..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Sites Grid */}
        <AnimatePresence mode="popLayout">
          {filteredSites.length === 0 ? (
            <motion.div 
              className="empty-state"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="empty-icon">🎨</div>
              <h2>Time to build something beautiful.</h2>
              <p>You haven't created any portfolios yet. Let's start now!</p>
              <Link to="/generate-website" className="create-link">Create Your First Portfolio →</Link>
            </motion.div>
          ) : (
            <motion.div className="site-grid" variants={containerVariants}>
              {filteredSites.map((site) => (
                <motion.div 
                  key={site.id} 
                  className="site-card"
                  variants={itemVariants}
                  whileHover={hoverEffect}
                  layout
                >
                  <div className="site-image-container">
                    <div
                      className="site-gradient-placeholder"
                      style={{ background: site.gradient }}
                    ></div>
                    <div className="site-badge">{site.status}</div>
                  </div>

                  <div className="site-details">
                    <h3 className="site-title">{site.name}</h3>
                    <div className="site-meta-row">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} /> {site.createdAt}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} /> {site.lastActive}
                      </span>
                    </div>
                    <div className="site-mini-stats">
                      <span>👁 {site.views} views</span>
                      <span>👆 {site.clicks} clicks</span>
                    </div>

                    <div className="action-buttons">
                      {site.status === "Deployed" && site.link && (
                        <a href={site.link} target="_blank" rel="noopener noreferrer" className="btn btn-view">
                          <ExternalLink size={18} /> View
                        </a>
                      )}
                      <Link to={`/edit-site/${site.id}`} className="btn btn-edit">
                        <Edit size={18} /> Edit
                      </Link>
                      {site.status === "Draft" && (
                        <button className="btn btn-deploy">
                          <Rocket size={18} /> Deploy
                        </button>
                      )}
                      <button className="btn btn-delete" onClick={() => handleDelete(site.id, site.name)}>
                        <Trash2 size={18} /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Section */}
        <motion.div className="dashboard-bottom-grid" variants={containerVariants}>
          <motion.div className="info-card" variants={itemVariants}>
            <h4 className="info-heading"><Clock size={24} style={{ color: '#3b82f6' }} /> Activity Log</h4>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🚀</div>
                <div className="activity-info">
                  <p className="activity-text">Successful Deployment</p>
                  <p className="activity-time">Just a moment ago</p>
                </div>
              </div>
              <div className="activity-item" style={{ borderBottom: 'none' }}>
                <div className="activity-icon">✨</div>
                <div className="activity-info">
                  <p className="activity-text">Profile AI Enhanced</p>
                  <p className="activity-time">3 hours ago</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="info-card success-card" variants={itemVariants}>
            <h4 className="info-heading"><Award size={24} style={{ color: '#f97316' }} /> Success Tips</h4>
            <div className="success-content">
              <p className="success-quote">"Professionals with updated portfolios are 3x more likely to be contacted by recruiters."</p>
              <p className="success-author">— ProFolio AI Team</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyDashboard;
