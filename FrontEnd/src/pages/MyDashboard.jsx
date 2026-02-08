import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SampleSiteImage from "../assets/DemoSitePreview.jpeg";
import CreateIcon from "../assets/CreateIcon.png";
import EditIcon from "../assets/EditIcon.png";
import DeleteIcon from "../assets/DeleteIcon.png";
import DeployIcon from "../assets/DeployIcon.png";
import ViewIcon from "../assets/ViewIcon.jpeg";
import "../styles/MyDashboard.css";

const MyDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const userName = user.name;

  const [sites, setSites] = useState([]);

  // ✅ Load sites ONLY from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sites");

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSites(parsed);
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

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-heading">Welcome, {userName}</h2>

      <div className="create-btn-container">
        <Link to="/generate-website" className="create-btn">
          <img src={CreateIcon} alt="Create" className="icon-sm" />
          Create New Site
        </Link>
      </div>

      {sites.length === 0 ? (
        <p className="no-sites-text">
          No sites found. Generate your first website to see it here.
        </p>
      ) : (
        <div className="site-grid">
          {sites.map((site) => (
            <div key={site.id} className="site-card">
              <img
                src={SampleSiteImage}
                alt={site.name}
                className="site-image"
              />

              <div className="site-details">
                <div>
                  <h3 className="site-title">{site.name}</h3>
                  <p className="site-meta">Created on: {site.createdAt}</p>
                  <p className="site-meta">
                    Status: <span className="site-status">{site.status}</span>
                  </p>
                </div>

                <div className="action-buttons">
                  {site.status === "Deployed" && site.link && (
                    <a
                      href={site.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-view"
                    >
                      <img src={ViewIcon} alt="View" className="icon-sm" />
                      View
                    </a>
                  )}

                  <Link to={`/edit-site/${site.id}`} className="btn btn-edit">
                    <img src={EditIcon} alt="Edit" className="icon-sm" />
                    Edit
                  </Link>

                  {site.status === "Draft" && (
                    <button className="btn btn-deploy">
                      <img src={DeployIcon} alt="Deploy" className="icon-sm" />
                      Deploy
                    </button>
                  )}

                  <button className="btn btn-delete">
                    <img src={DeleteIcon} alt="Delete" className="icon-sm" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="features-card">
        <h4 className="features-heading">Upcoming Features:</h4>
        <ul className="features-list">
          <li>Real-time analytics for each site</li>
          <li>Custom domain management</li>
          <li>Downloadable backups and restore options</li>
          <li>Email and contact form integrations</li>
        </ul>
      </div>
    </div>
  );
};

export default MyDashboard;
