import { useResume } from "../../hooks/useResume";
import ResumeEmpty from "./ResumeEmpty";
import ResumeFailed from "./ResumeFailed";
import ResumeProcessing from "./ResumeProcessing";
import ResumeReady from "./ResumeReady";
import CardSkeleteton from "../ui/CardSkeleteton";

export default function ResumeStatus() {
  const {
    resume,
    isPending,
    isError,
    error,
  } = useResume();

  if (isPending) {
    return <CardSkeleteton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
        <p className="text-sm text-red-300">
          {error?.message || "Failed to load your resume."}
        </p>
      </div>
    );
  }

  if (!resume) {
    return <ResumeEmpty />;
  }

  switch (resume.status) {
    case "UPLOADED":
    case "PROCESSING":
      return <ResumeProcessing resume={resume} />;

    case "COMPLETED":
      return <ResumeReady resume={resume} />;

    case "FAILED":
      return <ResumeFailed resume={resume} />;

    default:
      return <ResumeEmpty />;
  }
}