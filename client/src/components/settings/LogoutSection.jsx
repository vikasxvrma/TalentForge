import { LogOut } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function LogoutSection() {
  const { logout } = useAuth();

  return (
    <section className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Logout
        </h2>

        <p className="mt-2 text-sm text-muted">
          Sign out of your TalentForge account on this device.
        </p>
      </div>

      <button
        onClick={logout}
        className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 font-medium text-red-500 transition hover:bg-red-500/10"
      >
        <LogOut size={18} />

        Logout
      </button>
    </section>
  );
}