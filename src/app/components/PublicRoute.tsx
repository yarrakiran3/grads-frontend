"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

// Reverse protection - redirect authenticated users (for login/register pages)
export const PublicRoute: React.FC<{
  children: React.ReactNode;
  redirectTo?: string;
}> = ({ 
  children, 
  redirectTo = '/home' 
}) => {
  const router = useRouter();
  console.log("Calling useAuth in PublicRoute");
  const {  isAuthenticated } = useAuth();

  // Redirect authenticated users away from public routes (like login)
  useEffect(() => {
    if ( isAuthenticated) {
      router.push(redirectTo);
    }
  }, [ isAuthenticated]);

  // Show loading state
  

  // Don't render children if authenticated (will redirect)
  if(isAuthenticated){
    return null;
  }

  // Render public content
  return <>{children}</>;
};