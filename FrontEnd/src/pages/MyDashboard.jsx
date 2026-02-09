import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SampleSiteImage from "../assets/DemoSitePreview.jpeg";
import { ExternalLink, Edit, Rocket, Trash2, PlusCircle } from "lucide-react";
import "../styles/MyDashboard.css";


const MyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const userName = user.name;

  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to generate professional random gradients
  const getRandomGradient = () => {
    const gradients = [
      "linear-gradient(135deg, #fce38a 0%, #f38181 100%)", // Warm peach/orange
      "linear-gradient(135deg, #FFEFBA 0%, #FFFFFF 100%)", // Citrus
      "linear-gradient(135deg, #FCCF31 0%, #F55555 100%)", // Sunny
      "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", // Soft pink/warm
      "linear-gradient(135deg, #fb8c00 0%, #ffa726 100%)", // Deep Orange
      "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)", // Cool blue-purple (contrast)
      "linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)" // Peach glow
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  // ✅ Load sites ONLY from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sites");

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Initialize with mock stats if not present
          const enhancedSites = parsed.map(site => ({
            ...site,
            views: site.views || Math.floor(Math.random() * 1000) + 50,
            clicks: site.clicks || Math.floor(Math.random() * 200) + 10,
            lastActive: site.lastActive || "2 hours ago",
            gradient: site.gradient || getRandomGradient() // Assign persistent gradient
          }));
          setSites(enhancedSites);
          return;
        }
      }

      // If nothing stored or not an array → keep empty list
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
      // Remove from state
      const updatedSites = sites.filter(site => site.id !== siteId);
      setSites(updatedSites);

      // Update localStorage
      localStorage.setItem('sites', JSON.stringify(updatedSites));

      console.log(`✅ Site "${siteName}" deleted successfully`);
    }
  };

  // Mock Data for Dashboard Stats
  const totalViews = sites.reduce((sum, site) => sum + (site.views || 0), 0);
  const totalProjects = sites.length;
  const activeDeployments = sites.filter(s => s.status === 'Deployed').length;

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

        {/* Morphic Stats Cards */}
        <section className="stats-section">
          <div className="stat-card">
            <h3>Total Portfolios</h3>
            <p className="stat-number">{totalProjects}</p>
            <span className="stat-trend">↗ +2 this week</span>
          </div>
          <div className="stat-card">
            <h3>Total Views</h3>
            <p className="stat-number">{totalViews.toLocaleString()}</p>
            <span className="stat-trend">↗ +12% increase</span>
          </div>
          <div className="stat-card">
            <h3>Active Deployments</h3>
            <p className="stat-number">{activeDeployments}</p>
            <span className="stat-trend">Verifying...</span>
          </div>
        </section>

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
            <p>No portfolios found. Start building your digital presence today!</p>
            <Link to="/generate-website" className="create-link">Create Your First Site</Link>
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

          {/* Feature Updates */}
          <div className="info-card features-card">
            <h4 className="info-heading">🚀 What's New & Upcoming</h4>
            <ul className="features-list">
              <li>✨ <strong>New:</strong> AI Content Enhancer (Beta)</li>
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
