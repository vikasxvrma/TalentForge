import pool from "../../config/db.js";

/**
 * Save a message to a conversation.
 */
export async function createMessage({ conversationId, role, content }) {
  const query = `
        INSERT INTO messages (
            conversation_id,
            role,
            content
        )
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

  const { rows } = await pool.query(query, [conversationId, role, content]);

  return rows[0];
}

/**
 * Fetch all messages for a conversation.
 */
export async function getConversationMessages({ conversationId, userId }) {
  const query = `
        SELECT
    m.id,
    m.role,
    m.content,
    m.created_at
    FROM messages m
    JOIN conversations c
    ON c.id = m.conversation_id
    WHERE
    m.conversation_id = $1
    AND
    c.user_id = $2
    ORDER BY m.created_at;
    `;

  const { rows } = await pool.query(query, [conversationId,userId]);

  return rows;
}
