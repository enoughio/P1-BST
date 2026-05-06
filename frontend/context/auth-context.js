"use client"

import { useRouter } from "next/navigation" // Changed from next/router
import { useContext, createContext, useState, useEffect } from "react"

// Missing BASE_URL definition
const BASE_URL = process.env.BACKEND_URL || "http://127.0.0.1:8000"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const dummy = {
        id: "1",
        first_name: "John",
        last_name: "Doe",
        username: "johndoe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        inicative: "Bhopal Storytellers",
        avatar: null,
        address: "123 Main St, Bhopal, MP",
        gender: "male",
        dob: "1990-01-15",
        id_proof: "ABCD1234",
        clubId: "1",
        clubName: "Bhopal Storytellers",
        occupation: "Software Engineer",
        membershipExpiryDate: "2023-05-15",
        joinDate: "2022-05-15",
        bio: "Passionate about public speaking and leadership development. I joined Storytellers to improve my communication skills and connect with like-minded individuals.",
        role: "member",
    }
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    
    useEffect(() => {
        checkUserAuthentication()
    }, [])
    
    const checkUserAuthentication = async () => {
        // try {
        //     const response = await fetch(`${BASE_URL}/api/accouts/me`, {
        //         credentials: 'include'
        //     })
            
        //     if (response.ok) {
        //         const data = await response.json(); // Changed from response.data
        //         setUser(data);
        //     } else {
        //         setUser(null)
        //     }
        // } catch (error) {
        //     console.log("Authentication check fails", error)
        //     setUser(null)
        // } finally { 
        //     setLoading(false);
        // }
        setLoading(false);
        setUser(dummy)
    }
    
    const login = async (credentials) => {
        // try {
        //     const response = await fetch(`${BASE_URL}/api/accounts/login/`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json' // Ensure the server knows it's receiving JSON
        //         },
        //         body: JSON.stringify(credentials) // Ensure credentials is an object with { username, password }
        //     });

        //     console.log("Login failed try again", data)
            
        //     if (response.ok) {
        //         const data = await response.json()
                 
        //         setUser(data);
        //         if (data.role) {
        //             router.push(`/${data.role}/dashboard`)
        //         }
        //         setUser(dummy)
        //         return { success: true } 
        //     } else {
        //         const error = await response.json()
        //         return { success: false, error } // Changed from returning success: true on error
        //     }
        // } catch (error) {
        //     console.error("Login failed try again")
        //     return { success: false, error: "Login failed" }
        // }

        setUser(dummy)
    }
    

    const logout = async () => {
        try {
            // await fetch(`${BASE_URL}/api/auth/logout`, {
            //     method: "POST",
            //     credentials: "include"
            // })
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

export const useAuth = () =>{
    return useContext(AuthContext)
}