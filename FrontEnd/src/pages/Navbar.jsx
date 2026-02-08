import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isAuthenticated = false, userName = "User", onLogout }) => {
  const navigate = useNavigate();
  const handleLinkNavigation = (path, e) => {
    if (e) e.preventDefault();
    navigate(path);
  };

  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
      <div className="container-fluid navbar-container-custom">
        <Link className="navbar-brand zapier-logo-link" to="/">
          <div className="logo-bar"></div>
          <span className="logo-text">ProFolio.AI</span>
        </Link>
        <button  
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 left-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    My Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/generate-website">
                    Generate Website
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="featuresDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Features
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="featuresDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/features/ai-content">
                      AI Content Generation
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/features/deployment">
                      One-Click Deploy
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">
                How It Works
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="featuresDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="featuresDropdown">
                <li>
                  <Link className="dropdown-item" to="/resources/tutorials">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/resources/blogs">
                    Blogs
                  </Link>
                </li>
              </ul>
            </li>

            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/About">
                    About
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/generate-website">
                    Upload Resume
                  </Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center right-nav">
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="userAccountDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="User menu"
                >
                  <i className="bi bi-person-circle fs-4 me-1"></i>{" "}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userAccountDropdown"
                >
                  <li>
                    <span className="dropdown-item-text">Hi, {userName}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account">
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogoutClick}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log in
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/signup" className="btn btn-signup">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
