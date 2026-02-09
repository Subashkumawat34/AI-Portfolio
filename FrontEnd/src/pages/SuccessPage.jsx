import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import '../styles/SuccessPage.css';

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [showConfetti, setShowConfetti] = useState(true);

    const { deploymentUrl, repoUrl } = location.state || {};

    useEffect(() => {
        // Hide confetti after animation
        const timer = setTimeout(() => setShowConfetti(false), 3000);
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
        const text = `Check out my new portfolio website! ${deploymentUrl}`;
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(deploymentUrl)}`;
        window.open(url, '_blank');
    };

    const shareToTwitter = () => {
        const text = `Just launched my new portfolio! Check it out 🚀`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(deploymentUrl)}`;
        window.open(url, '_blank');
    };

    if (!deploymentUrl) return null;

    return (
        <div className="success-page">
            {showConfetti && <div className="confetti-container"></div>}

            <div className="success-content">
                {/* Animated Success Icon */}
                <div className="success-icon-wrapper">
                    <div className="success-icon">
                        <i className="bx bx-check"></i>
                    </div>
                    <div className="success-ring"></div>
                </div>

                {/* Main Heading */}
                <h1 className="success-title">
                    🎉 Portfolio Deployed Successfully!
                </h1>
                <p className="success-subtitle">
                    Your portfolio is now live and ready to share with the world
                </p>

                {/* Main Card with QR Code and URL */}
                <div className="deployment-card">
                    <div className="qr-section">
                        <div className="qr-code-wrapper">
                            <QRCodeSVG
                                value={deploymentUrl}
                                size={180}
                                level="H"
                                includeMargin={true}
                                bgColor="#ffffff"
                                fgColor="#667eea"
                            />
                        </div>
                        <p className="qr-label">
                            <i className="bx bx-mobile"></i> Scan with mobile
                        </p>
                    </div>

                    <div className="url-section">
                        <h3>Your Live Website</h3>
                        <div className="url-display-wrapper">
                            <div className="url-display">
                                <input
                                    type="text"
                                    readOnly
                                    value={deploymentUrl}
                                    className="url-input"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className={`copy-btn ${copied ? 'copied' : ''}`}
                                    title="Copy URL"
                                >
                                    <i className={`bx ${copied ? 'bx-check' : 'bx-copy'}`}></i>
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="primary-actions">
                            <a
                                href={deploymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary"
                            >
                                <i className="bx bx-link-external"></i> View Website
                            </a>
                            {repoUrl && (
                                <a
                                    href={repoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-secondary"
                                >
                                    <i className="bx bxl-github"></i> View Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="info-grid">
                    <div className="info-card">
                        <div className="info-icon">
                            <i className="bx bxl-github"></i>
                        </div>
                        <h4>GitHub Hosted</h4>
                        <p>Source code stored safely</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="bx bx-rocket"></i>
                        </div>
                        <h4>Vercel Deployed</h4>
                        <p>Lightning-fast CDN</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="bx bx-mobile"></i>
                        </div>
                        <h4>Mobile Optimized</h4>
                        <p>Fully responsive design</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">
                            <i className="bx bx-shield-alt-2"></i>
                        </div>
                        <h4>HTTPS Secure</h4>
                        <p>SSL certificate included</p>
                    </div>
                </div>

                {/* Share Section */}
                <div className="share-section">
                    <h3>Share Your Portfolio</h3>
                    <div className="share-buttons">
                        <button onClick={shareToLinkedIn} className="share-btn linkedin">
                            <i className="bx bxl-linkedin"></i> LinkedIn
                        </button>
                        <button onClick={shareToTwitter} className="share-btn twitter">
                            <i className="bx bxl-twitter"></i> Twitter
                        </button>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="next-steps">
                    <h3>What's Next?</h3>
                    <div className="steps-grid">
                        <div className="step-item">
                            <span className="step-number">1</span>
                            <p>Share your portfolio on social media</p>
                        </div>
                        <div className="step-item">
                            <span className="step-number">2</span>
                            <p>Add it to your resume and job applications</p>
                        </div>
                        <div className="step-item">
                            <span className="step-number">3</span>
                            <p>Connect a custom domain in Vercel (optional)</p>
                        </div>
                        <div className="step-item">
                            <span className="step-number">4</span>
                            <p>Update content anytime by regenerating</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bottom-actions">
                    <button
                        onClick={() => navigate('/generate')}
                        className="btn btn-outline"
                    >
                        <i className="bx bx-plus"></i> Create Another
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-primary"
                    >
                        <i className="bx bx-home"></i> Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
