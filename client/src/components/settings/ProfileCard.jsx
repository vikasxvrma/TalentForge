import { Pencil, ShieldCheck } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function ProfileCard() {
  const { user } = useAuth();

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Profile
          </h2>

          <p className="mt-1 text-sm text-muted">
            Your account information is managed through Google.
          </p>
        </div>

        <button
          disabled
          title="Profile editing coming soon"
          className="cursor-not-allowed rounded-lg border border-border bg-background p-2 text-muted transition"
        >
          <Pencil size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={user.picture}
          alt={user.name}
          className="h-20 w-20 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-semibold text-foreground">
            {user.name}
          </h3>

          <p className="mt-1 truncate text-muted">
            {user.email}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
            <ShieldCheck
              size={15}
              className="text-emerald-500"
            />

            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
              Google Account
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-border bg-background p-4">
        <p className="text-sm text-muted">
          Profile editing will be available in a future release.
        </p>
      </div>
    </section>
  );
}