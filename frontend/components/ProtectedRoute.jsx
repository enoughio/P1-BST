"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/utils/auth';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const authData = await checkAuth();
        
        if (!authData.authenticated) {
          // Not authenticated, redirect to login
          router.push('/login');
          return;
        }
        
        // If specific roles are required, check if user has access
        if (allowedRoles.length > 0 && !allowedRoles.includes(authData.role)) {
          // Redirect to appropriate dashboard based on role
          switch (authData.role) {
            case 'admin':
              router.push('/admin/dashboard');
              break;
            case 'superadmin':
              router.push('/superadmin/dashboard');
              break;
            case 'member':
              router.push('/member/dashboard');
              break;
            default:
              router.push('/login');
          }
          return;
        }
        
        // User is authorized
        setIsAuthorized(true);
      } catch (error) {
        console.error('Authorization error:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAccess();
  }, [router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : null;
}
