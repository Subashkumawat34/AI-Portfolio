const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI with Chatbot-specific API key
const apiKey = process.env.GEMINI_API_KEY_CHATBOT ? process.env.GEMINI_API_KEY_CHATBOT.trim() : "";
console.log(`🤖 Chatbot Controller initialized with Key: ${apiKey.substring(0, 10)}... (Length: ${apiKey.length})`);
const genAI = new GoogleGenerativeAI(apiKey);

// Model configuration with fallback priority (ALL FREE TIER MODELS)
const MODEL_PRIORITY = [
  process.env.CHATBOT_MODEL || 'gemini-2.5-flash',  // Primary: Latest stable version
  'gemini-2.5-flash-lite',  // Fallback 1: Lite version (most reliable for free tier)
  'gemini-2.0-flash',       // Fallback 2: Previous version (watch for rate limits)
];

// Constants for error handling
const MAX_MESSAGE_LENGTH = 2000;
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 2;

/**
 * Handle chatbot conversation with comprehensive error handling
 * @route POST /api/chatbot/chat
 */
const chat = async (req, res) => {
  const startTime = Date.now();

  try {
    const { message, context } = req.body;

    // ========== INPUT VALIDATION ==========

    // Check if message exists
    if (!message) {
      console.warn("⚠️ Chatbot request missing message");
      return res.status(400).json({
        success: false,
        error: "Message is required",
        code: "MISSING_MESSAGE"
      });
    }

    // Validate message type
    if (typeof message !== "string") {
      console.warn("⚠️ Chatbot request message is not a string:", typeof message);
      return res.status(400).json({
        success: false,
        error: "Message must be a text string",
        code: "INVALID_MESSAGE_TYPE"
      });
    }

    // Check message length
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      console.warn("⚠️ Chatbot request message is empty");
      return res.status(400).json({
        success: false,
        error: "Message cannot be empty",
        code: "EMPTY_MESSAGE"
      });
    }

    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      console.warn(`⚠️ Chatbot message too long: ${trimmedMessage.length} chars`);
      return res.status(400).json({
        success: false,
        error: `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`,
        code: "MESSAGE_TOO_LONG"
      });
    }

    // Validate context (optional but if provided, must be object)
    if (context !== undefined && (typeof context !== "object" || Array.isArray(context))) {
      console.warn("⚠️ Chatbot context is invalid type:", typeof context);
      return res.status(400).json({
        success: false,
        error: "Context must be an object",
        code: "INVALID_CONTEXT"
      });
    }

    // ========== API KEY CHECK ==========

    if (!process.env.GEMINI_API_KEY_CHATBOT) {
      console.error("❌ GEMINI_API_KEY_CHATBOT is not configured!");
      return res.status(500).json({
        success: false,
        error: "Chatbot service is not properly configured. Please contact administrator.",
        code: "API_KEY_MISSING"
      });
    }

    // ========== GEMINI API CALL WITH TIMEOUT ==========

    console.log(`📨 Chatbot request: "${trimmedMessage.substring(0, 50)}${trimmedMessage.length > 50 ? '...' : ''}"`);

    // Loop through models with fallback logic
    for (let i = 0; i < MODEL_PRIORITY.length; i++) {
      const modelName = MODEL_PRIORITY[i];

      try {
        console.log(`🤖 Attempting generation with model: ${modelName} (Attempt ${i + 1}/${MODEL_PRIORITY.length})`);

        // Create timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("API_TIMEOUT")), API_TIMEOUT);
        });

        // Create API call promise
        const apiCallPromise = (async () => {
          const model = genAI.getGenerativeModel({ model: modelName });
          const systemContext = buildSystemPrompt(context);
          const fullPrompt = `${systemContext}\n\nUser: ${trimmedMessage}\n\nAssistant:`;

          const result = await model.generateContent(fullPrompt);
          const response = await result.response;
          return response.text();
        })();

        // Race between timeout and API call
        aiResponse = await Promise.race([apiCallPromise, timeoutPromise]);

        // If we get here, it succeeded
        console.log(`✅ Success with model: ${modelName}`);
        break; // Exit loop

      } catch (attemptError) {
        console.warn(`⚠️ Model ${modelName} failed:`, attemptError.message);

        // Check if this was the last model in the list
        if (i === MODEL_PRIORITY.length - 1) {
          console.error("❌ All models failed.");
          throw attemptError; // Throw the last error to be handled by the outer catch
        }

        // Optional: Add a small delay before switching models
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("🔄 Switching to fallback model...");
      }
    }

    // ========== RESPONSE VALIDATION ==========

    if (!aiResponse || typeof aiResponse !== "string") {
      console.error("❌ Invalid response from Gemini API:", typeof aiResponse);
      throw new Error("Invalid response format from AI service");
    }

    if (aiResponse.trim().length === 0) {
      console.error("❌ Empty response from Gemini API");
      throw new Error("AI service returned an empty response");
    }

    // ========== SUCCESS RESPONSE ==========

    const responseTime = Date.now() - startTime;
    console.log(`✅ Chatbot response generated in ${responseTime}ms`);

    return res.json({
      success: true,
      message: aiResponse,
      timestamp: new Date().toISOString(),
      responseTime
    });

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ Chatbot error after ${responseTime}ms:`, error.message);
    console.error("Error stack:", error.stack);

    // ========== ERROR CATEGORIZATION ==========

    // Network/Connectivity errors
    if (
      error.message?.includes("fetch failed") ||
      error.message?.includes("ECONNREFUSED") ||
      error.message?.includes("ENOTFOUND") ||
      error.message?.includes("network") ||
      error.code === "ECONNREFUSED"
    ) {
      console.error("🌐 Network connectivity issue detected");
      return res.status(503).json({
        success: false,
        error: "Unable to connect to AI service. This may be due to network restrictions or firewall settings.",
        code: "NETWORK_ERROR",
        details: "Please check your internet connection and firewall settings."
      });
    }

    // Timeout errors
    if (error.message?.includes("timed out") || error.message === "API_TIMEOUT") {
      console.error("⏱️ Request timeout");
      return res.status(504).json({
        success: false,
        error: "The AI service took too long to respond. Please try again with a shorter message.",
        code: "TIMEOUT_ERROR"
      });
    }

    // API Key errors
    if (
      error.message?.includes("API key") ||
      error.message?.includes("API_KEY") ||
      error.message?.includes("401") ||
      error.message?.includes("unauthorized")
    ) {
      console.error("🔑 API key issue detected");
      return res.status(401).json({
        success: false,
        error: "Authentication failed with AI service. Please contact administrator.",
        code: "AUTH_ERROR"
      });
    }

    // Rate limit errors
    if (
      error.message?.includes("rate limit") ||
      error.message?.includes("quota") ||
      error.message?.includes("429")
    ) {
      console.error("🚦 Rate limit exceeded");
      return res.status(429).json({
        success: false,
        error: "Too many requests. Please wait a moment and try again.",
        code: "RATE_LIMIT_ERROR"
      });
    }

    // Content filter/safety errors
    if (
      error.message?.includes("safety") ||
      error.message?.includes("blocked") ||
      error.message?.includes("content filter")
    ) {
      console.error("🛡️ Content safety issue");
      return res.status(400).json({
        success: false,
        error: "Your message couldn't be processed due to content guidelines. Please rephrase and try again.",
        code: "CONTENT_FILTER_ERROR"
      });
    }

    // ========== GENERIC ERROR RESPONSE ==========

    return res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again later.",
      code: "INTERNAL_ERROR",
      // Only include error message in development
      ...(process.env.NODE_ENV === 'development' && {
        debugMessage: error.message
      })
    });
  }
};

/**
 * Build context-aware system prompt based on user's current state
 */
function buildSystemPrompt(context) {
  const basePrompt = `You are an intelligent AI assistant helping users create and customize their portfolio websites. You should provide helpful, friendly, and professional guidance.

Your expertise includes:
- Website design and layout suggestions
- Color scheme recommendations
- Content organization and structure
- User experience best practices
- Portfolio presentation tips

Guidelines:
- Keep responses concise and actionable (under 200 words)
- Be encouraging and supportive
- Provide specific, practical suggestions
- Ask clarifying questions when needed
- Focus on helping users make their portfolio stand out`;

  // Add context-specific information if available
  if (context && typeof context === 'object') {
    let contextInfo = "\n\nCurrent Context:";

    if (context.templateName) {
      contextInfo += `\n- Selected Template: ${context.templateName}`;
    }

    if (context.formSection) {
      contextInfo += `\n- Current Section: ${context.formSection}`;
    }

    if (context.userQuery) {
      contextInfo += `\n- User Query Type: ${context.userQuery}`;
    }

    return basePrompt + contextInfo;
  }

  return basePrompt;
}

module.exports = {
  chat,
};
