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
                {/* Animated Success Icon */}
                <motion.div className="success-icon-wrapper" variants={itemVariants}>
                    <motion.div
                        className="success-icon"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.3 }}
                    >
                        <i className="bx bx-check"></i>
                    </motion.div>
                    <div className="success-ring"></div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1 className="success-title" variants={itemVariants}>
                    <span className="gradient-text">Portfolio Live!</span>
                </motion.h1>
                <motion.p className="success-subtitle" variants={itemVariants}>
                    Your digital presence has been successfully launched.
                </motion.p>

                {/* Main Card with QR Code and URL */}
                <motion.div className="deployment-card glass-panel" variants={itemVariants}>
                    <div className="qr-section">
                        <div className="qr-code-scan-container">
                            <div className="qr-code-wrapper">
                                <QRCodeSVG
                                    value={deploymentUrl}
                                    size={160}
                                    level="H"
                                    includeMargin={true}
                                    bgColor="#ffffff"
                                    fgColor="#2d3748"
                                />
                            </div>
                            <motion.div
                                className="scan-line"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                        <p className="qr-label">
                            <i className="bx bx-scan"></i> Scan to Preview
                        </p>
                    </div>

                    <div className="url-section">
                        <h3>Your Live URL</h3>
                        <div className="url-display-wrapper">
                            <div className="url-display">
                                <input
                                    type="text"
                                    readOnly
                                    value={deploymentUrl}
                                    className="url-input"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={copyToClipboard}
                                    className={`copy-btn ${copied ? 'copied' : ''}`}
                                    title="Copy URL"
                                >
                                    <i className={`bx ${copied ? 'bx-check' : 'bx-copy'}`}></i>
                                </motion.button>
                            </div>
                        </div>
                        <div className="primary-actions">
                            <motion.a
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                href={deploymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-glow"
                            >
                                <i className="bx bx-rocket"></i> Launch Website
                            </motion.a>
                            {repoUrl && (
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <i className="bx bxl-github"></i> Source Code
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Info Grid */}
                <motion.div className="info-grid" variants={containerVariants}>
                    {[
                        { icon: 'bxl-github', title: 'GitHub Hosted', desc: 'Secure Version Control' },
                        { icon: 'bx-cloud-lightning', title: 'Vercel Deployed', desc: 'Global CDN Speed' },
                        { icon: 'bx-devices', title: 'Responsive', desc: 'Mobile Optimized' },
                        { icon: 'bx-lock-alt', title: 'SSL Secure', desc: 'HTTPS Encryption' }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="info-card glass-panel-sm"
                            variants={itemVariants}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="info-icon">
                                <i className={`bx ${item.icon}`}></i>
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Share Section */}
                <motion.div className="share-section glass-panel" variants={itemVariants}>
                    <h3>Share Your Achievement</h3>
                    <div className="share-buttons">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareToLinkedIn}
                            className="share-btn linkedin"
                        >
                            <i className="bx bxl-linkedin"></i> LinkedIn
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={shareToTwitter}
                            className="share-btn twitter"
                        >
                            <i className="bx bxl-twitter"></i> Twitter
                        </motion.button>
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div className="bottom-actions" variants={itemVariants}>
                    <button
                        onClick={() => navigate('/generate')}
                        className="btn btn-outline"
                    >
                        <i className="bx bx-plus-circle"></i> New Project
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary"
                    >
                        <i className="bx bxs-dashboard"></i> Dashboard
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default SuccessPage;
