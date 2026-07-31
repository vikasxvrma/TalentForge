import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>{children}</AuthProvider>

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
            }}
          />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
