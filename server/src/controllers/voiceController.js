import {
  generateInterviewSpeech,
} from "../service/interview/rimeService.js";

export async function testInterviewVoiceController(
  req,
  res,
  next,
) {
  try {
    const { text } = req.body;

    const audio =
      await generateInterviewSpeech(text);

    res.set({
      "Content-Type": "audio/webm;codecs=opus",
      "Content-Length": audio.length,
      "Cache-Control": "no-store",
    });

    return res.send(audio);
  } catch (error) {
    next(error);
  }
}