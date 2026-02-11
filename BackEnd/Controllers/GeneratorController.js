const axios = require("axios");
const simpleGit = require("simple-git");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs-extra");

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

  // Create a safe repository name using the full name
  const repoName = `${formData.personalInfo.fullName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")}-${Date.now()}`;

  const localRepoPath = path.join(__dirname, "..", "temp-repos", repoName);

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

    // 3. Push to GitHub
    console.log("⬆️ Pushing files to GitHub");
    const git = simpleGit(localRepoPath);
    const remoteUrl = `https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${repoName}.git`;

    await git.init();
    await git.add("./*");
    await git.commit("Initial commit: Portfolio Website generated");
    await git.branch(["-M", "main"]);
    await git.addRemote("origin", remoteUrl);
    await git.push("origin", "main");

    // 4. Create Vercel deployment using file-based approach
    console.log("🚀 Creating Vercel deployment");
    let deploymentResponse;
    try {
      // Read the generated files
      const htmlContent = await fs.readFile(
        path.join(localRepoPath, "index.html"),
        "utf-8"
      );

      const filesToDeploy = [
        {
          file: "index.html",
          data: Buffer.from(htmlContent).toString("base64"),
          encoding: "base64",
        },
      ];

      // Add vercel.json to deployment
      const vercelJsonContent = await fs.readFile(
        path.join(localRepoPath, "vercel.json"),
        "utf-8"
      );
      filesToDeploy.push({
        file: "vercel.json",
        data: Buffer.from(vercelJsonContent).toString("base64"),
        encoding: "base64",
      });

      // Handle local images
      const imagePaths = collectLocalImagePaths(formData);
      for (const imagePath of imagePaths) {
        const fullSourcePath = path.join(__dirname, "..", imagePath);
        if (await fs.pathExists(fullSourcePath)) {
          // Add to Vercel deployment
          const imageBuffer = await fs.readFile(fullSourcePath);
          filesToDeploy.push({
            file: imagePath,
            data: imageBuffer.toString("base64"),
            encoding: "base64",
          });

          // Copy to temp repo for GitHub push
          const destPath = path.join(localRepoPath, imagePath);
          await fs.ensureDir(path.dirname(destPath));
          await fs.copy(fullSourcePath, destPath);
          console.log(`📸 Included image: ${imagePath}`);
        } else {
          console.warn(`⚠️ Image not found: ${fullSourcePath}`);
        }
      }



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
      message:
        error.message || "An unexpected error occurred during deployment",
    });
  }
};

module.exports = { generateAndDeploy };
