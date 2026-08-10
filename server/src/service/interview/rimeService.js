import config from "../../config/index.js";
import AppError from "../../errors/AppError.js";
import logger from "../../config/logger.js";

const RIME_URL = "https://users.rime.ai/v1/rime-tts";

export async function generateInterviewSpeech(text) {
  if (!text?.trim()) {
    throw new AppError(
      "Text is required for speech generation.",
      400,
    );
  }

  const start = Date.now();

  try {
    const response = await fetch(RIME_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${config.rime.apiKey}`,
        "Content-Type": "application/json",
        Accept: "audio/webm;codecs=opus",
      },

      body: JSON.stringify({
        text: text.trim(),
        modelId: config.rime.model,
        speaker: config.rime.speaker,
        lang: "en",
        samplingRate: 24000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      logger.error(
        {
          status: response.status,
          error: errorText,
        },
        "Rime TTS request failed",
      );

      throw new AppError(
        "Voice generation failed.",
        502,
      );
    }

    const audioBuffer = Buffer.from(
      await response.arrayBuffer(),
    );

    logger.info(
      {
        duration: Date.now() - start,
        audioBytes: audioBuffer.length,
      },
      "Rime TTS completed",
    );

    return audioBuffer;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    logger.error(
      error,
      "Unexpected Rime TTS error",
    );

    throw new AppError(
      "Voice generation unavailable.",
      502,
    );
  }
}

