import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import Topbar from "../components/topbar/Topbar";

import { SidebarProvider } from "../context/SidebarContext";

function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />

        <MobileSidebar />

        <div className="lg:ml-72">
          <Topbar />

          <main className="mx-auto max-w-7xl p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;