import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/SuccessPage.css';
import ParticleBackground from '../components/ParticleBackground';

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    const { deploymentUrl, repoUrl } = location.state || {};

    useEffect(() => {
        // Hide confetti after animation
        const timer = setTimeout(() => setShowConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    // Redirect if no deployment data
    useEffect(() => {
        if (!deploymentUrl) {
            navigate('/generate');
        }
    }, [deploymentUrl, navigate]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(deploymentUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareToLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(deploymentUrl)}`;
        window.open(url, '_blank');
    };

    const shareToTwitter = () => {
        const text = `Just launched my new portfolio! Check it out 🚀`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(deploymentUrl)}`;
        window.open(url, '_blank');
    };

    if (!deploymentUrl) return null;

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 60, damping: 12 }
        }
    };

    return (
        <div className="success-page">
            <ParticleBackground />

            {showConfetti && <div className="confetti-container"></div>}

            <motion.div
                className="success-content"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header Section */}
                <div className="success-header">
                    <motion.div className="success-icon-container" variants={itemVariants}>
                        <div className="glow-effect"></div>
                        <i className="bi bi-check2-all success-main-icon"></i>
                    </motion.div>

                    <motion.div className="title-group" variants={itemVariants}>
                        <h1 className="success-title">
                            <span className="premium-gradient-text">Portfolio Published!</span>
                        </h1>
                        <p className="success-subtitle">
                            Your dream portfolio is now live and ready to impress.
                        </p>
                    </motion.div>
                </div>

                {/* Main Premium Card */}
                <motion.div className="premium-morphic-card" variants={itemVariants}>
                    <div className="card-top">
                        <div className="qr-container">
                            <div className="qr-box">
                                <QRCodeSVG
                                    value={deploymentUrl}
                                    size={140}
                                    level="H"
                                    includeMargin={false}
                                    bgColor="transparent"
                                    fgColor="#ffffff"
                                />
                                <motion.div
                                    className="scanner-line-enhanced"
                                    animate={{ top: ['2%', '98%', '2%'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </div>
                            <span className="qr-hint">Scan to preview</span>
                        </div>

                        <div className="url-container">
                            <h3 className="status-label">Live Deployment Link</h3>
                            <div className="url-status-bar">
                                <div className="url-icon"><i className="bi bi-link-45deg"></i></div>
                                <input
                                    type="text"
                                    readOnly
                                    value={deploymentUrl}
                                    className="url-text-field"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyToClipboard}
                                    className={`premium-copy-btn ${copied ? 'copied' : ''}`}
                                >
                                    {copied ? <i className="bi bi-check-lg"></i> : <i className="bi bi-copy"></i>}
                                </motion.button>
                            </div>

                            <div className="action-button-group">
                                <motion.a
                                    whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(255, 140, 0, 0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                    href={deploymentUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="launch-btn-premium"
                                >
                                    <i className="bi bi-rocket-takeoff"></i> Launch Site
                                </motion.a>

                                {repoUrl && (
                                    <motion.a
                                        whileHover={{ y: -4, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
                                        whileTap={{ scale: 0.98 }}
                                        href={repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="github-btn-premium"
                                    >
                                        <i className="bi bi-github"></i> View Repo
                                    </motion.a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card-divider"></div>

                    {/* Features Badges */}
                    <div className="feature-badges">
                        <div className="badge-item">
                            <i className="bi bi-lightning-charge-fill"></i> Vercel
                        </div>
                        <div className="badge-item">
                            <i className="bi bi-shield-check"></i> SSL
                        </div>
                        <div className="badge-item">
                            <i className="bi bi-layers-half"></i> SEO
                        </div>
                        <div className="badge-item">
                            <i className="bi bi-phone"></i> RESPONSIVE
                        </div>
                    </div>
                </motion.div>

                {/* Share Section - Minimal */}
                <motion.div className="share-minimal" variants={itemVariants}>
                    <p>Share Success:</p>
                    <div className="share-link-group">
                        <button onClick={shareToLinkedIn} className="share-icon-btn linkedin-color">
                            <i className="bi bi-linkedin"></i>
                        </button>
                        <button onClick={shareToTwitter} className="share-icon-btn x-color">
                            <i className="bi bi-twitter-x"></i>
                        </button>
                    </div>
                </motion.div>

                {/* Final Navigation */}
                <motion.div className="nav-actions-bottom" variants={itemVariants}>
                    <button onClick={() => navigate('/generate-website')} className="nav-link-btn">
                        <i className="bi bi-plus-lg"></i> Build Another
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="nav-primary-btn">
                        Go to Dashboard <i className="bi bi-arrow-right"></i>
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
