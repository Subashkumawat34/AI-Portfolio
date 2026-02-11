# ⚙️ AI Portfolio Generator - Backend API

The engine room of the application. This API orchestrates the complex dance between **AI Content Generation**, **File System Operations**, and **Cloud Deployment**.

![Backend Architecture](https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop)

## 🧠 System Architecture

The backend is designed as a pipeline processor that transforms raw user data into a deployed application:

1.  **Data Ingestion:** Accepts user text/images or parses uploaded Resumes (PDF/DOCX).
2.  **AI Processing (Gemini 2.0):** 
    *   *Analysis:* Extracts structured data (Skills, Experience, Projects) from unstructured resume text.
    *   *Creative Writing:* Generates professional bios, taglines, and project descriptions.
3.  **Dynamic Templating:** Injects the AI-enhanced data into highly customizable EJS templates.
4.  **Automated DevOps:**
    *   Creates a new GitHub Repository on the user's behalf.
    *   Pushes the generated code.
    *   Triggers a Vercel Deployment via API.
    *   **Auto-Configures:** Sets up production settings and disables deployment protection for immediate public access.

## 🚀 Key Features

- **🤖 Google Gemini Integration:** Uses `gemini-2.0-flash` for high-quality, specialized text generation (bios, summaries).
- **🐙 GitHub Automation:** Automatically creates repositories for generated portfolios using `simple-git`.
- **☁️ Vercel Deployment:** Instantly deploys generated static sites via the Vercel API.
- **📄 Document Parsing:** Extracts data from uploaded Resumes/CVs (PDF/DOCX) using [`pdf-parse`](https://www.npmjs.com/package/pdf-parse) and [`mammoth`](https://www.npmjs.com/package/mammoth).
- **🔒 Secure:** Implements JWT authentication and secure environment variable handling.
- **🗄️ MongoDB Database:** Stores user profiles and generated portfolio history.

## 🛠️ Tech Stack

- **Server:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **AI Model:** [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai)
- **Database:** [MongoDB](https://www.mongodb.com/) with Mongoose
- **Deployment Tools:** [Simple Git](https://www.npmjs.com/package/simple-git), [Axios](https://axios-http.com/)
- **Templating:** [EJS](https://ejs.co/)
- **Utilities:** [Dotenv](https://www.npmjs.com/package/dotenv), [Cors](https://www.npmjs.com/package/cors), [Fs-Extra](https://www.npmjs.com/package/fs-extra)

## 📦 Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd BackEnd
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root of `BackEnd/` and add the following keys:

    ```env
    PORT=8080
    MONGODB_URI=mongodb://127.0.0.1:27017/users  # Or your MongoDB Atlas URI
    JWT_SECRET=your_jwt_secret_key

    # GitHub Configuration
    GITHUB_USERNAME=your_github_username
    GITHUB_TOKEN=your_github_personal_access_token

    # Vercel Configuration
    VERCEL_TOKEN=your_vercel_access_token
    # VERCEL_TEAM_ID=optional_if_needed

    # Google Gemini AI Configuration
    GEMINI_API_KEY_CHATBOT=your_gemini_api_key
    GEMINI_API_KEY_EXTRACT=your_gemini_api_key
    CHATBOT_MODEL=gemini-2.0-flash
    EXTRACTOR_MODEL=gemini-2.0-flash

    NODE_ENV=development
    ```

4.  **Start the server:**
    ```bash
    npm run dev
    ```
    The server typically runs on `http://localhost:8080`.

## 📡 API Endpoints

### Generator
- `POST /generator/generate-and-deploy`: Triggers the AI generation and deployment process.
  - **Body:** `{ template: 1, data: { ...user_profile_data } }`

### Deployment
- `GET /fetch-deployed`: Fetches the status/content of a deployed site (for verification).

### Authentication (If applicable)
- `POST /auth/signup`: Create a new user account.
- `POST /auth/login`: Authenticate and receive a JWT.

## 📜 Scripts

- `npm run dev`: Starts the server with Nodemon for hot-reloading.
- `npm start`: Starts the server in production mode.
- `npm test`: Runs test scripts (e.g., deployment tests).

---

Made with ❤️ using Node.js & Express.
