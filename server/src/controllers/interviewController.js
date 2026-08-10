import { speakInterviewQuestion, speakInterviewText, startInterview, submitInterviewAnswer } from "../service/interview/interviewService.js";

export async function startInterviewController(req, res, next) {
  try {
    const userId = req.user.id;

    const {
      role,
      interviewType,
      difficulty,
      totalQuestions,
    } = req.body;

    const result = await startInterview({
      userId,
      role,
      interviewType,
      difficulty,
      totalQuestions,
    });

    return res.status(201).json({
      success: true,
      data: {
        session: result.session,
        question: result.question,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function submitInterviewAnswerController(
  req,
  res,
  next,
) {
  try {
    const userId = req.user.id;

    const { sessionId } = req.params;

    const {
      questionId,
      answer,
      interrupted,
    } = req.body;

    const result =
      await submitInterviewAnswer({
        userId,
        sessionId,
        questionId,
        answer,
        interrupted,
      });

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}



export async function speakInterviewQuestionController(
  req,
  res,
  next,
) {
  try {
    const userId = req.user.id;

    const { sessionId } = req.params;
    const { questionId } = req.body;


    const result = await speakInterviewQuestion({
      userId,
      sessionId,
      questionId,
    });

    res.set({
      "Content-Type": "audio/webm;codecs=opus",
      "Cache-Control": "no-store",
    });

    return res.send(result.audio);
  } catch (error) {
    next(error);
  }
}
export async function speakInterviewTextController(
  req,
  res,
  next,
) {
  try {
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required.",
      });
    }

    const result =
      await speakInterviewText(text);

    res.set({
      "Content-Type": "audio/webm;codecs=opus",
      "Cache-Control": "no-store",
    });

    return res.send(result.audio);
  } catch (error) {
    next(error);
  }
}