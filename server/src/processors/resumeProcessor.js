import logger from "../config/logger.js";
import { processResumeService } from "../service/resume/processResumeService.js";

export async function resumeProcessor(job) {
  const { resumeId } = job.data;

  logger.info(
    {
      jobId: job.id,
      resumeId,
    },
    "Processing resume job"
  );

  try {
    const resume = await processResumeService(resumeId);

    logger.info(
      {
        jobId: job.id,
        resumeId,
        userId: resume.user_id,
        documentType: "resume",
      },
      "Resume processing completed"
    );
  } catch (error) {
    logger.error(
      {
        jobId: job.id,
        resumeId,
        error,
      },
      "Resume processing failed"
    );

    throw error;
  }
}