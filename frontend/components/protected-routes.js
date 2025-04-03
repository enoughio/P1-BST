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



        if (loading)
            <div> Loading </div>
        

    }, [user, loading, allowedRoles, router]);

    // if usre it authenicted and autherized role is allowed 
    if(user && )
    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoutes