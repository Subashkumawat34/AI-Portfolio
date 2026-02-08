import { useState } from "react";
import axios from "axios";
import "../styles/GenerateWebsite.css";

// Import all template images
import Template1 from "../assets/Template1.png";
import Template2 from "../assets/Template2.png";
import Template3 from "../assets/Template3.png";
import Template4 from "../assets/Template4.png";
import Template5 from "../assets/Template5.png";
import Template6 from "../assets/Template6.png";

const templates = [
  {
    id: 1,
    name: "Creative Start",
    type: "free",
    previewImage: Template1,
    tagline: "Showcase Your Talent with Style",
  },
  {
    id: 2,
    name: "Profolio Modern",
    type: "paid",
    previewImage: Template2,
    tagline: "Sleek Portfolio, Built for Impact",
  },
  {
    id: 3,
    name: "Classic Showcase",
    type: "free",
    previewImage: Template3,
    tagline: "Timeless Design, Professional Presentation",
  },
  {
    id: 4,
    name: "Portfolio Elite",
    type: "paid",
    previewImage: Template4,
    tagline: "Feature-Rich Portal for Top Creators",
  },
  {
    id: 5,
    name: "Vivid Portfolio",
    type: "free",
    previewImage: Template5,
    tagline: "Colorful Layout for Creative Profiles",
  },
  {
    id: 6,
    name: "Tech Profolio",
    type: "paid",
    previewImage: Template6,
    tagline: "Advanced Tools for Tech Portfolios",
  },
];

const initialPortfolioFormFields = {
  personalInfo: {
    fullName: "",
    nickname: "",
    location: "",
    phone: "",
    email: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
    profileImage: "",
    resumeLink: "",
    socialLinks: [],
  },
  summary: {
    introduction: "",
    tagline: "",
    highlights: [],
  },
  education: [
    {
      degree: "",
      institution: "",
      yearStart: "",
      yearEnd: "",
      score: "",
      details: "",
    },
  ],
  workExperience: [
    {
      position: "",
      organization: "",
      duration: "",
      description: "",
      bulletPoints: [],
    },
  ],
  projects: [
    {
      title: "",
      image: "",
      description: "",
      skills: [],
      repo: "",
      demo: "",
    },
  ],
  technologies: [
    {
      name: "",
      image: "",
    },
  ],
  contactInfo: {
    email: "",
    phone: "",
    address: "",
    formFields: [
      { label: "Full Name", type: "text", required: true, name: "fullName" },
      { label: "Email", type: "email", required: true, name: "email" },
      { label: "Phone Number", type: "text", required: true, name: "phone" },
      { label: "Subject", type: "text", required: true, name: "subject" },
      { label: "Message", type: "textarea", required: true, name: "message" },
    ],
  },
};

