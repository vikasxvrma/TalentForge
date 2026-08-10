import { useCallback, useEffect, useState } from "react";

export default function useInterviewEnvironment() {
  const [isFullscreen, setIsFullscreen] = useState(
    Boolean(document.fullscreenElement),
  );

  const [microphoneStatus, setMicrophoneStatus] =
    useState("checking");

  const [microphoneError, setMicrophoneError] =
    useState("");

  // ---------------------------------------
  // Fullscreen state
  // ---------------------------------------

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange,
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      );
    };
  }, []);

  // ---------------------------------------
  // Check microphone
  // ---------------------------------------

  useEffect(() => {
    let mounted = true;

    const checkMicrophone = async () => {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        if (mounted) {
          setMicrophoneStatus("unsupported");
        }

        return;
      }

      try {
        if (
          navigator.permissions &&
          navigator.permissions.query
        ) {
          try {
            const permission =
              await navigator.permissions.query({
                name: "microphone",
              });

            if (!mounted) {
              return;
            }

            if (permission.state === "granted") {
              setMicrophoneStatus("granted");
              return;
            }

            if (permission.state === "denied") {
              setMicrophoneStatus("denied");
              return;
            }
          } catch {
            // Browser may not support microphone
            // permission querying.
          }
        }

        if (mounted) {
          setMicrophoneStatus("required");
        }
      } catch {
        if (mounted) {
          setMicrophoneStatus("required");
        }
      }
    };

    checkMicrophone();

    return () => {
      mounted = false;
    };
  }, []);

  // ---------------------------------------
  // Request microphone
  // ---------------------------------------

  const requestMicrophone = useCallback(async () => {
    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {
      setMicrophoneStatus("unsupported");
      return false;
    }

    try {
      setMicrophoneStatus("requesting");
      setMicrophoneError("");

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      stream.getTracks().forEach((track) => {
        track.stop();
      });

      setMicrophoneStatus("granted");

      return true;
    } catch (error) {
      console.error(
        "Microphone permission failed:",
        error,
      );

      setMicrophoneStatus("denied");

      setMicrophoneError(
        "Microphone access is required for the voice interview. " +
          "Please allow microphone access in your browser settings.",
      );

      return false;
    }
  }, []);

  // ---------------------------------------
  // Enter fullscreen
  // ---------------------------------------

  const enterFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }

      return true;
    } catch (error) {
      console.error(
        "Failed to enter fullscreen:",
        error,
      );

      return false;
    }
  }, []);

  // ---------------------------------------
  // Exit fullscreen
  // ---------------------------------------

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Failed to exit fullscreen:",
        error,
      );
    }
  }, []);

  // ---------------------------------------
  // Environment readiness
  // ---------------------------------------

  const environmentReady =
    isFullscreen &&
    microphoneStatus === "granted";

  return {
    isFullscreen,

    microphoneStatus,
    microphoneError,

    environmentReady,

    enterFullscreen,
    exitFullscreen,
    requestMicrophone,
  };
}