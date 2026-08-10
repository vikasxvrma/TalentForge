import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export default function useInterviewRecorder() {
  // =====================================================
  // SPEECH RECOGNITION
  // =====================================================

  const recognitionRef = useRef(null);

  // Stores confirmed speech only
  const finalTranscriptRef = useRef("");

  // =====================================================
  // SPEECH RECOGNITION LATENCY
  // =====================================================

  const recognitionStartedAtRef = useRef(null);

  const firstResultAtRef = useRef(null);

  const finalResultAtRef = useRef(null);

  // =====================================================
  // INTERRUPTION / VAD
  // =====================================================

  const microphoneStreamRef = useRef(null);

  const audioContextRef = useRef(null);

  const analyserRef = useRef(null);

  const animationFrameRef = useRef(null);

  const interruptionCallbackRef = useRef(null);

  const speechStartedAtRef = useRef(null);

  const lastInterruptionAtRef = useRef(0);

  const interruptionEnabledRef = useRef(false);

  /*
   * Keeps the latest detectSpeech callback available
   * without creating a declaration cycle.
   */
  const detectSpeechRef = useRef(null);

  // =====================================================
  // STATE
  // =====================================================

  const [isRecording, setIsRecording] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  // =====================================================
  // BROWSER SUPPORT
  // =====================================================

  const supported =
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window ||
      "webkitSpeechRecognition" in window);

  // =====================================================
  // VAD CONFIG
  // =====================================================

  const SPEECH_THRESHOLD = 0.035;

  const SPEECH_CONFIRMATION_MS = 140;

  const INTERRUPTION_COOLDOWN_MS = 1000;

  // =====================================================
  // RMS / VOLUME
  // =====================================================

  const calculateRms = useCallback(
    (dataArray) => {
      let sum = 0;

      for (
        let i = 0;
        i < dataArray.length;
        i++
      ) {
        const normalized =
          (dataArray[i] - 128) / 128;

        sum +=
          normalized * normalized;
      }

      return Math.sqrt(
        sum / dataArray.length,
      );
    },
    [],
  );

  // =====================================================
  // SPEECH DETECTION LOOP
  // =====================================================

  const detectSpeech = useCallback(() => {
    if (
      !interruptionEnabledRef.current ||
      !analyserRef.current
    ) {
      return;
    }

    const analyser =
      analyserRef.current;

    const dataArray =
      new Uint8Array(
        analyser.fftSize,
      );

    analyser.getByteTimeDomainData(
      dataArray,
    );

    const volume =
      calculateRms(dataArray);

    const now = performance.now();

    if (
      volume >= SPEECH_THRESHOLD
    ) {
      if (
        speechStartedAtRef.current ===
        null
      ) {
        speechStartedAtRef.current =
          now;
      }

      const speechDuration =
        now -
        speechStartedAtRef.current;

      if (
        speechDuration >=
        SPEECH_CONFIRMATION_MS
      ) {
        const timeSinceLastInterruption =
          now -
          lastInterruptionAtRef.current;

        if (
          timeSinceLastInterruption >=
          INTERRUPTION_COOLDOWN_MS
        ) {
          lastInterruptionAtRef.current =
            now;

          speechStartedAtRef.current =
            null;

          const callback =
            interruptionCallbackRef.current;

          if (callback) {
            callback();
          }
        }
      }
    } else {
      speechStartedAtRef.current =
        null;
    }

    animationFrameRef.current =
      requestAnimationFrame(() => {
        detectSpeechRef.current?.();
      });
  }, [calculateRms]);

  // Keep the ref synchronized with the latest callback.
  useEffect(() => {
    detectSpeechRef.current =
      detectSpeech;
  }, [detectSpeech]);

  // =====================================================
  // START INTERRUPTION DETECTION
  // =====================================================

  const startInterruptionDetection =
    useCallback(
      async ({
        onSpeechStart,
      } = {}) => {
        /*
         * Already running.
         */
        if (
          microphoneStreamRef.current
        ) {
          interruptionCallbackRef.current =
            onSpeechStart;

          interruptionEnabledRef.current =
            true;

          return true;
        }

        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices
            .getUserMedia
        ) {
          console.warn(
            "Microphone monitoring is not supported.",
          );

          return false;
        }

        try {
          const stream =
            await navigator.mediaDevices.getUserMedia(
              {
                audio: {
                  echoCancellation: true,
                  noiseSuppression: true,
                  autoGainControl: true,
                },
              },
            );

          microphoneStreamRef.current =
            stream;

          const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

          if (!AudioContext) {
            console.warn(
              "Web Audio API is not supported.",
            );

            stream
              .getTracks()
              .forEach((track) =>
                track.stop(),
              );

            microphoneStreamRef.current =
              null;

            return false;
          }

          const audioContext =
            new AudioContext();

          audioContextRef.current =
            audioContext;

          if (
            audioContext.state ===
            "suspended"
          ) {
            try {
              await audioContext.resume();
            } catch {
              // Ignore resume failure.
            }
          }

          const source =
            audioContext.createMediaStreamSource(
              stream,
            );

          const analyser =
            audioContext.createAnalyser();

          analyser.fftSize = 512;

          analyser.smoothingTimeConstant =
            0.75;

          source.connect(analyser);

          analyserRef.current =
            analyser;

          interruptionCallbackRef.current =
            onSpeechStart;

          interruptionEnabledRef.current =
            true;

          speechStartedAtRef.current =
            null;

          lastInterruptionAtRef.current =
            0;

          if (
            animationFrameRef.current
          ) {
            cancelAnimationFrame(
              animationFrameRef.current,
            );
          }

          animationFrameRef.current =
            requestAnimationFrame(() => {
              detectSpeechRef.current?.();
            });

          return true;
        } catch (error) {
          console.error(
            "Failed to start microphone monitoring:",
            error,
          );

          interruptionEnabledRef.current =
            false;

          interruptionCallbackRef.current =
            null;

          return false;
        }
      },
      [],
    );

  // =====================================================
  // STOP INTERRUPTION DETECTION
  // =====================================================

  const stopInterruptionDetection =
    useCallback(() => {
      interruptionEnabledRef.current =
        false;

      interruptionCallbackRef.current =
        null;

      speechStartedAtRef.current =
        null;

      if (
        animationFrameRef.current
      ) {
        cancelAnimationFrame(
          animationFrameRef.current,
        );

        animationFrameRef.current =
          null;
      }

      if (
        audioContextRef.current
      ) {
        try {
          audioContextRef.current.close();
        } catch {
          // Ignore cleanup errors.
        }

        audioContextRef.current =
          null;
      }

      if (
        microphoneStreamRef.current
      ) {
        microphoneStreamRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        microphoneStreamRef.current =
          null;
      }

      analyserRef.current =
        null;
    }, []);

  // =====================================================
  // START RECORDING
  // =====================================================

  const startRecording =
    useCallback(() => {
      if (!supported) {
        alert(
          "Speech recognition is not supported in this browser.",
        );

        return;
      }

      /*
       * VAD is only required while AI is speaking.
       * Once recording begins, SpeechRecognition takes over.
       */
      stopInterruptionDetection();

      /*
       * Prevent multiple recognition instances.
       */
      if (
        recognitionRef.current
      ) {
        return;
      }

      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      const recognition =
        new SpeechRecognition();

      recognition.continuous = true;

      recognition.interimResults = true;

      recognition.lang = "en-US";

      finalTranscriptRef.current =
        "";

      setTranscript("");

      // =================================================
      // RESET STT LATENCY METRICS
      // =================================================

      recognitionStartedAtRef.current =
        null;

      firstResultAtRef.current =
        null;

      finalResultAtRef.current =
        null;

      // =================================================
      // Recognition started
      // =================================================

      recognition.onstart = () => {
        recognitionStartedAtRef.current =
          performance.now();

        firstResultAtRef.current =
          null;

        finalResultAtRef.current =
          null;

        setIsRecording(true);

        console.info(
          "[TalentForge STT]",
          {
            event:
              "recognition_started",
          },
        );
      };

      // =================================================
      // Recognition result
      // =================================================

      recognition.onresult = (
        event,
      ) => {
        let interimTranscript =
          "";

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {
          const result =
            event.results[i];

          const text =
            result[0].transcript;

          if (
            result.isFinal
          ) {
            if (
              firstResultAtRef.current ===
              null
            ) {
              firstResultAtRef.current =
                performance.now();

              if (
                recognitionStartedAtRef.current !==
                null
              ) {
                const timeToFirstResultMs =
                  Math.round(
                    firstResultAtRef.current -
                      recognitionStartedAtRef.current,
                  );

                console.info(
                  "[TalentForge STT]",
                  {
                    event:
                      "first_final_result",
                    timeToFirstResultMs,
                  },
                );
              }
            }

            finalTranscriptRef.current +=
              ` ${text}`;

            finalResultAtRef.current =
              performance.now();
          } else {
            interimTranscript +=
              text;
          }
        }

        const finalText =
          finalTranscriptRef.current.trim();

        const displayText =
          `${finalText} ${interimTranscript}`.trim();

        setTranscript(
          displayText,
        );
      };

      // =================================================
      // Recognition error
      // =================================================

      recognition.onerror = (
        event,
      ) => {
        console.error(
          "Speech recognition error:",
          event.error,
        );

        setIsRecording(false);

        recognitionRef.current =
          null;
      };

      // =================================================
      // Recognition ended
      // =================================================

      recognition.onend = () => {
        const recognitionEndedAt =
          performance.now();

        const recognitionStartedAt =
          recognitionStartedAtRef.current;

        let sttLatency = null;

        if (
          recognitionStartedAt !==
          null
        ) {
          sttLatency = {
            timeToFirstResultMs:
              firstResultAtRef.current !==
              null
                ? Math.round(
                    firstResultAtRef.current -
                      recognitionStartedAt,
                  )
                : null,

            finalResultLatencyMs:
              finalResultAtRef.current !==
              null
                ? Math.round(
                    finalResultAtRef.current -
                      recognitionStartedAt,
                  )
                : null,

            recognitionDurationMs:
              Math.round(
                recognitionEndedAt -
                  recognitionStartedAt,
              ),
          };
        }

        console.info(
          "[TalentForge STT Latency]",
          sttLatency,
        );

        setIsRecording(false);

        recognitionRef.current =
          null;

        setTranscript(
          finalTranscriptRef.current.trim(),
        );
      };

      recognitionRef.current =
        recognition;

      try {
        recognition.start();
      } catch (error) {
        console.error(
          "Failed to start speech recognition:",
          error,
        );

        recognitionRef.current =
          null;

        setIsRecording(false);
      }
    }, [
      supported,
      stopInterruptionDetection,
    ]);

  // =====================================================
  // STOP RECORDING
  // =====================================================

  const stopRecording =
    useCallback(() => {
      if (
        !recognitionRef.current
      ) {
        setIsRecording(false);
        return;
      }

      try {
        recognitionRef.current.stop();
      } catch {
        // Recognition may already be stopping.
      }

      recognitionRef.current =
        null;

      setIsRecording(false);
    }, []);

  // =====================================================
  // CLEAR TRANSCRIPT
  // =====================================================

  const clearTranscript =
    useCallback(() => {
      finalTranscriptRef.current =
        "";

      setTranscript("");
    }, []);

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      if (
        recognitionRef.current
      ) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore cleanup errors.
        }

        recognitionRef.current =
          null;
      }

      stopInterruptionDetection();
    };
  }, [
    stopInterruptionDetection,
  ]);

  // =====================================================
  // RETURN
  // =====================================================

  return {
    supported,

    isRecording,
    transcript,

    startRecording,
    stopRecording,
    clearTranscript,

    startInterruptionDetection,
    stopInterruptionDetection,
  };
}