const GenerateWebsite = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState(initialPortfolioFormFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // ✅ Handle Resume Upload (with correct auto-fill)
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("resume", file);

    setUploading(true);
    setUploadMessage("Extracting information from resume...");

    try {
      const response = await axios.post(
        "http://localhost:8080/extract-resume",
        formDataUpload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const extractedData = response.data;

      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          ...(extractedData.personalInfo || {}),
        },
        summary: {
          ...prev.summary,
          ...(extractedData.summary || {}),
        },
        education: Array.isArray(extractedData.education)
          ? extractedData.education
          : prev.education,
        workExperience: Array.isArray(extractedData.experience)
          ? extractedData.experience.map((exp) => ({
              position: exp.title || "",
              organization: exp.organization || "",
              duration: exp.duration || "",
              description: exp.description || "",
              bulletPoints: [],
            }))
          : prev.workExperience,
        projects: Array.isArray(extractedData.projects)
          ? extractedData.projects
          : prev.projects,
        technologies: Array.isArray(extractedData.skills?.languages)
          ? extractedData.skills.languages.map((lang) => ({
              name: lang,
              image: "",
            }))
          : prev.technologies,
        contactInfo: {
          ...prev.contactInfo,
          email: extractedData.personalInfo?.email || prev.contactInfo.email,
          phone: extractedData.personalInfo?.phone || prev.contactInfo.phone,
          address:
            extractedData.personalInfo?.location || prev.contactInfo.address,
        },
      }));

      setUploadMessage("Resume data extracted successfully!");
    } catch (error) {
      console.error("Resume upload error:", error);
      setUploadMessage("Failed to extract data. Please fill manually.");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleArrayInputChange = (e, section, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    }));
  };

  // ✅ UPDATED: Save deployed site to localStorage + show link
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8080/generator/generate-and-deploy",
        {
          template: selectedTemplate.id,
          data: formData,
        }
      );

      if (response.data.success) {
        const deployedUrl = response.data.deploymentUrl;

        // 1️⃣ Create new site entry
        const newSite = {
          id: Date.now(),
          name: formData.personalInfo?.fullName?.trim()
            ? `${formData.personalInfo.fullName}'s Portfolio`
            : `Portfolio Site ${new Date().toLocaleDateString()}`,
          createdAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
          status: "Deployed",
          link: deployedUrl,
        };

        // 2️⃣ Read existing sites from localStorage
        let existingSites = [];
        try {
          const stored = localStorage.getItem("sites");
          if (stored) {
            existingSites = JSON.parse(stored);
            if (!Array.isArray(existingSites)) {
              existingSites = [];
            }
          }
        } catch (err) {
          console.error("Error reading sites from localStorage:", err);
          existingSites = [];
        }

        // 3️⃣ Add new site and save back
        const updatedSites = [...existingSites, newSite];
        localStorage.setItem("sites", JSON.stringify(updatedSites));

        // 4️⃣ Existing UI behavior
        setDeploymentUrl(deployedUrl);
        setSubmitSuccess(true);
      } else {
        throw new Error(response.data.message || "Deployment failed");
      }
    } catch (error) {
      console.error("❌ Error generating website:", error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetState = () => {
    setSelectedTemplate(null);
    setSubmitSuccess(false);
    setFormData(initialPortfolioFormFields);
    setDeploymentUrl("");
    setSubmitError("");
  };

  const renderFormField = (sectionKey, fieldKey, fieldValue) => {
    const label = fieldKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    const isTextArea = [
      "history",
      "mission",
      "vision",
      "process",
      "eligibility",
    ].includes(fieldKey);

    if (Array.isArray(fieldValue)) {
      return (
        <div className="form-group" key={fieldKey}>
          <label htmlFor={`${sectionKey}-${fieldKey}`}>{label}</label>
          <input
            type="text"
            id={`${sectionKey}-${fieldKey}`}
            name={fieldKey}
            value={formData[sectionKey][fieldKey]?.join(", ")}
            onChange={(e) => handleArrayInputChange(e, sectionKey, fieldKey)}
            placeholder="Enter values, separated by commas"
          />
        </div>
      );
    }

    return (
      <div className="form-group" key={fieldKey}>
        <label htmlFor={`${sectionKey}-${fieldKey}`}>{label}</label>
        {isTextArea ? (
          <textarea
            id={`${sectionKey}-${fieldKey}`}
            name={fieldKey}
            value={fieldValue}
            onChange={(e) => handleInputChange(e, sectionKey)}
            rows="4"
          />
        ) : (
          <input
            type="text"
            id={`${sectionKey}-${fieldKey}`}
            name={fieldKey}
            value={fieldValue}
            onChange={(e) => handleInputChange(e, sectionKey)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="generate-website-container">
      {!selectedTemplate ? (
        <>
          <h1 className="main-title">Select a Website Template</h1>
          <div className="template-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => setSelectedTemplate(template)}
              >
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="template-image"
                />
                <div className="template-info">
                  <h3>{template.name}</h3>
                  <p>{template.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : submitSuccess ? (
        <div className="success-message-container">
          <h2>Website Deployed Successfully!</h2>
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="deployment-link"
          >
            {deploymentUrl}
          </a>
          <button className="btn btn-primary" onClick={resetState}>
            Create Another Website
          </button>
        </div>
      ) : (
        <div className="website-form-container">
          <form onSubmit={handleSubmit} className="website-form">
            <div className="upload-section">
              <h3>Upload Resume (Auto-Fill)</h3>
              <input
                type="file"
                accept=".pdf"
                onChange={handleResumeUpload}
                disabled={uploading}
              />
              {uploading && (
                <p className="uploading-text">Uploading and Extracting...</p>
              )}
              {uploadMessage && (
                <p className="upload-message">{uploadMessage}</p>
              )}
            </div>

            {Object.entries(formData).map(([sectionKey, sectionFields]) => (
              <fieldset className="form-section" key={sectionKey}>
                <legend>
                  {sectionKey
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </legend>
                {Object.entries(sectionFields).map(([fieldKey, fieldValue]) =>
                  renderFormField(sectionKey, fieldKey, fieldValue)
                )}
              </fieldset>
            ))}

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setSelectedTemplate(null)}
              >
                Back
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deploying..." : "Generate Website"}
              </button>
            </div>

            {submitError && (
              <p className="error-message">Error: {submitError}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default GenerateWebsite;
