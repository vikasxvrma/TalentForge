import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleGoogleLogin(credential) {
    try {
      await login(credential);

      toast.success("Welcome to TalentForge!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card/80 p-10 shadow-2xl backdrop-blur">
        <div className="space-y-3 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <span className="text-2xl font-bold text-primary">TF</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to TalentForge
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Your AI-powered career workspace for resume intelligence,
            interview preparation, and career growth.
          </p>
        </div>

        <div className="mt-10">
          <GoogleLoginButton
            onSuccess={handleGoogleLogin}
            onError={() =>
              toast.error("Google authentication failed.")
            }
          />
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
          By continuing, you agree to sign in securely with your Google
          account.
        </p>

        <div className="mt-8 border-t border-border pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}