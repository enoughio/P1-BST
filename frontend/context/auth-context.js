import { useRouter } from "next/router"
import { useContext, createContext, useState, useEffect } from "react"

const AuthContext = createContext()

const router = useRouter()

const BASE_URL = 'https://129.08.06/'


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUserAuthentication()
    }, [])

    const checkUserAuthentication = async () => {
        try {
            const response = fetch(`${BASE_URL}/api/auth/me`, {
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.data;
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
            const response = fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data);

                if (data.role) {
                    router.push(`/${data.role}/dashboard`)
                }

                return { succes: true }
            } else {
                const error = await response.json()
                return { success: false, error }
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
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default useAuth = useContext(AuthContext)