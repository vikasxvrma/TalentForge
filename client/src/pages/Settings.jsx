import LogoutSection from "../components/settings/LogoutSection";
import ProfileCard from "../components/settings/ProfileCard";

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>

        <p className="mt-2 text-muted">
          Manage your TalentForge account and preferences.
        </p>
      </div>

      <ProfileCard />

      <LogoutSection />
    </div>
  );
}