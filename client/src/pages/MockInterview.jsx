import { useState } from "react";

import {
  startInterview,
  submitInterviewAnswer,
} from "../api/interviewApi";

import useInterviewVoice from "../hooks/interview/useInterviewVoice";
import useInterviewRecorder from "../hooks/interview/useInterviewRecorder";
import useInterviewConfig from "../hooks/interview/useInterviewConfig";
import useInterviewEnvironment from "../hooks/interview/useInterviewEnvironment";

import InterviewHeader from "../components/interview/InterviewHeaders";
import InterviewIntro from "../components/interview/InterviewIntro";
import InterviewConfiguration from "../components/interview/InterviewConfiguration";
import AIInterviewerPanel from "../components/interview/AIInterviewPanel.jsx";
import InterviewQuestionPanel from "../components/interview/InterviewQuestionPanel.jsx";
import InterviewProgress from "../components/interview/InterviewProgress.jsx";
import InterviewEvaluation from "../components/interview/InterviewEvaluation";



const WELCOME_MESSAGE =
  "Hi, welcome to your TalentForge mock interview. " +
  "Take a moment to get comfortable. There's no need to rush — " +
  "think through your answers and explain your reasoning clearly. " +
  "We'll start with a simple question about your experience " +
  "and gradually move into more technical topics. " +
  "Take a breath, and when you're ready, let's begin.";

export default function MockInterview() {
  const [session, setSession] = useState(null);
  const [question, setQuestion] = useState(null);
  const [evaluation, setEvaluation] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const interviewConfig =
    useInterviewConfig();

  const environment =
    useInterviewEnvironment();

  const {
    isSpeaking,
    speakQuestion,
    stopSpeaking,
    speakText,
  } = useInterviewVoice();

  const {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
    startInterruptionDetection,
    stopInterruptionDetection,
  } = useInterviewRecorder();

  // =====================================================
  // START INTERVIEW
  // =====================================================

  const handleStartInterview = async () => {
    if (!environment.environmentReady) {
      return;
    }

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       *
       * Create the interview session FIRST.
       *
       * This prevents the user from waiting for the
       * welcome audio before the interview UI opens.
       */

      const response = await startInterview({
        role: interviewConfig.role,
        interviewType:
          interviewConfig.interviewType,
        difficulty:
          interviewConfig.difficulty,
        totalQuestions:
          interviewConfig.totalQuestions,
      });

      const data = response.data;

      /*
       * Open the interview immediately.
       */

      setSession(data.session);
      setQuestion(data.question);
      setEvaluation(null);
      setCompleted(false);

      setLoading(false);

      /*
       * Start listening for interruption.
       *
       * If the candidate starts talking while the AI is
       * speaking, the callback immediately stops the AI
       * and starts recording.
       */

      await startInterruptionDetection({
        onSpeechStart: () => {
          stopSpeaking();
          startRecording();
        },
      });

      /*
       * AI welcome.
       *
       * speakText() now waits until the audio has actually
       * finished before resolving.
       */

      await speakText(WELCOME_MESSAGE);

      /*
       * Only after the welcome has completely finished,
       * ask the first interview question.
       */

      await speakQuestion({
        sessionId: data.session.id,
        questionId: data.question.id,
      });
    } catch (error) {
      console.error(
        "Failed to start interview:",
        error,
      );

      setLoading(false);
    }
  };

  // =====================================================
  // MANUAL START / INTERRUPT
  // =====================================================

  const handleStartRecording = () => {
    /*
     * Manual interruption fallback.
     *
     * User can click Start Answer at any time.
     */

    stopSpeaking();
    stopInterruptionDetection();

    startRecording();
  };

  // =====================================================
  // STOP RECORDING
  // =====================================================

  const handleStopRecording = () => {
    stopRecording();
  };

  // =====================================================
  // SUBMIT ANSWER
  // =====================================================

  const handleSubmitAnswer = async () => {
    if (
      !transcript.trim() ||
      !session ||
      !question
    ) {
      return;
    }

    try {
      stopRecording();
      stopInterruptionDetection();
      stopSpeaking();

      setSubmitting(true);

      const response =
        await submitInterviewAnswer({
          sessionId: session.id,
          questionId: question.id,
          answer: transcript,
        });

      const data = response.data;

      setEvaluation(data.evaluation);

      // -----------------------------------------------
      // INTERVIEW COMPLETE
      // -----------------------------------------------

      if (data.completed) {
        setCompleted(true);
        return;
      }

      // -----------------------------------------------
      // NEXT QUESTION
      // -----------------------------------------------

      const nextQuestion =
        data.nextQuestion;

      setQuestion(nextQuestion);

      /*
       * Start interruption detection again because the
       * AI is about to speak.
       */

      await startInterruptionDetection({
        onSpeechStart: () => {
          stopSpeaking();
          startRecording();
        },
      });

      /*
       * Ask next question.
       */

      await speakQuestion({
        sessionId: session.id,
        questionId: nextQuestion.id,
      });
    } catch (error) {
      console.error(
        "Failed to submit answer:",
        error,
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =====================================================
  // SETUP
  // =====================================================

  if (!session) {
    return (
      <div className="h-[100dvh] overflow-hidden bg-background text-foreground">
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <InterviewHeader mode="setup" />

          <main className="min-h-0 flex-1 py-4 sm:py-5">
            <div className="grid h-full min-h-0 gap-4 lg:grid-cols-[0.85fr_1.15fr]">
              <InterviewIntro />

              <InterviewConfiguration
                config={interviewConfig}
                environment={environment}
                onStart={handleStartInterview}
                loading={loading}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =====================================================
  // COMPLETED
  // =====================================================

  if (completed) {
    return (
      <div className="h-[100dvh] overflow-y-auto bg-background text-foreground">
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
          <InterviewHeader
            mode="interview"
            role={
              session.role ||
              interviewConfig.role
            }
            interviewType={
              session.interview_type ||
              interviewConfig.interviewType
            }
          />

          <main className="flex min-h-0 flex-1 items-center justify-center py-6">
            <InterviewEvaluation
              evaluation={evaluation}
              final
            />
          </main>
        </div>
      </div>
    );
  }

  // =====================================================
  // ACTIVE INTERVIEW
  // =====================================================

  const role =
    session.role ||
    interviewConfig.role;

  const interviewType =
    session.interview_type ||
    interviewConfig.interviewType;

  const currentQuestion =
    question?.question_number || 0;

  const totalQuestions =
    session.total_questions ||
    interviewConfig.totalQuestions;

  return (
    <div className="h-[100dvh] overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <InterviewHeader
          mode="interview"
          role={role}
          interviewType={interviewType}
        />

        <main className="mt-3 min-h-0 flex-1 lg:mt-4">
          <div className="grid h-full min-h-0 gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
            <AIInterviewerPanel
              isSpeaking={isSpeaking}
              isRecording={isRecording}
              submitting={submitting}
              onStartRecording={
                handleStartRecording
              }
              onStopRecording={
                handleStopRecording
              }
            />

            <InterviewQuestionPanel
              question={question}
              interviewType={interviewType}
              transcript={transcript}
              isRecording={isRecording}
              submitting={submitting}
              onSubmit={handleSubmitAnswer}
            />
          </div>
        </main>

        <div className="mt-3 shrink-0 lg:mt-4">
          <InterviewProgress
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            submitting={submitting}
          />
        </div>

        {evaluation && !submitting && (
          <div className="mt-3 max-h-[116px] shrink-0 overflow-y-auto">
            <InterviewEvaluation
              evaluation={evaluation}
            />
          </div>
        )}
      </div>
    </div>
  );
}