const axios = require("axios");
// const simpleGit = require("simple-git"); // Removed to use GitHub API directly for better stability in production
const path = require("path");
const ejs = require("ejs");
const fs = require("fs-extra");
const os = require("os");

const { GITHUB_USERNAME, GITHUB_TOKEN, VERCEL_TOKEN, VERCEL_TEAM_ID } =
  process.env;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to extract local image paths from form data
const collectLocalImagePaths = (data) => {
  const paths = [];
  const checkPath = (p) => {
    if (p && typeof p === "string" && p.startsWith("uploads/")) {
      paths.push(p);
    }
  };

  if (data.personalInfo?.profileImage) checkPath(data.personalInfo.profileImage);

  if (data.projects) {
    data.projects.forEach(p => {
      checkPath(p.image);
    });
  }

  if (data.technologies) {
    data.technologies.forEach(t => {
      checkPath(t.image);
    });
  }

  if (data.testimonials) {
    data.testimonials.forEach(t => {
      checkPath(t.avatar);
    });
  }

  return [...new Set(paths)]; // Remove duplicates
};

// Helper to push a file to GitHub via Content API
const pushFileToGitHub = async (repoName, filePath, content, isBase64 = false) => {
  const { GITHUB_USERNAME, GITHUB_TOKEN } = process.env;
  
  try {
    const response = await axios.put(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/contents/${filePath}`,
      {
        message: `Add ${filePath}`,
        content: isBase64 ? content : Buffer.from(content).toString("base64"),
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`❌ Error pushing ${filePath} to GitHub:`, error.response?.data || error.message);
    throw new Error(`Failed to push ${filePath} to GitHub: ${error.response?.data?.message || error.message}`);
  }
};


const generateAndDeploy = async (req, res) => {
  // NOTE: updated destructuring to match frontend POST
  const { template: templateId, data: formData } = req.body;

  // Validate input for portfolio
  if (!formData?.personalInfo?.fullName) {
    return res.status(400).json({
      success: false,
      message: "Full Name is required",
    });
  }

  const repoName = `${formData.personalInfo.fullName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")}-${Date.now()}`;

  // ✅ Environment Validation for Production
  const { GITHUB_USERNAME, GITHUB_TOKEN, VERCEL_TOKEN } = process.env;
  console.log("🚦 Validating environment variables...");
  if (!GITHUB_USERNAME || !GITHUB_TOKEN || !VERCEL_TOKEN) {
    const missing = [];
    if (!GITHUB_USERNAME) missing.push("GITHUB_USERNAME");
    if (!GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
    if (!VERCEL_TOKEN) missing.push("VERCEL_TOKEN");
    
    console.error(`❌ Missing required env vars: ${missing.join(", ")}`);
    return res.status(500).json({
      success: false,
      message: `Production environment is not fully configured. Missing: ${missing.join(", ")}. Please add these to your deployment dashboard.`,
    });
  }
  console.log(`✅ Env validation passed (Username: ${GITHUB_USERNAME}, Tokens: [HIDDEN])`);

  const localRepoPath = path.join(os.tmpdir(), "profolio-repos", repoName);

  try {
    console.log(`📂 Creating temporary directory at ${localRepoPath}`);
    await fs.ensureDir(localRepoPath);

    // 1. Generate website files
    // Templates are organized in subdirectories: template1/index.ejs, template2/index.ejs, etc.
    const templatePath = path.join(
      __dirname,
      "..",
      "Templates",
      `template${templateId}`,
      "index.ejs"
    );

    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template ${templateId} not found at ${templatePath}`);
    }

    console.log("🛠️  Generating HTML from template");
    const renderedHtml = await ejs.renderFile(templatePath, formData);
    await fs.writeFile(path.join(localRepoPath, "index.html"), renderedHtml);

    // Create vercel.json configuration
    // NOTE: Using rewrites for SPA-like behavior (serving index.html for all routes)
    const vercelConfig = {
      rewrites: [
        {
          source: "/(.*)",
          destination: "/index.html"
        }
      ]
    };


    const vercelJsonString = JSON.stringify(vercelConfig, null, 2);
    console.log("📝 Generated vercel.json content:", vercelJsonString);


    await fs.writeFile(
      path.join(localRepoPath, "vercel.json"),
      vercelJsonString
    );

    // 2. Create GitHub repository
    console.log("🐙 Creating GitHub repository");
    let repoResponse;
    try {
      repoResponse = await axios.post(
        "https://api.github.com/user/repos",
        {
          name: repoName,
          private: false,
          auto_init: false,
        },
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          timeout: 10000,
        }
      );
    } catch (githubError) {
      console.error(
        "GitHub API Error:",
        githubError.response?.data || githubError.message
      );
      throw new Error(
        githubError.response?.data?.message ||
        "Failed to create GitHub repository. Please check your GitHub token."
      );
    }

    // ✅ Wait for GitHub to initialize the repo (prevents 404 in subsequent file pushes)
    console.log("⏳ Waiting for GitHub repo to initialize...");
    await sleep(3000);

    // 3. Push to GitHub using API
    console.log("⬆️ Pushing files to GitHub via API");
    
    // Push index.html
    await pushFileToGitHub(repoName, "index.html", renderedHtml);
    
    // Push vercel.json
    await pushFileToGitHub(repoName, "vercel.json", vercelJsonString);

    // Handle local images and push them to GitHub
    const imagePaths = collectLocalImagePaths(formData);
    const filesToDeploy = [
      {
        file: "index.html",
        data: Buffer.from(renderedHtml).toString("base64"),
        encoding: "base64",
      },
      {
        file: "vercel.json",
        data: Buffer.from(vercelJsonString).toString("base64"),
        encoding: "base64",
      }
    ];

    for (const imagePath of imagePaths) {
      const fullSourcePath = path.join(__dirname, "..", imagePath);
      if (await fs.pathExists(fullSourcePath)) {
        const imageBuffer = await fs.readFile(fullSourcePath);
        const imageBase64 = imageBuffer.toString("base64");
        
        // Push image to GitHub
        console.log(`📸 Pushing image to GitHub: ${imagePath}`);
        await pushFileToGitHub(repoName, imagePath, imageBase64, true);

        // Add to Vercel deployment list
        filesToDeploy.push({
          file: imagePath,
          data: imageBase64,
          encoding: "base64",
        });
      } else {
        console.warn(`⚠️ Image not found: ${fullSourcePath}`);
      }
    }

    // 4. Create Vercel deployment
    console.log("🚀 Creating Vercel deployment");
    let deploymentResponse;
    try {



      // Create deployment with file upload (works for new repos without pre-existing Vercel projects)
      deploymentResponse = await axios.post(
        "https://api.vercel.com/v13/deployments",
        {
          name: repoName,
          files: filesToDeploy,
          projectSettings: {
            framework: null,
          },
          target: "production",
        },
        {
          headers: {
            Authorization: `Bearer ${VERCEL_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        }
      );
    } catch (vercelError) {
      console.error(
        "Vercel API Error:",
        vercelError.response?.data || vercelError.message
      );
      throw new Error(
        vercelError.response?.data?.error?.message ||
        "Failed to create Vercel deployment. Please check your Vercel token."
      );
    }

    const deploymentId = deploymentResponse.data.id;
    const projectId = deploymentResponse.data.projectId;
    console.log(`⏳ Waiting for deployment (Deployment ID: ${deploymentId})`);

    // --- DISABLE DEPLOYMENT PROTECTION ---
    if (projectId) {
      console.log(`🛡️ Attempting to disable Deployment Protection for project ${projectId}...`);
      try {
        await axios.patch(
          `https://api.vercel.com/v9/projects/${projectId}`,
          {
            passwordProtection: null,
            ssoProtection: null,
          },
          {
            headers: {
              Authorization: `Bearer ${VERCEL_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("✅ Deployment Protection disabled successfully.");
      } catch (patchError) {
        console.warn(
          "⚠️ Failed to disable Deployment Protection (non-fatal):",
          patchError.response?.data || patchError.message
        );
      }
    }
    // -------------------------------------

    // 5. Wait for deployment to complete
    let deploymentUrl = "";
    let attempts = 0;
    const maxAttempts = 10; // 10 attempts × 3 seconds = 30 seconds timeout
    let lastError = null;

    while (attempts < maxAttempts && !deploymentUrl) {
      try {
        const deploymentStatus = await axios.get(
          `https://api.vercel.com/v13/deployments/${deploymentId}`,
          {
            headers: { Authorization: `Bearer ${VERCEL_TOKEN}` },
            timeout: 10000,
          }
        );

        const { readyState, url, alias, error } = deploymentStatus.data;

        console.log(
          `📊 Deployment status check ${attempts + 1}/${maxAttempts}: readyState=${readyState}, url=${url}`
        );

        if (readyState === "READY") {
          // Primary: Use the 'url' field which is the default Vercel deployment URL
          // Format: project-name-hash.vercel.app
          if (url) {
            deploymentUrl = `https://${url}`;
            console.log(`✅ Deployment URL from 'url' field: ${deploymentUrl}`);
          }
          // Fallback: Use alias if available (custom domains)
          else if (alias && alias.length > 0) {
            deploymentUrl = `https://${alias[0]}`;
            console.log(`✅ Deployment URL from 'alias' field: ${deploymentUrl}`);
          } else {
            console.warn("⚠️ Deployment ready but no URL found, retrying...");
          }

          if (deploymentUrl) {
            break;
          }
        } else if (readyState === "ERROR") {
          // Enhanced error logging - capture full error details from Vercel
          console.error(`❌ VERCEL DEPLOYMENT ERROR DETAILS:`);
          console.error(`   Error object:`, JSON.stringify(error, null, 2));
          console.error(`   Full deployment status:`, JSON.stringify(deploymentStatus.data, null, 2));

          await fs.writeFile(
            path.join(__dirname, "..", "last_deployment_status.json"),
            JSON.stringify(deploymentStatus.data, null, 2)
          );

          lastError = error?.message || deploymentStatus.data.errorMessage || "Deployment failed with unknown error";
          throw new Error(lastError);
        } else if (readyState === "CANCELED") {
          throw new Error("Deployment was canceled");
        }
        // readyState could be: BUILDING, QUEUED, INITIALIZING, etc.
      } catch (error) {
        // Only log non-status-check errors
        if (!error.message.includes("readyState")) {
          console.error(
            `⚠️ Deployment check ${attempts + 1}/${maxAttempts} error:`,
            error.message
          );
        }
        lastError = error.message;

        // If it's a critical error (not just a timeout), break early
        if (error.response?.status === 404 || error.response?.status === 403) {
          throw new Error(`Deployment check failed: ${error.message}`);
        }
      }

      attempts++;
      await sleep(3000);
    }

    if (!deploymentUrl) {
      throw new Error(
        lastError ||
        "Deployment did not complete in time. Please check Vercel dashboard."
      );
    }

    console.log(`✅ Deployment ready at: ${deploymentUrl}`);

    // Cleanup
    await fs.remove(localRepoPath);

    return res.json({
      success: true,
      deploymentUrl,
      repoUrl: `https://github.com/${GITHUB_USERNAME}/${repoName}`,
      message: "Portfolio Website deployed successfully!",
    });
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);
    console.error("❌ Full error stack:", error.stack);
    console.error("❌ Error details:", JSON.stringify(error, null, 2));

    await fs.writeFile(
      path.join(__dirname, "..", "last_deployment_error.json"),
      JSON.stringify({
        message: error.message,
        stack: error.stack,
        details: error
      }, null, 2)
    );



    // Cleanup temp directory if it exists
    if (await fs.pathExists(localRepoPath)) {
      await fs.remove(localRepoPath).catch((cleanupError) => {
        console.error("Cleanup failed:", cleanupError);
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "An unexpected error occurred during deployment",
      details: error.response?.data || null
    });
  }
};

module.exports = { generateAndDeploy };
