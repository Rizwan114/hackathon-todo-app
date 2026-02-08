"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface AuthState {
  userId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (userId: string, token: string) => void;
  signup: (userId: string, token: string) => void;
  logout: () => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    userId: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    if (token && userId) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("user_id");
          setState({ userId: null, isAuthenticated: false, isLoading: false });
        } else {
          setState({ userId, isAuthenticated: true, isLoading: false });
        }
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        setState({ userId: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setState({ userId: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = useCallback((userId: string, token: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_id", userId);
    setState({ userId, isAuthenticated: true, isLoading: false });
  }, []);

  const signup = useCallback((userId: string, token: string) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_id", userId);
    setState({ userId, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    setState({ userId: null, isAuthenticated: false, isLoading: false });
  }, []);

  const getToken = useCallback(() => {
    return localStorage.getItem("access_token");
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
