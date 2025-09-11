"use client";
import { useContext } from "react";
import { AuthContext, AuthContextValue } from "../contexts/authcontext";

// Custom hook to use auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  // console.log('useAuth context from useAuth hook:', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};