import { useState } from "react";
import "../styles/SuccessPage.css";

const SuccessPage = ({ deploymentUrl, siteName, onCreateAnother, onGoToDashboard }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(deploymentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleOpenSite = () => {
        window.open(deploymentUrl, "_blank", "noopener,noreferrer");
    };

    // Generate QR code URL using a free QR code API
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        deploymentUrl
    )}`;

    return (
        <div className="success-page-overlay">
            {/* Confetti Animation */}
            <div className="confetti-container">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            backgroundColor: [
                                "#4a90e2",
                                "#50c878",
                                "#ff6b6b",
                                "#ffd93d",
                                "#a78bfa",
                            ][Math.floor(Math.random() * 5)],
                        }}
                    />
                ))}
            </div>

            <div className="success-card">
                {/* Success Icon */}
                <div className="success-icon-wrapper">
                    <div className="success-icon">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="success-title">🎉 Congratulations!</h1>
                <p className="success-subtitle">
                    Your portfolio website has been successfully deployed!
                </p>
                {siteName && <p className="site-name">{siteName}</p>}

                {/* Main Content Grid */}
                <div className="success-content-grid">
                    {/* Left: URL and Actions */}
                    <div className="url-section">
                        <label className="url-label">Your Website URL</label>
                        <div className="url-container">
                            <input
                                type="text"
                                value={deploymentUrl}
                                readOnly
                                className="url-input"
                            />
                            <button
                                className={`copy-btn ${copied ? "copied" : ""}`}
                                onClick={handleCopyLink}
                            >
                                {copied ? (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                        </svg>
                                        Copy Link
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Quick Actions */}
                        <div className="quick-actions">
                            <button className="action-btn primary" onClick={handleOpenSite}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                Open Website
                            </button>
                            <button className="action-btn secondary" onClick={onGoToDashboard}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="7" height="7" />
                                    <rect x="14" y="3" width="7" height="7" />
                                    <rect x="14" y="14" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" />
                                </svg>
                                My Dashboard
                            </button>
                        </div>
                    </div>

                    {/* Right: QR Code */}
                    <div className="qr-section">
                        <div className="qr-card">
                            <p className="qr-label">Scan to view on mobile</p>
                            <div className="qr-code-wrapper">
                                <img src={qrCodeUrl} alt="QR Code" className="qr-code" />
                            </div>
                            <p className="qr-hint">Point your camera at the QR code</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="bottom-actions">
                    <button className="create-another-btn" onClick={onCreateAnother}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                        Create Another Website
                    </button>
                </div>

                {/* Tips Section */}
                <div className="tips-section">
                    <h3 className="tips-title">💡 Next Steps</h3>
                    <ul className="tips-list">
                        <li>Share your portfolio with friends and on social media</li>
                        <li>Add your website URL to your resume and LinkedIn profile</li>
                        <li>Keep your portfolio updated with new projects and achievements</li>
                        <li>Check your dashboard to manage all your websites</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
