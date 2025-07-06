"use client"

import { useRouter } from "next/navigation" // Changed from next/router
import { useContext, createContext, useState, useEffect } from "react"

// Missing BASE_URL definition
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"

// Helper function to determine user role
const getUserRole = (user) => {
    if (user.isSuperuser) {
        return 'superadmin';
    }
    if (user.isStaff || (user.admins && user.admins.length > 0)) {
        return 'admin';
    }
    if (user.members && user.members.length > 0) {
        return 'member';
    }
    return 'member'; // Default to member
};

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // const dummy = {
    //     id: "1",
    //     first_name: "John",
    //     last_name: "Doe",
    //     username: "johndoe",
    //     email: "john.doe@example.com",
    //     phone: "123-456-7890",
    //     inicative: "Bhopal Storytellers",
    //     avatar: null,
    //     address: "123 Main St, Bhopal, MP",
    //     gender: "male",
    //     dob: "1990-01-15",
    //     id_proof: "ABCD1234",
    //     clubId: "C0001",
    //     clubName: "Bhopal Storytellers",
    //     occupation: "Software Engineer",
    //     membershipExpiryDate: "2023-05-15",
    //     joinDate: "2022-05-15",
    //     bio: "Passionate about public speaking and leadership development. I joined Storytellers to improve my communication skills and connect with like-minded individuals.",
    //     role: "admin",
    // }
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkUserAuthentication()
    }, [])

    const checkUserAuthentication = async () => {
        try {
          // Check if we have user data in localStorage first
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // Verify with server using cookie authentication
          const response = await fetch(`${BASE_URL}/api/accounts/me`, {
            credentials: "include", // This sends the HTTP-only cookie
          })

          if (response.ok) {
            const data = await response.json()
            setUser(data.data.user)
            localStorage.setItem("user", JSON.stringify(data.data.user))
          } else {
            // Clear user data if authentication fails
            setUser(null)
            localStorage.removeItem("user")
          }
        } catch (error) {
          console.log("Auth check failed", error)
          setUser(null)
          localStorage.removeItem("user")
        } finally {
          setLoading(false)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include', // Important: This sends cookies
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json()
                
                // Set user data from response
                setUser(data.data.user);
                
                // Store user data in localStorage for persistence across tabs
                localStorage.setItem("user", JSON.stringify(data.data.user));
                
                // Determine user role and redirect
                const userRole = getUserRole(data.data.user);
                if (userRole) {
                    router.push(`/${userRole}/dashboard`);
                }
                
                return { success: true, data: data.data.user } 
            } else {
                const error = await response.json()
                return { success: false, error }
            }
        } catch (error) {
            console.error("Login failed:", error)
            return { success: false, error: "Login failed" }
        }
    }

    // Automatic token refresh
    const refreshToken = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts/refresh`, {
                method: "POST",
                credentials: "include"
            });

            if (response.ok) {
                return true;
            } else {
                // If refresh fails, logout user
                logout();
                return false;
            }
        } catch (error) {
            console.error("Token refresh failed", error);
            logout();
            return false;
        }
    };

    // Auto-refresh token every 24 hours
    useEffect(() => {
        if (user) {
            const interval = setInterval(() => {
                refreshToken();
            }, 24 * 60 * 60 * 1000); // 24 hours

            return () => clearInterval(interval);
        }
    }, [user]);

    const logout = async () => {
        try {
            await fetch(`${BASE_URL}/api/accounts/logout`, {
                method: "POST",
                credentials: "include" // Important: This sends cookies
            })

            localStorage.removeItem("user")
            setUser(null)
            router.push("/")

        } catch (error) {
            console.error("Error while Logout", error)
            // Even if logout request fails, clear local state
            localStorage.removeItem("user")
            setUser(null)
            router.push("/")
        }
    }

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout, 
            refreshToken,
            checkUserAuthentication 
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}