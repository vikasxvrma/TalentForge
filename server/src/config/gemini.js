import 'dotenv/config'; // Ensures environment variables are loaded first
import { GoogleGenAI } from "@google/genai";
import logger from './logger.js';
import config from './index.js';
// Create the client using 'new'
const ai = new GoogleGenAI({
    apiKey: config.gemini.apiKey,
});

logger.info ("🚀 Gemini Connected successfully");

export default ai;