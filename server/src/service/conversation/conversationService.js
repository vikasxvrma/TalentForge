import pool from "../../config/db.js";


//  * Create a new conversation for a user.

export async function createConversation(userId) {
    const query = `
        INSERT INTO conversations (user_id)
        VALUES ($1)
        RETURNING *;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows[0];
}


//  * Get a conversation only if it belongs to the authenticated user.
 
export async function getConversation(conversationId, userId) {
    const query = `
        SELECT *
        FROM conversations
        WHERE id = $1
        AND user_id = $2;
    `;

    const { rows } = await pool.query(query, [
        conversationId,
        userId
    ]);

    return rows[0] || null;
}


//  * Fetch all conversations for a user.

export async function listUserConversations(userId) {
    const query = `
        SELECT *
        FROM conversations
        WHERE user_id = $1
        ORDER BY updated_at DESC;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
}



//  * Update the conversation's last activity time.

export async function touchConversation(conversationId) {
    const query = `
        UPDATE conversations
        SET updated_at = NOW()
        WHERE id = $1;
    `;

    await pool.query(query, [conversationId]);
}