import ai from "../../config/gemini.js";
import config from "../../config/index.js";
import logger from "../../config/logger.js";
import AppError from "../../errors/AppError.js";

const MODEL = config.gemini.chatModel;

const MAX_RETRIES = 3;

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/*
 * Gemini can return a retry delay in its error details.
 * If available, prefer that over our own estimate.
 */
function getRetryDelay(error, attempt) {
  const retryDelay =
    error?.details?.find?.(
      (detail) =>
        detail["@type"]?.includes(
          "RetryInfo",
        ),
    )?.retryDelay;

  if (retryDelay) {
    const seconds = Number.parseFloat(
      String(retryDelay).replace("s", ""),
    );

    if (Number.isFinite(seconds)) {
      return Math.min(
        seconds * 1000,
        30000,
      );
    }
  }

  /*
   * Exponential backoff + jitter.
   *
   * 1st retry: ~1s
   * 2nd retry: ~2s
   * 3rd retry: ~4s
   */
  const baseDelay =
    1000 * Math.pow(2, attempt - 1);

  const jitter =
    Math.floor(Math.random() * 300);

  return Math.min(
    baseDelay + jitter,
    30000,
  );
}

function getErrorStatus(error) {
  return (
    error?.status ??
    error?.response?.status ??
    error?.code
  );
}

function isRetryable(status) {
  return (
    status === 429 ||
    status === 500 ||
    status === 502 ||
    status === 503 ||
    status === 504
  );
}

export async function generateText(prompt) {
  if (!prompt?.trim()) {
    throw new AppError(
      "AI prompt cannot be empty.",
      400,
    );
  }

  logger.info({
    model: MODEL,
    promptLength: prompt.length,
    msg: "Generating AI response",
  });

  for (
    let attempt = 1;
    attempt <= MAX_RETRIES;
    attempt++
  ) {
    try {
      const response =
        await ai.models.generateContent({
          model: MODEL,
          contents: prompt,
        });

      const text = response?.text;

      if (!text?.trim()) {
        throw new AppError(
          "AI returned an empty response.",
          502,
        );
      }

      return text;
    } catch (error) {
      const status =
        getErrorStatus(error);

      const retryable =
        isRetryable(status);

      /*
       * Do not retry errors such as:
       *
       * 400 → invalid request
       * 401/403 → authentication/permission
       * 404 → model not found
       *
       * These require an actual configuration/code fix.
       */
      if (
        !retryable ||
        attempt === MAX_RETRIES
      ) {
        logger.error(
          {
            status,
            model: MODEL,
            attempt,
            error:
              error?.message,
          },
          "Gemini request failed",
        );

        /*
         * Preserve the fact that this is a rate-limit
         * problem instead of disguising it as 503.
         */
        if (status === 429) {
          throw new AppError(
            "AI rate limit exceeded. Please try again shortly.",
            429,
          );
        }

        throw new AppError(
          "AI service unavailable.",
          503,
        );
      }

      const delay =
        getRetryDelay(
          error,
          attempt,
        );

      logger.warn(
        {
          status,
          model: MODEL,
          attempt,
          maxRetries: MAX_RETRIES,
          retryInMs: delay,
        },
        "Retrying Gemini request",
      );

      await sleep(delay);
    }
  }

  throw new AppError(
    "AI service unavailable.",
    503,
  );
}