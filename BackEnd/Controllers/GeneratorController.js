const axios = require("axios");
const simpleGit = require("simple-git");
const path = require("path");
const ejs = require("ejs");
const fs = require("fs-extra");

const { GITHUB_USERNAME, GITHUB_TOKEN, VERCEL_TOKEN, VERCEL_TEAM_ID } =
  process.env;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
    const templatePath = path.join(
      __dirname,
      "..",
      "Templates",
      `template${templateId}.ejs`
    );

    if (!(await fs.pathExists(templatePath))) {
      throw new Error(`Template ${templateId} not found`);
    }

    console.log("🛠️  Generating HTML from template");
    const renderedHtml = await ejs.renderFile(templatePath, formData);
    await fs.writeFile(path.join(localRepoPath, "index.html"), renderedHtml);

    // Create vercel.json configuration
    const vercelConfig = {
      version: 2,
      builds: [{ src: "index.html", use: "@vercel/static" }],
      routes: [{ handle: "filesystem" }],
    };
    await fs.writeFile(
      path.join(localRepoPath, "vercel.json"),
      JSON.stringify(vercelConfig, null, 2)
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

    // 4. Create Vercel deployment
    console.log("🚀 Creating Vercel deployment");
    let deploymentResponse;
    try {
      const repoInfo = await axios.get(
        `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`,
        {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
          },
          timeout: 10000,
        }
      );

      const repoId = repoInfo.data.id;

      deploymentResponse = await axios.post(
        "https://api.vercel.com/v13/deployments",
        {
          name: repoName,
          gitSource: {
            type: "github",
            repoId: repoId,
            ref: "main",
          },
          target: "production",
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
            "Content-Type": "application/json",
          },
          timeout: 15000,
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
    console.log(`⏳ Waiting for deployment (Deployment ID: ${deploymentId})`);

    // 5. Wait for deployment to complete
    let deploymentUrl = "";
    let attempts = 0;
    const maxAttempts = 40;
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

        const {
          readyState,
          alias: [alias] = [],
          error,
        } = deploymentStatus.data;

        if (readyState === "READY" && alias) {
          deploymentUrl = `https://${alias}`;
          break;
        } else if (readyState === "ERROR") {
          lastError = error?.message || "Deployment failed";
          throw new Error(lastError);
        }
      } catch (error) {
        console.error(
          `Deployment check ${attempts + 1}/${maxAttempts}:`,
          error.message
        );
        lastError = error.message;
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
      message: "Portfolio Website deployed successfully!",
    });
  } catch (error) {
    console.error("❌ Deployment failed:", error.message);

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
