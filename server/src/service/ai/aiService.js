import ai from "../../config/gemini.js";
import config from "../../config/index.js";

const MODEL = config.gemini.chatModel;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateText(prompt) {

    const maxRetries = 3;
    console.log(prompt);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {

        try {

            const response = await ai.models.generateContent({
                model: MODEL,
                contents: prompt
            });

            return response.text;

        } catch (error) {

            const status = error.status;

            const retryable =
                status === 429 ||
                status === 503;

            if (!retryable || attempt === maxRetries) {
                throw error;
            }

            console.warn(
                `Gemini unavailable (${status}). Retry ${attempt}/${maxRetries}`
            );

            await sleep(1000 * Math.pow(2, attempt - 1));
        }
    }
}