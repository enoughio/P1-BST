import React, { useEffect } from 'react'
import useAuth from '../context/auth-context.js'
import { useRouter } from 'next/router';

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {

    const { user, loading } = useAuth();
    const router = useRouter()

    useEffect(() => {
        // if it is not loading and user is not found 
        if (!loading && !user) {
            router.push("/login")
            return
        }

        // if it not loading and user is there and if it i their appropriate routne then redieret to their corrosponding  route 
        if (!loading && user && allowedRoles.length > 0 && allowedRoles.includes(user.role)) {
            router.push(`${user.role}/dashboard`)
            console.log("on dashboard pages")
            return
        }

        //  else {
        //     // else redirect the user to home 
        //     router.push("/")
        //     console.log("unauthorized access")
        // }
    }, [user, loading, allowedRoles, router]);


    // Show loading state while checking authentication
    // TODO: show lodading 
    if (loading) {
        return <div>Loading...</div>
    }

    // if usre it authenicted and autherized role is allowed, render child
  // If user is authenticated and authorized, render children
  if (user && (allowedRoles.length === 0 || allowedRoles.includes(user.role))) {
    return <>{children}</>
  }


  return null
}

export default ProtectedRoutes