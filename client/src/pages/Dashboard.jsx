import WelcomeCard from "../components/dashboard/WelcomeCard";
import ResumeCard from "../components/dashboard/ResumeCard";
import ChatCard from "../components/dashboard/ChatCard";
import QuickActions from "../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeCard />

      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeCard />
        <ChatCard />
      </div>

      <QuickActions />
    </div>
  );
}

export default Dashboard;