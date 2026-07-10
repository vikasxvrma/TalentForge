# TalentForge 🚀

**TalentForge** is an AI-powered career intelligence platform that helps users interact with their resumes using Retrieval-Augmented Generation (RAG). It enables semantic resume search, AI-powered resume Q&A, and career conversations through a production-ready backend architecture.

> **Status:** Backend deployed and production-ready. React frontend is currently under development.

---

# Features

* 🔐 Google OAuth Authentication
* 🔑 JWT-based Authorization
* 📄 Resume Upload & PDF Parsing
* ✂️ Intelligent Text Chunking
* 🧠 Gemini Embedding Generation
* 🔎 Semantic Search using Qdrant
* 💬 AI Resume Question Answering (RAG)
* 🤖 General AI Career Chat
* 💭 Multi-turn Conversation History
* 👥 Multi-user Data Isolation
* ☁️ Production Deployment on Railway
* ✅ Continuous Integration with GitHub Actions

---

# Tech Stack

## Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* Qdrant Cloud
* Gemini API
* LangChain
* JWT
* Google OAuth
* Zod
* Pino
* Docker
* Railway

## Frontend (In Progress)

* React
* Vite
* Tailwind CSS
* React Router
* TanStack Query

---

# Architecture

```text
                 React Frontend (In Progress)
                          │
                          ▼
                Railway (Node.js + Express)
                          │
      ┌───────────────────┼───────────────────┐
      │                   │                   │
      ▼                   ▼                   ▼
Neon PostgreSQL      Qdrant Cloud        Gemini API
```

---

# Project Structure

```text
server/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── service/
│   └── utils/
│
├── database/
│   └── schema.sql
│
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
```

---

# Production Highlights

* Production deployment on Railway
* Managed PostgreSQL with Neon
* Vector database hosted on Qdrant Cloud
* AI-powered retrieval using Gemini Embeddings
* Secure authentication with Google OAuth and JWT
* Automated CI pipeline using GitHub Actions
* Centralized logging and validation
* Cloud-ready configuration

---

# Engineering Challenges Solved

* Migrated from local Docker databases to managed cloud services.
* Configured Qdrant Cloud payload indexes for efficient filtered vector search.
* Designed a multi-user RAG pipeline with isolated resume embeddings.
* Built a production-ready deployment pipeline using Railway and GitHub Actions.
* Implemented centralized error handling, request validation, and structured logging.

---

# Roadmap

### ✅ Sprint 1–5

* Authentication
* Resume Processing
* RAG Pipeline
* AI Chat
* Production Deployment
* CI/CD

### 🚧 Sprint 6

* React Frontend
* Dashboard
* Resume Upload UI
* AI Chat Interface
* Responsive Design

### 🔮 Future Enhancements

* Job Matching
* Mock Interviews
* AI Interview Evaluation
* Career Analytics Dashboard
* Learning Recommendations

---

# Getting Started

```bash
git clone <repository-url>

cd TalentForge/server

npm install

cp .env.example .env

npm run dev
```

The backend connects to **Neon PostgreSQL**, **Qdrant Cloud**, and **Gemini** using environment variables.

---

# Live Demo

**Backend:** `https://talentforge-production-e94b.up.railway.app/api/v1/health`

---

# Author

**Vikas Verma**

If you found this project interesting or have suggestions for improvement, feel free to open an issue or connect with me on LinkedIn.
