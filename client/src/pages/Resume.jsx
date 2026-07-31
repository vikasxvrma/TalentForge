import ResumeStatus from "../components/resume/ResumeStatus";

function Resume() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Resume
        </h1>

        <p className="mt-2 text-sm text-muted md:text-base">
          Upload and manage your resume for AI-powered analysis and
          interview preparation.
        </p>
      </div>

      <ResumeStatus />
    </div>
  );
}

export default Resume;