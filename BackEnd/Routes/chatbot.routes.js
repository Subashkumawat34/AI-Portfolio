const express = require("express");
const router = express.Router();
const { chat } = require("../Controllers/chatbot.controller");

// POST /api/chatbot/chat - Send message and get AI response
router.post("/chat", chat);

module.exports = router;
