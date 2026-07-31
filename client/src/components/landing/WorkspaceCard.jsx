import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

function WorkspaceCard({ module }) {
  const { isAuthenticated } = useAuth();

  const Icon = module.icon;

  const destination =
    isAuthenticated || !module.requiresAuth
      ? module.href
      : "/login";

  return (
    <Link
      to={destination}
      className="
        group
        rounded-3xl
        border
        border-border
        bg-surface
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/40
        hover:bg-surface-hover
      "
    >
      <div className="flex items-start justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={28} />
        </div>

        <ArrowRight
          className="
            h-5
            w-5
            text-muted
            transition-transform
            duration-300
            group-hover:translate-x-1
            group-hover:text-primary
          "
        />

      </div>

      <h3 className="mt-8 text-xl font-semibold">
        {module.title}
      </h3>

      <p className="mt-3 leading-7 text-muted">
        {module.description}
      </p>

      <div className="mt-8 text-sm font-medium text-primary">
        Open Workspace
      </div>

    </Link>
  );
}

export default WorkspaceCard;