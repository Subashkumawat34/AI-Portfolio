import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../utils/chatbotApi";
import "../styles/AIChatbot.css";

const AIChatbot = ({ selectedTemplate, formData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: "ai",
            text: "👋 Hi! I'm your AI assistant. I can help you customize your website, suggest colors, layouts, and answer any questions about your portfolio. How can I help you today?",
            timestamp: new Date().toISOString(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when chatbot opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = inputMessage.trim();
        setInputMessage("");

        // Add user message to chat
        const newUserMessage = {
            type: "user",
            text: userMessage,
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newUserMessage]);

        // Show loading state
        setIsLoading(true);

        // Prepare context
        const context = {
            templateName: selectedTemplate?.name || "Unknown",
            formSection: "Website Generation",
        };

        // Send message to AI
        const response = await sendChatMessage(userMessage, context);

        setIsLoading(false);

        // Add AI response to chat
        const aiMessage = {
            type: "ai",
            text: response.success
                ? response.message
                : response.error || "Sorry, I couldn't process that. Please try again.",
            timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMessage]);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Icon */}
            <div
                className={`chatbot-icon ${isOpen ? "hidden" : ""}`}
                onClick={toggleChatbot}
                title="AI Assistant"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
                    <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
                    <path d="M9 14s1 1 3 1 3-1 3-1"></path>
                </svg>
                <div className="pulse-ring"></div>
            </div>

            {/* Chatbot Panel */}
            <div className={`chatbot-panel ${isOpen ? "open" : ""}`}>
                {/* Header */}
                <div className="chatbot-header">
                    <div className="chatbot-header-title">
                        <div className="ai-avatar">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
                                <path d="M12 12l-2 2 2 2 2-2-2-2z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3>AI Assistant</h3>
                            <p className="status">
                                <span className="status-dot"></span> Online
                            </p>
                        </div>
                    </div>
                    <button
                        className="close-btn"
                        onClick={toggleChatbot}
                        aria-label="Close chat"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Messages Container */}
                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.type}`}>
                            <div className="message-content">
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="message ai">
                            <div className="message-content loading">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="chatbot-input">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about your website..."
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        aria-label="Send message"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>

                {/* Quick Actions */}
                <div className="chatbot-quick-actions">
                    <button onClick={() => setInputMessage("Suggest color schemes for my portfolio")}>
                        🎨 Color Ideas
                    </button>
                    <button onClick={() => setInputMessage("How can I make my portfolio stand out?")}>
                        ✨ Make it Stand Out
                    </button>
                    <button onClick={() => setInputMessage("Give me layout suggestions")}>
                        📐 Layout Tips
                    </button>
                </div>
            </div>
        </>
    );
};

export default AIChatbot;
