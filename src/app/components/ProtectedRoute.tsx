'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback,
  redirectTo = '/auth/login'
}) => {
  const router = useRouter();
  const { isLoading, isAuthenticated ,isHydrated} = useAuth();


  // Redirect to login if not authenticated
  useEffect(() => {
    if (isHydrated&&!isLoading && !isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isHydrated,isLoading, isAuthenticated]);

  // Show loading state
  if (!isHydrated || isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Checking authentication...</p>
          </div>
        </div>
      )
    );
  }

  // Don't render children if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;

// // Simple wrapper component for pages that need protection
// export const withAuth = <P extends object>(
//   Component: React.ComponentType<P>,
//   options?: { redirectTo?: string; fallback?: React.ReactNode }
// ) => {
//   const AuthenticatedComponent = (props: P) => {
//     return (
//       <ProtectedRoute 
//         redirectTo={options?.redirectTo}
//         fallback={options?.fallback}
//       >
//         <Component {...props} />
//       </ProtectedRoute>
//     );
//   };

//   AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name})`;
  
//   return AuthenticatedComponent;
// };
