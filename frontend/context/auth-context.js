"use client"

import { useRouter } from "next/navigation" // Changed from next/router
import { useContext, createContext, useState, useEffect } from "react"

// Missing BASE_URL definition
const BASE_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    
    useEffect(() => {
        checkUserAuthentication()
    }, [])
    
    const checkUserAuthentication = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/accouts/me`, {
                credentials: 'include'
            })
            
            if (response.ok) {
                const data = await response.json(); // Changed from response.data
                setUser(data);
            } else {
                setUser(null)

            }
        } catch (error) {
            console.log("Authentication check fails", error)
            setUser(null)
        } finally { 
            setLoading(false);
        }
    }
    
    const login = async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Ensure the server knows it's receiving JSON
                },
                body: JSON.stringify(credentials) // Ensure credentials is an object with { username, password }
            });

            console.log("Login failed try again", data)
            
            if (response.ok) {
                const data = await response.json()
                 
                setUser(data);
                if (data.role) {
                    router.push(`/${data.role}/dashboard`)
                }
                return { success: true } 
            } else {
                const error = await response.json()
                return { success: false, error } // Changed from returning success: true on error
            }
        } catch (error) {
            console.error("Login failed try again")
            
            return { success: false, error: "Login failed" }
        }
    }
    

    const logout = async () => {
        try {
            await fetch(`${BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })
            setUser(null)
            router.push('/');
        } catch (error) {
            console.error("Error while Logout", error)
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUserAuthentication }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)