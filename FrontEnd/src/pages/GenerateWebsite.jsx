import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/GenerateWebsite.css";
import "../styles/EnhancedGenerateWebsite.css";
import AIChatbot from "../components/AIChatbot";
import DeploymentStatus from "../components/DeploymentStatus";

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
    price: 0,
    previewImage: Template1,
    tagline: "Showcase Your Talent with Style",
  },
  {
    id: 2,
    name: "Profolio Modern",
    type: "free",
    price: 0,
    previewImage: Template2,
    tagline: "Sleek Portfolio, Built for Impact",
  },
  {
    id: 3,
    name: "Classic Showcase",
    type: "paid",
    price: 399,
    previewImage: Template3,
    tagline: "Timeless Design, Professional Presentation",
  },
  {
    id: 4,
    name: "Portfolio Elite",
    type: "paid",
    price: 499,
    previewImage: Template4,
    tagline: "Feature-Rich Portal for Top Creators",
  },
  {
    id: 5,
    name: "Vivid Portfolio",
    type: "paid",
    price: 599,
    previewImage: Template5,
    tagline: "Colorful Layout for Creative Profiles",
  },
  {
    id: 6,
    name: "Tech Profolio",
    type: "paid",
    price: 699,
    previewImage: Template6,
    tagline: "Advanced Tools for Tech Portfolios",
  },
];

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

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
  skills: [
    {
      name: "React.js",
      percentage: "90",
      category: "Frontend",
    },
    {
      name: "Node.js",
      percentage: "85",
      category: "Backend",
    },
    {
      name: "Git",
      percentage: "80",
      category: "Tools",
    },
  ],
  technologies: [
    {
      name: "",
      image: "",
    },
  ],
  testimonials: [
    {
      name: "",
      position: "",
      company: "",
      quote: "",
      rating: "5",
      avatar: "",
    },
  ],
  contactInfo: {
    email: "",
    phone: "",
    address: "",
  },
};

