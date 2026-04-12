# ✨ AI-Based Portfolio Website Generator

> **Instantly generate a professional, deployed portfolio website using AI.**

![Project Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop) *Note: Replace with actual project screenshot*

## 🚀 Live Demo

- **Frontend Application:** [https://ai-portfolio-frontend-rho.vercel.app/home](https://ai-portfolio-frontend-rho.vercel.app/home)
- **Backend API:** [https://ai-portfolio-backend-ybp9.onrender.com/](https://ai-portfolio-backend-ybp9.onrender.com/)

---

## 🌟 About The Project

**Building a portfolio is hard. We made it 1-click easy.**

In today's competitive job market, having a professional portfolio is crucial. However, many developers and professionals struggle with:
*   Spending hours designing and coding a personal site from scratch.
*   Formatting their resume data into a web-friendly layout.
*   Dealing with complex deployment pipelines.

**The AI-Based Portfolio Website Generator solves this.** 

It bridges the gap between your raw data (Resume/CV) and a live, deployed website. By leveraging **Google's Gemini 2.0 Flash AI**, it understands your profile, writes engaging content for you, selects a premium template, and handles the entire technical deployment process (GitHub & Vercel) automatically.

### 🎯 Project Goals
*   **Automation:** Zero manual coding required for the end user.
*   **Speed:** Go from "No Portfolio" to "Live Link" in under 2 minutes.
*   **Quality:** Generate sites that look custom-designed, not like generic templates.
*   **Accessibility:** Make professional web presence accessible to everyone.

## ✨ Key Features

- **🤖 AI-Powered Content Generation:** Uses Google Gemini to write compelling bios, summaries, and project descriptions.
- **🎨 Modern Templates:** Choose from a variety of responsive, high-quality templates.
- **🚀 One-Click Deployment:** Automatically creates a GitHub repository and deploys the site to Vercel.
- **🖼️ Image Handling:** Supports uploading profile pictures and project images.
- **📱 Fully Responsive:** Generated sites look great on mobile, tablet, and desktop.
- **🔧 Customizable:** Edit your data before generation to ensure accuracy.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React.js](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Styling:** [TailwindCSS](https://tailwindcss.com/) & [Bootstrap](https://getbootstrap.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **State Management & Forms:** React Hook Form
- **Routing:** React Router DOM

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/) (for user data & history)
- **Deployment Automation:** GitHub API & Vercel API
- **Templating:** EJS (Embedded JavaScript)

---

## 📂 Project Structure

```bash
AI_Based_Portfolio_website_generator/
├── FrontEnd/          # React Client Application
│   ├── src/
│   ├── public/
│   └── ...
├── BackEnd/           # Node.js/Express Server
│   ├── Controllers/   # Logic for generation and deployment
│   ├── Templates/     # EJS Templates for portfolios
│   └── ...
└── README.md          # You are here
```

## 🏁 Getting Started

To run this project locally, you will need to set up both the **FrontEnd** and **BackEnd**.

### 1. Backend Setup
Navigate to the `BackEnd` directory and follow the instructions in [BackEnd/README.md](./BackEnd/README.md).

### 2. Frontend Setup
Navigate to the `FrontEnd` directory and follow the instructions in [FrontEnd/README.md](./FrontEnd/README.md).

---

Made with ❤️ using AI.
