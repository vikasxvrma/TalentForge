import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginWithGoogle } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext(null);

const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const navigate=useNavigate();
  /**
   * Restores the authenticated session on page refresh.
   */
  const restoreSession = useCallback(async () => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      setToken(storedToken);

      const response = await getCurrentUser();

      setUser(response.user);
    } catch (error) {
      console.error("Session restoration failed:", error);

      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  /**
   * Called after successful Google authentication.
   */
const login = useCallback(async (googleCredential) => {
  
  const { user, token } = await loginWithGoogle(googleCredential);

  localStorage.setItem(TOKEN_KEY, token);

  setToken(token);
  setUser(user);
}, []);

  /**
   * Clears the current authenticated session.
   */
const logout = useCallback(() => {
  localStorage.removeItem(TOKEN_KEY);

  delete client.defaults.headers.common.Authorization;

  queryClient.clear();

  setToken(null);
  setUser(null);

  navigate("/", { replace: true });
}, [navigate, queryClient]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [user, token, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}