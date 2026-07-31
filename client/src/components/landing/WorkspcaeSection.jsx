import WorkspaceCard from "./WorkspaceCard";
import { workspaceModules } from "../../constants/workspaceModules";

function WorkspaceSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">

      <div className="mx-auto max-w-3xl text-center">

        <p className="font-medium text-primary">
          Workspace
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-5xl">
          Everything You Need
          <br />
          To Land Your Next Job
        </h2>

        <p className="mt-6 text-lg text-muted">
          TalentForge combines resume optimization,
          AI coaching, interview preparation,
          and career analytics into one intelligent workspace.
        </p>

      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {workspaceModules.map((module) => (
          <WorkspaceCard
            key={module.title}
            module={module}
          />
        ))}
      </div>

    </section>
  );
}

export default WorkspaceSection;