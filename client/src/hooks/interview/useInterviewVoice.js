import { useEffect, useRef, useState } from "react";

import {
  getInterviewQuestionAudio,
  speakInterviewText,
} from "../../api/interviewApi";

export default function useInterviewVoice() {
  const audioRef = useRef(null);
  const objectUrlRef = useRef(null);

  /*
   * Every new speech operation gets a unique id.
   *
   * This protects us from race conditions when:
   *
   * AI starts speaking
   *      ↓
   * user interrupts
   *      ↓
   * old API request finishes
   *      ↓
   * old audio tries to play
   */
  const speechOperationRef = useRef(0);

  /*
   * Used to resolve the promise returned by
   * playAudioBlob() when audio is manually interrupted.
   */
  const playbackResolverRef = useRef(null);

  const [isSpeaking, setIsSpeaking] = useState(false);

  // =====================================================
  // CLEANUP AUDIO
  // =====================================================

  const cleanupAudio = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.onpause = null;

      try {
        audio.pause();
      } catch {
        // Ignore cleanup errors.
      }

      audio.currentTime = 0;

      audioRef.current = null;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current,
      );

      objectUrlRef.current = null;
    }
  };

  // =====================================================
  // PLAY AUDIO BLOB
  // =====================================================

  const playAudioBlob = (
    blob,
    operationId,
    metrics = {},
  ) => {
    return new Promise(async (resolve, reject) => {
      /*
       * If this operation was already cancelled while
       * the audio was being fetched, don't play it.
       */
      if (
        operationId !==
        speechOperationRef.current
      ) {
        resolve();
        return;
      }

      const audioPreparationStart =
        performance.now();

      const audioUrl =
        URL.createObjectURL(blob);

      objectUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);

      audioRef.current = audio;

      const audioPreparationMs = Math.round(
        performance.now() -
          audioPreparationStart,
      );

      let settled = false;

      /*
       * Total voice lifecycle starts when the API
       * request starts.
       */
      const requestStart =
        metrics.requestStart ||
        performance.now();

      const finish = () => {
        if (settled) {
          return;
        }

        settled = true;

        if (
          playbackResolverRef.current ===
          finish
        ) {
          playbackResolverRef.current =
            null;
        }

        const playbackEnd =
          performance.now();

        const playbackDurationMs =
          metrics.playbackStart
            ? Math.round(
                playbackEnd -
                  metrics.playbackStart,
              )
            : 0;

        const totalVoiceMs = Math.round(
          playbackEnd - requestStart,
        );

        const latency = {
          requestMs:
            metrics.responseReceived
              ? Math.round(
                  metrics.responseReceived -
                    requestStart,
                )
              : null,

          responseToPlaybackMs:
            metrics.playbackStart &&
            metrics.responseReceived
              ? Math.round(
                  metrics.playbackStart -
                    metrics.responseReceived,
                )
              : null,

          audioPreparationMs,

          timeToPlaybackMs:
            metrics.playbackStart
              ? Math.round(
                  metrics.playbackStart -
                    requestStart,
                )
              : null,

          playbackDurationMs,

          totalVoiceMs,
        };

        console.info(
          "[TalentForge Voice Latency]",
          latency,
        );

        cleanupAudio();

        /*
         * Only the current speech operation is allowed
         * to modify the speaking state.
         */
        if (
          operationId ===
          speechOperationRef.current
        ) {
          setIsSpeaking(false);
        }

        resolve(latency);
      };

      const fail = (error) => {
        if (settled) {
          return;
        }

        settled = true;

        if (
          playbackResolverRef.current ===
          finish
        ) {
          playbackResolverRef.current =
            null;
        }

        cleanupAudio();

        if (
          operationId ===
          speechOperationRef.current
        ) {
          setIsSpeaking(false);
        }

        reject(error);
      };

      playbackResolverRef.current = finish;

      /*
       * IMPORTANT:
       *
       * We resolve only when the audio has ACTUALLY
       * finished playing.
       */
      audio.onended = finish;

      audio.onerror = () => {
        fail(
          new Error(
            "Interview audio playback failed.",
          ),
        );
      };

      try {
        /*
         * Make sure the operation is still current
         * immediately before starting playback.
         */
        if (
          operationId !==
          speechOperationRef.current
        ) {
          finish();
          return;
        }

        const playbackStart =
          performance.now();

        /*
         * Store playback start so we can calculate
         * time-to-first-playback and playback duration.
         */
        metrics.playbackStart =
          playbackStart;

        await audio.play();

        /*
         * Browser audio.play() resolves once playback
         * has successfully started.
         *
         * This is our closest browser-side measurement
         * of first audio playback.
         */
        console.info(
          "[TalentForge Voice Playback]",
          {
            timeToPlaybackMs:
              Math.round(
                playbackStart -
                  requestStart,
              ),
          },
        );
      } catch (error) {
        fail(error);
      }
    });
  };

  // =====================================================
  // SPEAK INTERVIEW QUESTION
  // =====================================================

  const speakQuestion = async ({
    sessionId,
    questionId,
  }) => {
    /*
     * Cancel whatever is currently speaking and create
     * a completely new speech operation.
     */
    stopSpeaking();

    const operationId =
      speechOperationRef.current;

    const requestStart =
      performance.now();

    try {
      setIsSpeaking(true);

      const blob =
        await getInterviewQuestionAudio({
          sessionId,
          questionId,
        });

      const responseReceived =
        performance.now();

      /*
       * The user may have interrupted us while the
       * backend was generating/fetching the audio.
       */
      if (
        operationId !==
        speechOperationRef.current
      ) {
        return;
      }

      /*
       * This waits for ACTUAL audio completion.
       */
      const latency =
        await playAudioBlob(
          blob,
          operationId,
          {
            requestStart,
            responseReceived,
          },
        );

      console.info(
        "[TalentForge Question Voice Latency]",
        {
          sessionId,
          questionId,
          ...latency,
        },
      );

      return latency;
    } catch (error) {
      /*
       * An interrupted operation should not be treated
       * as a real playback failure.
       */
      if (
        operationId !==
        speechOperationRef.current
      ) {
        return;
      }

      console.error(
        "Failed to play interview question:",
        error,
      );

      setIsSpeaking(false);

      throw error;
    }
  };

  // =====================================================
  // SPEAK STATIC INTERVIEW TEXT
  // =====================================================

  const speakText = async (text) => {
    if (!text?.trim()) {
      return;
    }

    /*
     * Cancel any previous audio first.
     */
    stopSpeaking();

    const operationId =
      speechOperationRef.current;

    const requestStart =
      performance.now();

    try {
      setIsSpeaking(true);

      const blob =
        await speakInterviewText(text);

      const responseReceived =
        performance.now();

      /*
       * The user may have interrupted the welcome
       * while the backend was generating the audio.
       */
      if (
        operationId !==
        speechOperationRef.current
      ) {
        return;
      }

      const latency =
        await playAudioBlob(
          blob,
          operationId,
          {
            requestStart,
            responseReceived,
          },
        );

      console.info(
        "[TalentForge Welcome Voice Latency]",
        latency,
      );

      return latency;
    } catch (error) {
      if (
        operationId !==
        speechOperationRef.current
      ) {
        return;
      }

      console.error(
        "Failed to play interview text:",
        error,
      );

      setIsSpeaking(false);

      throw error;
    }
  };

  // =====================================================
  // STOP SPEAKING
  // =====================================================

  const stopSpeaking = () => {
    /*
     * Invalidate the current operation FIRST.
     */
    speechOperationRef.current += 1;

    /*
     * Resolve the currently waiting playback promise.
     */
    if (playbackResolverRef.current) {
      const resolver =
        playbackResolverRef.current;

      playbackResolverRef.current = null;

      resolver();
    }

    cleanupAudio();

    setIsSpeaking(false);
  };

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      speechOperationRef.current += 1;

      if (playbackResolverRef.current) {
        const resolver =
          playbackResolverRef.current;

        playbackResolverRef.current = null;

        resolver();
      }

      cleanupAudio();
    };
  }, []);

  return {
    isSpeaking,
    speakQuestion,
    speakText,
    stopSpeaking,
  };
}