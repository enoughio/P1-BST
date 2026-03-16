import { useAuth } from './auth-context';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

export const useApi = () => {
    const { refreshToken, logout } = useAuth();

    const apiCall = async (endpoint, options = {}) => {
        const config = {
            credentials: 'include', // Always include cookies
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            let response = await fetch(`${BASE_URL}${endpoint}`, config);

            // If unauthorized, try to refresh token once
            if (response.status === 401) {
                const refreshSuccess = await refreshToken();
                
                if (refreshSuccess) {
                    // Retry the original request
                    response = await fetch(`${BASE_URL}${endpoint}`, config);
                } else {
                    // Refresh failed, redirect to login
                    logout();
                    return null;
                }
            }

            return response;
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    };

    // Convenience methods
    const get = (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'GET' });
    const post = (endpoint, data, options = {}) => apiCall(endpoint, { 
        ...options, 
        method: 'POST', 
        body: JSON.stringify(data) 
    });
    const put = (endpoint, data, options = {}) => apiCall(endpoint, { 
        ...options, 
        method: 'PUT', 
        body: JSON.stringify(data) 
    });
    const del = (endpoint, options = {}) => apiCall(endpoint, { ...options, method: 'DELETE' });

    return { apiCall, get, post, put, delete: del };
};
