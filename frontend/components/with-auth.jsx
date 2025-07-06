"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';

const withAuth = (WrappedComponent, requiredRole = null) => {
    return function AuthenticatedComponent(props) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading) {
                if (!user) {
                    // User not authenticated, redirect to login
                    router.push('/login');
                    return;
                }

                if (requiredRole) {
                    // Check if user has required role
                    const userRole = getUserRole(user);
                    const hasAccess = checkRoleAccess(userRole, requiredRole);
                    
                    if (!hasAccess) {
                        // User doesn't have required role, redirect to unauthorized
                        router.push('/unauthorized');
                        return;
                    }
                }
            }
        }, [user, loading, router]);

        // Show loading while checking authentication
        if (loading) {
            return (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            );
        }

        // Show nothing while redirecting
        if (!user || (requiredRole && !checkRoleAccess(getUserRole(user), requiredRole))) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

// Helper function to determine user role
const getUserRole = (user) => {
    if (user.isSuperuser) return 'superadmin';
    if (user.isStaff || (user.admins && user.admins.length > 0)) return 'admin';
    if (user.members && user.members.length > 0) return 'member';
    return 'member';
};

// Helper function to check role access
const checkRoleAccess = (userRole, requiredRole) => {
    const roleHierarchy = {
        'member': 1,
        'admin': 2,
        'superadmin': 3
    };
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export default withAuth;
