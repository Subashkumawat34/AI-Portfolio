import React, { useState, useEffect } from "react";
import { handleError, handleSuccess } from "./utils";
import "../styles/AccountSettings.css";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const AccountSettings = ({ onProfileUpdate }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);

    // User Data State
    const [user, setUser] = useState({
        name: "",
        email: "",
        bio: "",
        title: "",
        profileImage: "",
        socialLinks: {
            github: "",
            linkedin: "",
            twitter: "",
            website: ""
        }
    });

    // Password Change State
    const [passwords, setPasswords] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${API_BASE}/auth/me`, {
                    headers: { Authorization: token }
                });
                const result = await response.json();

                if (result.success) {
                    const userData = result.user;
                    setUser({
                        ...userData,
                        bio: userData.bio || "",
                        title: userData.title || "",
                        profileImage: userData.profileImage || "",
                        socialLinks: {
                            github: userData.socialLinks?.github || "",
                            linkedin: userData.socialLinks?.linkedin || "",
                            twitter: userData.socialLinks?.twitter || "",
                            website: userData.socialLinks?.website || "",
                        }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                // Fallback to localStorage if API fails
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    const userData = JSON.parse(userStr);
                    setUser({
                        ...userData,
                        bio: userData.bio || "",
                        title: userData.title || "",
                        profileImage: userData.profileImage || "",
                        socialLinks: {
                            github: userData.socialLinks?.github || "",
                            linkedin: userData.socialLinks?.linkedin || "",
                            twitter: userData.socialLinks?.twitter || "",
                            website: userData.socialLinks?.website || "",
                        }
                    });
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!user.name) {
            setIsLoading(false);
            return handleError("Name cannot be empty");
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/auth/update-profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess("Profile updated successfully");
                // Notify parent component to update global state
                if (onProfileUpdate) {
                    onProfileUpdate(result.user);
                }
                setUser(result.user);
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const { oldPassword, newPassword, confirmPassword } = passwords;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return handleError("All password fields are required");
        }
        if (newPassword !== confirmPassword) {
            return handleError("New passwords do not match");
        }
        if (newPassword.length < 6) {
            return handleError("Password must be at least 6 characters");
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/auth/change-password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ oldPassword, newPassword })
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess("Password changed successfully");
                setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE}/auth/delete-account`, {
                method: "DELETE",
                headers: {
                    "Authorization": token
                }
            });

            const result = await response.json();
            if (result.success) {
                handleSuccess("Account deleted successfully");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            } else {
                handleError(result.message);
            }
        } catch (err) {
            handleError(err.message);
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="settings-tab-content fade-in">
                        <h3 className="tab-title">Profile Information</h3>
                        <p className="tab-subtitle">Update your personal details and how others see you.</p>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input type="text" className="form-control" name="name" value={user.name} onChange={handleInputChange} placeholder="Your Full Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Job Title</label>
                                    <input type="text" className="form-control" name="title" value={user.title} onChange={handleInputChange} placeholder="e.g. Senior Developer" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control disabled-input" value={user.email} disabled />
                                <small className="text-muted">Contact support to change email.</small>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Bio</label>
                                <textarea className="form-control" name="bio" rows="4" value={user.bio} onChange={handleInputChange} placeholder="Tell us a little about yourself..."></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Profile Image URL</label>
                                <input type="text" className="form-control" name="profileImage" value={user.profileImage} onChange={handleInputChange} placeholder="https://example.com/avatar.jpg" />
                            </div>

                            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </form>
                    </div>
                );
            case "socials":
                return (
                    <div className="settings-tab-content fade-in">
                        <h3 className="tab-title">Social Links</h3>
                        <p className="tab-subtitle">Connect your social profiles to build your network.</p>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="mb-3">
                                <label className="form-label"><i className="bi bi-github me-2"></i>GitHub URL</label>
                                <input type="text" className="form-control" name="github" value={user.socialLinks.github} onChange={handleSocialChange} placeholder="https://github.com/username" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><i className="bi bi-linkedin me-2"></i>LinkedIn URL</label>
                                <input type="text" className="form-control" name="linkedin" value={user.socialLinks.linkedin} onChange={handleSocialChange} placeholder="https://linkedin.com/in/username" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><i className="bi bi-twitter me-2"></i>Twitter URL</label>
                                <input type="text" className="form-control" name="twitter" value={user.socialLinks.twitter} onChange={handleSocialChange} placeholder="https://twitter.com/username" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label"><i className="bi bi-globe me-2"></i>Portfolio Website</label>
                                <input type="text" className="form-control" name="website" value={user.socialLinks.website} onChange={handleSocialChange} placeholder="https://yourportfolio.com" />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg" disabled={isLoading}>
                                {isLoading ? "Saving..." : "Save Socials"}
                            </button>
                        </form>
                    </div>
                );
            case "security":
                return (
                    <div className="settings-tab-content fade-in">
                        <h3 className="tab-title">Security</h3>
                        <p className="tab-subtitle">Manage your password and account security.</p>

                        <form onSubmit={handleChangePassword}>
                            <div className="mb-3">
                                <label className="form-label">Current Password</label>
                                <input type="password" class="form-control" value={passwords.oldPassword} onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">New Password</label>
                                <input type="password" class="form-control" value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} />
                            </div>
                            <div className="mb-4">
                                <label className="form-label">Confirm New Password</label>
                                <input type="password" class="form-control" value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg">Update Password</button>
                        </form>
                    </div>
                );
            case "danger":
                return (
                    <div className="settings-tab-content fade-in">
                        <h3 className="tab-title text-danger">Danger Zone</h3>
                        <p className="tab-subtitle">Permantently remove your account and all data.</p>

                        <div className="danger-zone-card">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Delete Account</h5>
                                    <p className="text-muted mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                                </div>
                                <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="container-fluid account-settings-page">
            <div className="container mt-5 pt-4">
                <div className="row settings-layout">
                    {/* Sidebar */}
                    <div className="col-lg-3 mb-4">
                        <div className="settings-sidebar">
                            <div className="user-mini-profile text-center mb-4">
                                <div className="avatar-circle mb-3">
                                    {user.profileImage ? <img src={user.profileImage} alt="Profile" /> : user.name.charAt(0).toUpperCase()}
                                </div>
                                <h5 className="mb-1">{user.name}</h5>
                                <p className="text-muted small">{user.title || "User"}</p>
                            </div>

                            <div className="nav flex-column nav-pills" role="tablist">
                                <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                                    <i className="bi bi-person-circle me-2"></i> Profile
                                </button>
                                <button className={`nav-link ${activeTab === 'socials' ? 'active' : ''}`} onClick={() => setActiveTab('socials')}>
                                    <i className="bi bi-share me-2"></i> Social Links
                                </button>
                                <button className={`nav-link ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                                    <i className="bi bi-shield-lock me-2"></i> Security
                                </button>
                                <button className={`nav-link text-danger ${activeTab === 'danger' ? 'active' : ''}`} onClick={() => setActiveTab('danger')}>
                                    <i className="bi bi-exclamation-triangle me-2"></i> Danger Zone
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="col-lg-9">
                        <div className="settings-content-wrapper glass-panel">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
