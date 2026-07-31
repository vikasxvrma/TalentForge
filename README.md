# TalentForge 🚀

**TalentForge** is an AI-powered career intelligence platform that helps users transform their resumes into an intelligent career workspace. Using Retrieval-Augmented Generation (RAG), semantic search, and Large Language Models, TalentForge enables users to chat with their resumes, receive personalized career guidance, and prepare for interviews through a modern AI-powered interface.

> **Status:** ✅ TalentForge V1 is live with a production-ready backend and a fully responsive React frontend.

---

# Features

## 🤖 AI Career Workspace

- 💬 AI-powered career conversations
- 📄 Resume Question Answering (RAG)
- 🧠 Context-aware semantic retrieval
- 💭 Multi-turn conversation history
- ✨ Markdown & syntax-highlighted AI responses

## 📄 Resume Intelligence

- Resume Upload
- PDF Parsing
- Intelligent Text Chunking
- Gemini Embedding Generation
- Vector Search with Qdrant
- Resume Processing Pipeline
- Resume Status Tracking

## 🔐 Authentication

- Google OAuth Login
- JWT Authentication
- Secure Protected Routes
- Session Restoration

## 🎨 Modern Frontend

- Responsive Dashboard
- AI Chat Workspace
- Resume Management
- Light & Dark Theme
- Mobile Navigation
- Optimistic UI Updates
- Real-time Resume Status

## ⚙️ Infrastructure

- Production Deployment (Railway + Vercel)
- Continuous Integration (GitHub Actions)
- Docker Development Environment
- Cloud Storage (AWS S3)
- Background Job Processing (BullMQ + Redis)

---

# Tech Stack

## Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Lucide React
- React Markdown

---

## Backend

- Node.js
- Express.js
- PostgreSQL (Neon)
- Qdrant Cloud
- Google Gemini
- LangChain
- JWT
- Google OAuth
- BullMQ
- Redis
- AWS S3
- Zod
- Pino Logger

---

## DevOps

- Railway
- Vercel
- GitHub Actions
- Docker
- Docker Compose

---

# System Architecture

```text
                     ┌────────────────────────┐
                     │    React Frontend      │
                     │        (Vercel)        │
                     └────────────┬───────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │ Express Backend API    │
                     │       (Railway)        │
                     └────────────┬───────────┘
                                  │
          ┌──────────────┬─────────┼───────────────┬──────────────┐
          ▼              ▼         ▼               ▼              ▼
   Neon PostgreSQL   Qdrant    Gemini API      AWS S3      Redis/BullMQ
```

---

# Project Structure

```text
TalentForge/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── hooks/
│   │   ├── providers/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── workers/
│   │   └── utils/
│   │
│   ├── Dockerfile
│   └── package.json
│
└── .github/
    └── workflows/
        ├── backend-ci.yml
        └── frontend-ci.yml
```

---

# Production Highlights

- ✅ Fully deployed production application
- ✅ Railway backend deployment
- ✅ Vercel frontend deployment
- ✅ Neon PostgreSQL
- ✅ Qdrant Cloud Vector Database
- ✅ AWS S3 Resume Storage
- ✅ BullMQ Background Workers
- ✅ Google Gemini Integration
- ✅ GitHub Actions CI
- ✅ Centralized Configuration & Validation
- ✅ Production Logging
- ✅ Responsive UI
- ✅ Dark / Light Theme

---

# Engineering Highlights

- Built an end-to-end Retrieval-Augmented Generation (RAG) pipeline.
- Designed a multi-user vector retrieval architecture with isolated resume embeddings.
- Implemented optimistic UI updates for AI conversations.
- Built asynchronous resume processing using BullMQ workers.
- Migrated local infrastructure to managed cloud services (Neon, Qdrant Cloud, Railway).
- Integrated AWS S3 using secure pre-signed uploads.
- Implemented Google OAuth authentication with JWT session management.
- Designed a responsive AI workspace supporting desktop and mobile devices.
- Established CI pipelines for both frontend and backend using GitHub Actions.

---

# Roadmap

## ✅ Version 1.0

- Google Authentication
- Resume Upload
- Resume Processing
- Semantic Search
- RAG Chat
- AI Career Assistant
- Conversation History
- Responsive Dashboard
- Theme Switching
- Production Deployment

---

## 🚀 Version 2.0

- Job Description Matching
- Resume ATS Score
- Resume Improvement Suggestions
- Mock Interviews
- AI Interview Evaluation
- Interview Analytics
- Learning Roadmaps
- Skill Gap Analysis

---

# Local Development

## Clone Repository

```bash
git clone https://github.com/vikasxvrma/talentforge.git

cd TalentForge
```

---

## Backend

```bash
cd server

npm install

cp .env.example .env

npm run dev
```

---

## Frontend

```bash
cd client

npm install

cp .env.example .env

npm run dev
```

---

# Environment

Backend requires:

- PostgreSQL
- Redis
- AWS S3
- Google Gemini API
- Google OAuth
- Qdrant Cloud

Frontend requires:

- Backend API URL
- Google Client ID

---

# Live Demo

🌐 **Frontend**

> https://talent-forge-dusky.vercel.app/

⚙️ **Backend API**

> https://talentforge-production-e94b.up.railway.app

---

# Screenshots

> <img width="1920" height="1080" alt="Screenshot (584)" src="https://github.com/user-attachments/assets/f670c51e-a812-45af-9534-de44622ce7d2" />
> <img width="1920" height="1080" alt="Screenshot (585)" src="https://github.com/user-attachments/assets/2d010f50-6089-45fe-9a93-e76c400c9455" />
> <img width="1920" height="1080" alt="Screenshot (586)" src="https://github.com/user-attachments/assets/f56c5883-5dd8-4612-bf6d-f979c48260e8" />




---

# Author

**Vikas Verma**

If you found this project interesting, feel free to ⭐ the repository and connect with me on LinkedIn.
