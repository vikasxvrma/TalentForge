import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Resume from "../pages/Resume";
import Chat from "../pages/Chat";
import Analytics from "../pages/Analytics";
import Login from "../pages/Login";
import Landing from "../pages/Landing";
import SettingsPage from "../pages/Settings";
import MockInterview from "../pages/MockInterview";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/resume" element={<Resume />} />

          <Route path="/chat" element={<Chat />} />

          <Route
            path="/chat/:conversationId"
            element={<Chat />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>

        {/* Mock Interview */}
        <Route
          path="/interview"
          element={<MockInterview />}
        />
      </Route>

      {/* Catch all */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;