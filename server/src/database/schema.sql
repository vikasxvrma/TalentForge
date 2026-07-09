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

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

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

-- ==========================
-- INDEXES
-- ==========================

CREATE INDEX IF NOT EXISTS idx_users_email
ON users(email);

CREATE INDEX IF NOT EXISTS idx_conversations_user
ON conversations(user_id);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
ON messages(conversation_id);