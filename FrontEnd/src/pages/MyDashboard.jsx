import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SampleSiteImage from "../assets/DemoSitePreview.jpeg";
import {
  ExternalLink, Edit, Rocket, Trash2, PlusCircle, Upload,
  Layout, TrendingUp, Award, Lightbulb, Target, Zap,
  CheckCircle, BarChart3
} from "lucide-react";
import "../styles/MyDashboard.css";


const MyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const userName = user.name;

  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to generate professional random gradients
  const getRandomGradient = () => {
    const gradients = [
      "linear-gradient(135deg, #fce38a 0%, #f38181 100%)",
      "linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 100%)",
      "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
      "linear-gradient(135deg, #fb8c00 0%, #ffa726 100%)",
      "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
      "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)"
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  // Load sites from localStorage
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
            lastActive: site.lastActive || "2 hours ago",
            gradient: site.gradient || getRandomGradient()
          }));
          setSites(enhancedSites);
          return;
        }
      }

      setSites([]);
    } catch (error) {
      console.error("Error loading sites from localStorage:", error);
      setSites([]);
    }
  }, []);

  const filteredSites = sites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Delete Site
  const handleDelete = (siteId, siteName) => {
    if (window.confirm(`Are you sure you want to delete "${siteName}"? This action cannot be undone.`)) {
      const updatedSites = sites.filter(site => site.id !== siteId);
      setSites(updatedSites);
      localStorage.setItem('sites', JSON.stringify(updatedSites));
      console.log(`✅ Site "${siteName}" deleted successfully`);
    }
  };

  // Calculate stats
  const totalViews = sites.reduce((sum, site) => sum + (site.views || 0), 0);
  const totalProjects = sites.length;
  const activeDeployments = sites.filter(s => s.status === 'Deployed').length;
  const avgViews = totalProjects > 0 ? Math.round(totalViews / totalProjects) : 0;

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-overlay"></div>

      <div className="dashboard-container">
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="welcome-text">Welcome back, <span className="highlight-name">{userName}</span></h1>
            <p className="sub-text">Manage your portfolios and track their performance.</p>
          </div>
          <Link to="/generate-website" className="create-btn-main">
            <PlusCircle size={20} />
            <span>Create New Site</span>
          </Link>
        </header>

        {/* Stats Section */}
        <motion.section
          className="stats-section"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div
            className="stat-card"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <h3>Total Portfolios</h3>
            <p className="stat-number">{totalProjects}</p>
            <span className="stat-trend">↗ +2 this week</span>
          </motion.div>
          <motion.div
            className="stat-card"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <h3>Total Views</h3>
            <p className="stat-number">{totalViews.toLocaleString()}</p>
            <span className="stat-trend">↗ +12% increase</span>
          </motion.div>
          <motion.div
            className="stat-card"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <h3>Active Deployments</h3>
            <p className="stat-number">{activeDeployments}</p>
            <span className="stat-trend">🚀 Live now</span>
          </motion.div>
          <motion.div
            className="stat-card"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
            }}
          >
            <h3>Avg Views/Portfolio</h3>
            <p className="stat-number">{avgViews}</p>
            <span className="stat-trend">📊 Performance</span>
          </motion.div>
        </motion.section>

        {/* Quick Actions Section */}
        <motion.section
          className="quick-actions-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="section-title">⚡ Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/generate-website" className="quick-action-card">
              <div className="action-icon upload-icon">
                <Upload size={24} />
              </div>
              <h3>Upload Resume</h3>
              <p>Let AI extract your information automatically</p>
            </Link>
            <Link to="/generate-website" className="quick-action-card">
              <div className="action-icon template-icon">
                <Layout size={24} />
              </div>
              <h3>Choose Template</h3>
              <p>Browse our collection of professional designs</p>
            </Link>
            <div className="quick-action-card disabled">
              <div className="action-icon analytics-icon">
                <BarChart3 size={24} />
              </div>
              <h3>View Analytics</h3>
              <p>Track performance (Coming Soon)</p>
            </div>
          </div>
        </motion.section>

        {/* Portfolio Tips Section */}
        <motion.section
          className="portfolio-tips-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="section-title">💡 Portfolio Best Practices</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">
                <Target size={28} />
              </div>
              <h4>Keep It Focused</h4>
              <p>Highlight your 3-5 best projects. Quality over quantity always wins with recruiters.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <Lightbulb size={28} />
              </div>
              <h4>Show Results</h4>
              <p>Include metrics and outcomes. "Increased efficiency by 40%" is more impactful than just listing features.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <Zap size={28} />
              </div>
              <h4>Regular Updates</h4>
              <p>Keep your portfolio current. Update it monthly with new projects and remove outdated work.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <Award size={28} />
              </div>
              <h4>Professional Photos</h4>
              <p>Use high-quality images and screenshots. Visual presentation matters significantly.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <CheckCircle size={28} />
              </div>
              <h4>SEO Optimization</h4>
              <p>Use relevant keywords in your bio and project descriptions to improve discoverability.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">
                <TrendingUp size={28} />
              </div>
              <h4>Share Widely</h4>
              <p>Promote your portfolio on LinkedIn, GitHub, and Twitter to maximize reach and opportunities.</p>
            </div>
          </div>
        </motion.section>

        {/* Search and Filters */}
        <div className="controls-bar">
          <input
            type="text"
            placeholder="Search your portfolios..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sites Grid */}
        {filteredSites.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎨</div>
            <p>No portfolios found. Start building your digital presence today!</p>
            <Link to="/generate-website" className="create-link">Create Your First Portfolio →</Link>
          </div>
        ) : (
          <div className="site-grid">
            {filteredSites.map((site) => (
              <div key={site.id} className="site-card">
                <div className="site-image-container">
                  <div
                    className="site-gradient-placeholder"
                    style={{ background: site.gradient || getRandomGradient() }}
                  >
                  </div>
                  <div className="site-badge">{site.status}</div>
                </div>

                <div className="site-details">
                  <div className="site-info">
                    <h3 className="site-title">{site.name}</h3>
                    <div className="site-meta-row">
                      <span className="site-date">📅 {site.createdAt}</span>
                      <span className="site-active">🕒 {site.lastActive}</span>
                    </div>

                    <div className="site-mini-stats">
                      <span>👁 {site.views} views</span>
                      <span>👆 {site.clicks} clicks</span>
                    </div>
                  </div>

                  <div className="action-buttons">
                    {site.status === "Deployed" && site.link && (
                      <a
                        href={site.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-view"
                        title="View Live"
                      >
                        <ExternalLink size={16} className="btn-icon" />
                        View
                      </a>
                    )}

                    <Link to={`/edit-site/${site.id}`} className="btn btn-edit" title="Edit Site">
                      <Edit size={16} className="btn-icon" />
                      Edit
                    </Link>

                    {site.status === "Draft" && (
                      <button className="btn btn-deploy" title="Deploy Site">
                        <Rocket size={16} className="btn-icon" />
                        Deploy
                      </button>
                    )}

                    <button
                      className="btn btn-delete"
                      title="Delete Site"
                      onClick={() => handleDelete(site.id, site.name)}
                    >
                      <Trash2 size={16} className="btn-icon" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Grid */}
        <div className="dashboard-bottom-grid">
          {/* Recent Activity */}
          <div className="info-card activity-card">
            <h4 className="info-heading">📝 Recent Activity</h4>
            <ul className="activity-list">
              <li className="activity-item">
                <span className="activity-icon">🚀</span>
                <div className="activity-details">
                  <p className="activity-text">Deployment Successful</p>
                  <p className="activity-time">2 hours ago</p>
                </div>
              </li>
              <li className="activity-item">
                <span className="activity-icon">✏️</span>
                <div className="activity-details">
                  <p className="activity-text">Updates to "Personal Portfolio"</p>
                  <p className="activity-time">5 hours ago</p>
                </div>
              </li>
              <li className="activity-item">
                <span className="activity-icon">✨</span>
                <div className="activity-details">
                  <p className="activity-text">New Template "Modern Dark" Added</p>
                  <p className="activity-time">1 day ago</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Success Story */}
          <div className="info-card success-card">
            <h4 className="info-heading">🌟 Success Story</h4>
            <div className="success-content">
              <p className="success-quote">"I landed my dream job at Google just 2 weeks after creating my portfolio with ProFolio.AI!"</p>
              <p className="success-author">- Jessica M., Software Engineer</p>
              <div className="success-stats">
                <div className="success-stat">
                  <span className="success-number">3.5k</span>
                  <span className="success-label">Views</span>
                </div>
                <div className="success-stat">
                  <span className="success-number">47</span>
                  <span className="success-label">Interview Calls</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Updates */}
          <div className="info-card features-card">
            <h4 className="info-heading">🚀 What's New & Upcoming</h4>
            <ul className="features-list">
              <li><strong>New:</strong> AI Content Enhancer (Beta)</li>
              <li>📊 Real-time analytics dashboard coming soon</li>
              <li>🌐 Custom domain integration</li>
              <li>📥 One-click backup download</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyDashboard;
