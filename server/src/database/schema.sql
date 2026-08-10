-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================
-- USERS
-- ==========================

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    picture TEXT,

    provider TEXT NOT NULL,
    provider_id TEXT NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT NOW()
);

-- ==========================
-- CONVERSATIONS
-- ==========================

CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    title TEXT NOT NULL DEFAULT 'New Conversation',

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);

-- ==========================
-- MESSAGES
-- ==========================

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    conversation_id UUID NOT NULL
        REFERENCES conversations(id)
        ON DELETE CASCADE,

    role TEXT NOT NULL,

    content TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW()
);
=============================
RESUMES
============================
CREATE TABLE IF NOT EXISTS resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    file_name TEXT NOT NULL,

    object_key TEXT NOT NULL,

    mime_type TEXT NOT NULL,

    file_size BIGINT NOT NULL,

    status TEXT NOT NULL DEFAULT 'UPLOADED',

    processed_at TIMESTAMP,

    failed_reason TEXT,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW()
);

-- =========================================
-- MOCK INTERVIEW
-- =========================================

CREATE TABLE IF NOT EXISTS interview_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    role TEXT NOT NULL,
    interview_type TEXT NOT NULL DEFAULT 'technical',
    difficulty TEXT NOT NULL DEFAULT 'medium',

    total_questions INTEGER NOT NULL DEFAULT 5,
    current_question_number INTEGER NOT NULL DEFAULT 0,

    status TEXT NOT NULL DEFAULT 'IN_PROGRESS',

    started_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);


-- =========================================
-- INTERVIEW QUESTIONS
-- =========================================

CREATE TABLE IF NOT EXISTS interview_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    session_id UUID NOT NULL
        REFERENCES interview_sessions(id)
        ON DELETE CASCADE,

    question_number INTEGER NOT NULL,

    question_text TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE(session_id, question_number)
);


-- =========================================
-- INTERVIEW ANSWERS
-- =========================================

CREATE TABLE IF NOT EXISTS interview_answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    question_id UUID NOT NULL
        REFERENCES interview_questions(id)
        ON DELETE CASCADE,

    transcript TEXT NOT NULL,

    interrupted BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT NOW()
);


-- =========================================
-- INTERVIEW EVALUATIONS
-- =========================================

CREATE TABLE IF NOT EXISTS interview_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    answer_id UUID NOT NULL UNIQUE
        REFERENCES interview_answers(id)
        ON DELETE CASCADE,

    technical_score INTEGER,
    depth_score INTEGER,
    communication_score INTEGER,

    strengths TEXT,
    weaknesses TEXT,
    feedback TEXT,

    created_at TIMESTAMP DEFAULT NOW()
);



-- ==========================
-- INDEXES
-- ==========================

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_conversations_user
ON conversations(user_id);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
ON messages(conversation_id);

CREATE INDEX IF NOT EXISTS idx_resumes_user
ON resumes(user_id);

CREATE INDEX IF NOT EXISTS idx_resumes_status
ON resumes(status);

CREATE INDEX IF NOT EXISTS idx_interview_sessions_user
ON interview_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_interview_sessions_status
ON interview_sessions(status);

CREATE INDEX IF NOT EXISTS idx_interview_questions_session
ON interview_questions(session_id);

CREATE INDEX IF NOT EXISTS idx_interview_answers_question
ON interview_answers(question_id);

CREATE INDEX IF NOT EXISTS idx_interview_evaluations_answer
ON interview_evaluations(answer_id);