"use client"

import { useRouter } from "next/navigation"
import { useContext, createContext, useState, useEffect } from "react"

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkUserAuthentication()
    }, [])

    const checkUserAuthentication = async () => {
        try {
            console.log("🔍 Checking user authentication...")

            const response = await fetch(`${BASE_URL}/api/accounts/me`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            console.log("🧾 Response status:", response.status)

            const responseClone = response.clone() // clone for debug log
            const textBody = await responseClone.text()
            console.log("📦 Response body:", textBody)

            if (response.ok) {
                const data = await response.json()
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
            } else {
                setUser(null)
                throw new Error("❌ Error fetching current user: " + textBody)
            }
        } catch (error) {
            console.error("❌ Auth check failed:", error)
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    const login = async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/api/accounts/login/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json()

            if (response.ok) {
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))

                if (data.role) {
                    router.push(`/${data.role}/dashboard`)
                }

                return { success: true }
            } else {
                return { success: false, error: data }
            }
        } catch (error) {
            console.error("Login failed:", error)
            return { success: false, error: "Login failed" }
        }
    }

    const logout = async () => {
        try {
            await fetch(`${BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            })

            localStorage.removeItem("user")
            setUser(null)
            router.push("/")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, checkUserAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