const SECTION_CONFIG = {
  education: {
    label: "Education",
    itemTitleKey: "institution",
    itemSubtitleKey: "degree",
    fields: [
      { name: "degree", label: "Degree", placeholder: "e.g. Bachelor of Science in Computer Science" },
      { name: "institution", label: "Institution", placeholder: "e.g. Stanford University" },
      {
        row: [
          { name: "yearStart", label: "Start Year", placeholder: "e.g. 2018" },
          { name: "yearEnd", label: "End Year", placeholder: "e.g. 2022" }
        ]
      },
      { name: "score", label: "Grade/Score", placeholder: "e.g. 3.8 GPA" },
      { name: "details", label: "Details", type: "textarea", placeholder: "Brief description of your coursework, honors, etc." }
    ]
  },
  workExperience: {
    label: "Work Experience",
    itemTitleKey: "position",
    itemSubtitleKey: "organization",
    fields: [
      { name: "position", label: "Position", placeholder: "e.g. Senior Software Engineer" },
      { name: "organization", label: "Company", placeholder: "e.g. Google" },
      { name: "duration", label: "Duration", placeholder: "e.g. Jan 2020 - Present" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Describe your role and responsibilities..." },
      { name: "bulletPoints", label: "Achievements (Bullet Points)", type: "array", placeholder: "e.g. Increased performance by 20%" }
    ]
  },
  projects: {
    label: "Projects",
    itemTitleKey: "title",
    itemSubtitleKey: "description",
    fields: [
      { name: "title", label: "Project Title", placeholder: "e.g. E-Commerce Platform" },
      { name: "image", label: "Image URL", placeholder: "e.g. https://example.com/image.png" },
      { name: "description", label: "Description", type: "textarea", placeholder: "What does this project do?" },
      { name: "skills", label: "Technologies Used", type: "array", placeholder: "e.g. React, Node.js, MongoDB" },
      {
        row: [
          { name: "repo", label: "GitHub Repo", placeholder: "e.g. https://github.com/..." },
          { name: "demo", label: "Live Demo", placeholder: "e.g. https://my-project.com" }
        ]
      }
    ]
  },
  skills: {
    label: "Skills",
    itemTitleKey: "name",
    itemSubtitleKey: "category",
    fields: [
      { name: "name", label: "Skill Name", placeholder: "e.g. JavaScript" },
      {
        row: [
          { name: "percentage", label: "Proficiency (%)", placeholder: "e.g. 90" },
          { name: "category", label: "Category", placeholder: "e.g. Frontend, Backend, Tools" }
        ]
      }
    ]
  },
  technologies: {
    label: "Technologies",
    itemTitleKey: "name",
    fields: [
      { name: "name", label: "Technology Name", placeholder: "e.g. Docker" },
      { name: "image", label: "Icon URL", placeholder: "e.g. https://.../docker.png" }
    ]
  },
  testimonials: {
    label: "Testimonials",
    itemTitleKey: "name",
    itemSubtitleKey: "company",
    fields: [
      { name: "name", label: "Name", placeholder: "e.g. John Doe" },
      {
        row: [
          { name: "position", label: "Position", placeholder: "e.g. CEO" },
          { name: "company", label: "Company", placeholder: "e.g. Tech Corp" }
        ]
      },
      { name: "quote", label: "Quote", type: "textarea", placeholder: "What did they say about you?" },
      { name: "rating", label: "Rating (1-5)", placeholder: "e.g. 5" },
      { name: "avatar", label: "Avatar URL", placeholder: "e.g. https://..." }
    ]
  }
};

const GenerateWebsite = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState(initialPortfolioFormFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  // New State for Edit Mode
  const [editingSection, setEditingSection] = useState(null); // 'education', 'projects', etc.
  const [editingIndex, setEditingIndex] = useState(null); // index or 'new'
  const [tempItem, setTempItem] = useState({}); // Holds data while editing

  // Validation State
  const [validationErrors, setValidationErrors] = useState({});
  const [showValidation, setShowValidation] = useState(false);

  // Custom Fields State
  const [customFields, setCustomFields] = useState([]);

  // ... (handleResumeUpload same as before)
  const handleResumeUpload = async (e) => {
    // ... (keep existing implementation)
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append("resume", file);

    setUploading(true);
    setUploadMessage("Extracting information from resume...");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/extract-resume`,
        formDataUpload,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const extractedData = response.data.data; // Access .data.data structure

      if (!response.data.success) {
        console.error("❌ Resume Extraction Failed:", response.data.error);
        if (response.data.debugMessage) {
          console.error("🔍 Debug Info:", response.data.debugMessage);
        }
        setUploadMessage(response.data.error || "Limited extraction. Please check details.");
      } else {
        console.log("✅ Resume Extraction Successful");
        setUploadMessage("Resume data extracted successfully!");
      }


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

    } catch (error) {
      console.error("Resume upload error:", error);
      setUploadMessage("Failed to connect to server. Please fill manually.");
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

  // --- Array Item Management ---

  const startEditing = (section, index) => {
    setEditingSection(section);
    setEditingIndex(index);
    if (index === 'new') {
      // Initialize empty item based on keys in schema or defaults
      // Simple approach: empty object, fields will be controlled inputs
      setTempItem({});
    } else {
      setTempItem({ ...formData[section][index] });
    }
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditingIndex(null);
    setTempItem({});
  };

  const saveItem = () => {
    if (!editingSection) return;

    setFormData((prev) => {
      const newList = [...prev[editingSection]];
      if (editingIndex === 'new') {
        newList.push(tempItem);
      } else {
        newList[editingIndex] = tempItem;
      }
      return { ...prev, [editingSection]: newList };
    });

    cancelEditing();
  };

  const handleTempChange = (e, field) => {
    const { value } = e.target;
    setTempItem(prev => ({ ...prev, [field]: value }));
  };

  const handleTempArrayChange = (e, field) => {
    const { value } = e.target;
    setTempItem(prev => ({ ...prev, [field]: value.split(',').map(s => s.trim()) }));
  };

  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  // Custom Fields Management
  const addCustomField = () => {
    setCustomFields([...customFields, { key: "", value: "" }]);
  };

  const updateCustomField = (index, field, value) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
  };

  const removeCustomField = (index) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!formData.personalInfo.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!formData.personalInfo.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.personalInfo.email)) {
      errors.email = "Please enter a valid email";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ... (handleSubmit and resetState remain same)
  // ... inside GenerateWebsite component

  // ✅ NEW: Deployment State
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [deploymentUrl, setDeploymentUrl] = useState("");
  const [deploymentError, setDeploymentError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    setShowValidation(true);
    if (!validateForm()) {
      setSubmitError("Please fill in all required fields correctly (Full Name and Email are required)");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setDeploymentStep(1); // Start: Creating Repo
    setDeploymentError("");

    // Validatio passed, proceed to generation
    await generateWebsite(formData);
  };

  const generateWebsite = async (submissionData) => {
    try {
      // Simulate Steps for UX (Real backend doesn't stream progress yet)
      // We will update steps based on time or success for now

      // Step 2: Pushing Files (Simulated delay after request start)
      setTimeout(() => setDeploymentStep(2), 2000);

      // Step 3: Creating Deployment (Simulated delay)
      setTimeout(() => setDeploymentStep(3), 4000);

      // Step 4: Waiting for Deployment (Simulated delay)
      setTimeout(() => setDeploymentStep(4), 8000);

      // Actual API Call
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/generator/generate-and-deploy`,
        {
          template: selectedTemplate.id,
          data: submissionData,
        }
      );

      setDeploymentStep(5); // Checking Status

      if (response.data.success) {
        const deployedUrl = response.data.deploymentUrl;
        const repoUrl = response.data.repoUrl; // Assuming backend returns this

        // Final Step: Complete
        setDeploymentUrl(deployedUrl);
        setDeploymentStep(6);

        // 1️⃣ Create new site entry
        const newSite = {
          id: Date.now(),
          name: formData.personalInfo?.fullName?.trim()
            ? `${formData.personalInfo.fullName}'s Portfolio`
            : `Portfolio Site ${new Date().toLocaleDateString()}`,
          createdAt: new Date().toISOString().split("T")[0],
          status: "Deployed",
          link: deployedUrl,
        };

        // 2️⃣ Save to localStorage
        let existingSites = [];
        try {
          const stored = localStorage.getItem("sites");
          if (stored) {
            existingSites = JSON.parse(stored);
          }
        } catch (err) {
          console.error("Error reading sites:", err);
        }
        const updatedSites = [...existingSites, newSite];
        localStorage.setItem("sites", JSON.stringify(updatedSites));

        // 3️⃣ Redirect to Success Page after short delay
        setTimeout(() => {
          navigate('/success', {
            state: {
              deploymentUrl: deployedUrl,
              repoUrl: repoUrl
            }
          });
        }, 1500); // 1.5s delay to let user see "Successful" message

      } else {
        throw new Error(response.data.message || "Deployment failed");
      }
    } catch (error) {
      console.error("❌ Error generating website:", error);
      setDeploymentError(error.message || "An unexpected error occurred.");
      // Keep overlay open to show error
    }
  };

  const handlePaidTemplateClick = async (template) => {
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1. Create Order
      const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/payment/order`, {
        amount: template.price,
        currency: "INR"
      });

      if (!orderResponse.data.success) {
        throw new Error("Failed to create payment order");
      }

      const { order } = orderResponse.data;

      // Get user details from localStorage for prefill
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Portfolio Generator",
        description: `Payment for ${template.name}`,
        order_id: order.id,
        handler: async function (response) {
          // 2. Verify Payment
          try {
            const verifyResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/payment/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              // Payment Successful, unlock the template
              setSelectedTemplate(template);
            } else {
              alert("Payment verification failed. Please try again.");
            }
          } catch (error) {
            console.error("Payment Verification Error:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
          contact: user.phone || "",
        },
        theme: {
          color: "#ff8c00",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment setup error:", error);
      alert("Could not initiate payment. Please try again.");
    }
  };

  const resetState = () => {
    setSelectedTemplate(null);
    setFormData(initialPortfolioFormFields);
    setDeploymentUrl("");
    setSubmitError("");
  };

  const renderFormField = (sectionKey, fieldKey, fieldValue) => {
    // Standard render for non-array fields
    const label = fieldKey
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    const isTextArea = [
      "introduction",
      "description",
      "details",
      "message",
      "quote"
    ].includes(fieldKey);

    return (
      <div className="form-group" key={fieldKey}>
        {isTextArea ? (
          <textarea
            id={`${sectionKey}-${fieldKey}`}
            name={fieldKey}
            value={fieldValue}
            onChange={(e) => handleInputChange(e, sectionKey)}
            rows="4"
            placeholder={label}
          />
        ) : (
          <input
            type="text"
            id={`${sectionKey}-${fieldKey}`}
            name={fieldKey}
            value={fieldValue}
            onChange={(e) => handleInputChange(e, sectionKey)}
            placeholder={label}
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
                onClick={() => template.type === 'free' ? setSelectedTemplate(template) : handlePaidTemplateClick(template)}
              >
                <img
                  src={template.previewImage}
                  alt={template.name}
                  className="template-image"
                />
                <div className="template-info">
                  <div className="template-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3>{template.name}</h3>
                    <span className={`template-badge ${template.type}`} style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      backgroundColor: template.type === 'free' ? '#28a745' : '#ffc107',
                      color: template.type === 'free' ? 'white' : 'black'
                    }}>
                      {template.type === 'free' ? 'FREE' : `₹${template.price}`}
                    </span>
                  </div>
                  <p>{template.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="website-form-container">
          <form onSubmit={handleSubmit} className="website-form">
            <div className="upload-section-enhanced">
              <div className="upload-icon">
                <i className="bx bx-cloud-upload" style={{ fontSize: '3rem' }}></i>
              </div>
              <h3>Upload Document/Resume</h3>
              <p style={{ color: '#ff8c00', fontSize: '0.9rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
                PDF format • Auto-fills your information
              </p>

              <label htmlFor="resume-upload">
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className="btn-upload"
                  onClick={() => document.getElementById('resume-upload').click()}
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <i className="bx bx-upload"></i>
                      <span>Choose File</span>
                    </>
                  )}
                </button>
              </label>

              {uploadMessage && (
                <div className={`upload-message ${uploadMessage.includes('success') ? 'success' : 'info'}`}>
                  <i className={`bx ${uploadMessage.includes('success') ? 'bx-check-circle' : 'bx-info-circle'}`}></i>
                  {uploadMessage}
                </div>
              )}
            </div>

            {Object.entries(formData).map(([sectionKey, sectionData]) => (
              <fieldset className="form-section" key={sectionKey}>
                <legend>
                  {sectionKey
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </legend>

                {Array.isArray(sectionData) ? (
                  // ✅ Refactored Array Rendering
                  <div className="list-editor">

                    {/* List View */}
                    {!editingSection || editingSection !== sectionKey ? (
                      <>
                        {sectionData.length > 0 && (
                          <div className="items-list-grid">
                            {sectionData.map((item, index) => {
                              const config = SECTION_CONFIG[sectionKey] || {};
                              const title = item[config.itemTitleKey] || `Item ${index + 1}`;
                              const subtitle = item[config.itemSubtitleKey] || "";

                              return (
                                <div key={index} className="summary-card">
                                  <div className="summary-info">
                                    <h4>{title}</h4>
                                    {subtitle && <p>{subtitle}</p>}
                                  </div>
                                  <div className="summary-actions">
                                    <button type="button" className="btn-icon-edit" onClick={() => startEditing(sectionKey, index)}>✏️</button>
                                    <button type="button" className="btn-icon-remove" onClick={() => removeItem(sectionKey, index)}>🗑️</button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <button type="button" className="btn-add-item" onClick={() => startEditing(sectionKey, 'new')}>
                          + Add {SECTION_CONFIG[sectionKey]?.label || "Item"}
                        </button>
                      </>
                    ) : (
                      // Edit View
                      <div className="edit-form-card">
                        <h4>{editingIndex === 'new' ? `Add New ${SECTION_CONFIG[sectionKey]?.label}` : `Edit ${SECTION_CONFIG[sectionKey]?.label}`}</h4>

                        <div className="edit-form-fields">
                          {SECTION_CONFIG[sectionKey]?.fields.map((fieldConfig, idx) => {
                            // Handle Row (Two Columns)
                            if (fieldConfig.row) {
                              return (
                                <div className="form-row" key={idx}>
                                  {fieldConfig.row.map((subField) => (
                                    <div className="form-group half-width" key={subField.name}>
                                      <input
                                        type="text"
                                        value={tempItem[subField.name] || ""}
                                        onChange={(e) => handleTempChange(e, subField.name)}
                                        placeholder={subField.label}
                                      />
                                    </div>
                                  ))}
                                </div>
                              );
                            }

                            // Handle Standard Fields
                            return (
                              <div className="form-group" key={fieldConfig.name}>
                                {fieldConfig.type === 'textarea' ? (
                                  <textarea
                                    value={tempItem[fieldConfig.name] || ""}
                                    onChange={(e) => handleTempChange(e, fieldConfig.name)}
                                    placeholder={fieldConfig.label}
                                    rows={4}
                                  />
                                ) : fieldConfig.type === 'array' ? (
                                  <input
                                    type="text"
                                    value={Array.isArray(tempItem[fieldConfig.name]) ? tempItem[fieldConfig.name].join(', ') : tempItem[fieldConfig.name] || ""}
                                    onChange={(e) => handleTempArrayChange(e, fieldConfig.name)}
                                    placeholder={fieldConfig.label}
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    value={tempItem[fieldConfig.name] || ""}
                                    onChange={(e) => handleTempChange(e, fieldConfig.name)}
                                    placeholder={fieldConfig.label}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="edit-actions">
                          <button type="button" className="btn btn-secondary" onClick={cancelEditing}>Cancel</button>
                          <button type="button" className="btn btn-primary" onClick={saveItem}>Save Item</button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Render Standard Fields for Objects
                  Object.entries(sectionData).map(([fieldKey, fieldValue]) => {
                    return renderFormField(sectionKey, fieldKey, fieldValue);
                  })
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
      {selectedTemplate && (
        <AIChatbot selectedTemplate={selectedTemplate} formData={formData} />
      )}

      {/* Deployment Status Overlay */}
      {deploymentStep > 0 && (
        <DeploymentStatus
          currentStep={deploymentStep}
          deploymentUrl={deploymentUrl}
          error={deploymentError}
        />
      )}
    </div>
  );
};

export default GenerateWebsite;
