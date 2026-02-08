const express = require("express");
const router = express.Router();
const { generateAndDeploy } = require("../Controllers/GeneratorController");

// This route will handle the website creation.
// The final path will be /generator/generate-and-deploy
router.post("/generate-and-deploy", generateAndDeploy);

module.exports = router;
