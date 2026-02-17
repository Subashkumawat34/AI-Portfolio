import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

/**
 * Send a message to the AI chatbot and get a response
 * @param {string} message - User's message
 * @param {object} context - Context information (template, form section, etc.)
 * @returns {Promise<object>} Response from the chatbot
 */
export const sendChatMessage = async (message, context = {}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/chatbot/chat`, {
            message,
            context,
        });

        if (response.data.success) {
            return {
                success: true,
                message: response.data.message,
                timestamp: response.data.timestamp,
            };
        } else {
            throw new Error(response.data.error || "Failed to get response");
        }
    } catch (error) {
        console.error("Chatbot API Error:", error);

        // Handle HTTP status errors with specific codes
        if (error.response) {
            const { status, data } = error.response;

            // Network/Service errors (503)
            if (status === 503 || data?.code === "NETWORK_ERROR") {
                return {
                    success: false,
                    error: data?.error || "The AI assistant is temporarily unavailable due to network connectivity issues. Please check your internet connection and try again.",
                };
            }

            // Timeout errors (504)
            if (status === 504 || data?.code === "TIMEOUT_ERROR") {
                return {
                    success: false,
                    error: data?.error || "The request took too long. Please try again with a shorter message.",
                };
            }

            // Authentication errors (401)
            if (status === 401 || data?.code === "AUTH_ERROR") {
                return {
                    success: false,
                    error: data?.error || "Authentication error. Please contact support.",
                };
            }

            // Rate limit errors (429)
            if (status === 429 || data?.code === "RATE_LIMIT_ERROR") {
                return {
                    success: false,
                    error: data?.error || "Too many requests. Please wait a moment before trying again.",
                };
            }

            // Validation errors (400)
            if (status === 400) {
                return {
                    success: false,
                    error: data?.error || "Invalid request. Please check your message and try again.",
                };
            }

            // Server errors (500)
            if (status === 500) {
                return {
                    success: false,
                    error: data?.error || "The AI assistant encountered an error. Please try again.",
                };
            }
        }

        // Handle network errors (no response from server)
        if (error.code === "ERR_NETWORK" || !error.response) {
            return {
                success: false,
                error: "Unable to connect to the chatbot service. Please check your internet connection.",
            };
        }

        // Generic error
        return {
            success: false,
            error: error.response?.data?.error || "An error occurred while contacting the AI assistant. Please try again.",
        };
    }
};
