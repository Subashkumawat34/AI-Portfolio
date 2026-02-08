import { useState, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./styles/App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import About from "./pages/About";
import Tutorials from "./pages/resources/tutorials";
import Blogs from "./pages/resources/blogs";
import HowItWorks from "./pages/HowItWorks";
import MyDashboard from "./pages/MyDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./pages/Footer";
import GenerateWebsite from "./pages/GenerateWebsite";
import AIContentGeneration from "./pages/features/AIContentGeneration";
import OneClickDeploy from "./pages/features/OneClickDeploy";

const Dashboard = () => (
  <div className="container mt-3">
    <h2>User Dashboard</h2>
    <p>Welcome to your dashboard!</p>
  </div>
);
const FeaturesAICotent = () => (
  <div className="container mt-3">
    <h2>AI Content Generation</h2>
    <p>Learn about our AI features...</p>
  </div>
);
const FeaturesDeployment = () => (
  <div className="container mt-3">
    <h2>One-Click Deploy</h2>
    <p>Deploy your sites easily...</p>
  </div>
);
const AccountSettings = () => (
  <div className="container mt-3">
    <h2>Account Settings</h2>
    <p>Manage your account details here.</p>
  </div>
);
const CreateSite = () => (
  <div className="container mt-3">
    <h2>Create New Site</h2>
    <p>Start building your new website.</p>
  </div>
);

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userName: "",
    token: null,
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user?.name) {
      setAuthState({
        isAuthenticated: true,
        userName: user.name,
        token: token,
      });
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setAuthState({
        isAuthenticated: false,
        userName: "",
        token: null,
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({
      isAuthenticated: false,
      userName: "",
      token: null,
    });
    navigate("/home");
  };

  const completeLogin = (name, token) => {
    const userObj = { name };
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));
    setAuthState({
      isAuthenticated: true,
      userName: name,
      token: token,
    });
    navigate("/dashboard");
  };

  return (
    <>
      <Navbar
        isAuthenticated={authState.isAuthenticated}
        userName={authState.userName}
        onLogout={handleLogout}
      />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route
            path="/home"
            element={
              <Home
                isAuthenticated={authState.isAuthenticated}
                userName={authState.userName}
              />
            }
          />
          <Route
            path="/login"
            element={
              authState.isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onLoginSuccess={completeLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              authState.isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
                <MyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Generate-website"
            element={
              <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
                <GenerateWebsite />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute isAuthenticated={authState.isAuthenticated}>
                <AccountSettings />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route
            path="/features/ai-content"
            element={<AIContentGeneration />}
          />
          <Route path="/features/deployment" element={<OneClickDeploy />} />
          <Route
            path="*"
            element={
              <div className="container mt-3">
                <h2>404 - Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
              </div>
            }
          />
          <Route path="/resources/tutorials" element={<Tutorials />} />
          <Route path="/resources/blogs" element={<Blogs />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
