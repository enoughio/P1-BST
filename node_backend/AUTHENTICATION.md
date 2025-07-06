# 🔐 Enhanced Cookie-Based Authentication System

## Overview

This authentication system provides secure, persistent login sessions using HTTP-only cookies instead of client-side JWT tokens. This approach provides better security against XSS attacks and automatic session management.

## 🚀 Features

### Backend (Node.js + Express)
- ✅ **HTTP-Only Cookies**: Secure, cannot be accessed by JavaScript
- ✅ **Automatic Token Refresh**: Tokens refresh automatically every 24 hours
- ✅ **CSRF Protection**: SameSite cookie policy
- ✅ **Secure in Production**: HTTPS-only cookies in production
- ✅ **Role-Based Access Control**: Maintains existing RBAC system
- ✅ **Session Persistence**: 30-day cookie expiration

### Frontend (Next.js)
- ✅ **Automatic Authentication**: Checks auth on app load
- ✅ **Persistent Sessions**: Users stay logged in across browser restarts
- ✅ **Automatic API Calls**: Custom hook handles authentication
- ✅ **Route Protection**: HOC for protecting routes by role
- ✅ **Graceful Logout**: Automatic logout on token expiration

## 🔧 Technical Implementation

### Backend Changes

#### 1. Cookie Configuration
```javascript
const cookieOptions = {
  httpOnly: true,                    // Prevents XSS
  secure: process.env.NODE_ENV === 'production', // HTTPS in prod
  sameSite: 'lax',                  // CSRF protection
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  path: '/'                         // Available site-wide
};
```

#### 2. Authentication Middleware
- Now checks for `authToken` cookie first
- Falls back to Authorization header for API compatibility
- Maintains existing RBAC functionality

#### 3. New Endpoints
- `POST /api/auth/refresh` - Refresh authentication token
- Enhanced logout to clear cookies properly

### Frontend Changes

#### 1. Enhanced Auth Context
```javascript
// Automatic authentication check on app load
const checkUserAuthentication = async () => {
  // Check localStorage first for immediate UI update
  // Then verify with server using cookies
}

// Automatic token refresh every 24 hours
useEffect(() => {
  if (user) {
    const interval = setInterval(() => {
      refreshToken();
    }, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }
}, [user]);
```

#### 2. Custom API Hook
```javascript
// Automatically handles authentication for all API calls
const { get, post, put, delete } = useApi();

// Usage
const response = await get('/api/bst/clubs');
const result = await post('/api/bst/events', eventData);
```

#### 3. Route Protection HOC
```javascript
// Protect routes by role
const AdminDashboard = withAuth(DashboardComponent, 'admin');
const MemberProfile = withAuth(ProfileComponent, 'member');
```

## 🔒 Security Improvements

### 1. **XSS Protection**
- HTTP-only cookies cannot be accessed by JavaScript
- No tokens stored in localStorage/sessionStorage

### 2. **CSRF Protection**
- SameSite cookie policy prevents cross-site attacks
- Credentials must be explicitly included in requests

### 3. **Secure Transport**
- HTTPS-only cookies in production
- Secure flag prevents transmission over HTTP

### 4. **Token Management**
- Automatic refresh prevents session expiration
- Graceful handling of expired tokens

## 📱 User Experience

### 1. **Persistent Login**
- Users stay logged in for 30 days
- Sessions persist across browser restarts
- Automatic token refresh prevents unexpected logouts

### 2. **Seamless Navigation**
- No manual token management required
- Automatic role-based redirects
- Loading states during authentication checks

### 3. **Error Handling**
- Graceful logout on authentication failures
- Automatic retry on token expiration
- Clear error messages for users

## 🛠️ Usage Examples

### Frontend Component Example
```javascript
"use client"
import { useAuth } from '@/context/auth-context';
import { useApi } from '@/hooks/use-api';
import withAuth from '@/components/with-auth';

function Dashboard() {
  const { user, logout } = useAuth();
  const { get, post } = useApi();

  const fetchData = async () => {
    const response = await get('/api/bst/clubs');
    const data = await response.json();
    // Handle data
  };

  return (
    <div>
      <h1>Welcome, {user.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Protect route - requires admin role
export default withAuth(Dashboard, 'admin');
```

### API Call Example
```javascript
// Old way (manual token management)
const response = await fetch('/api/bst/clubs', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// New way (automatic authentication)
const { get } = useApi();
const response = await get('/api/bst/clubs');
```

## 🚀 Getting Started

### 1. Backend Setup
```bash
# Install dependencies
npm install cookie-parser

# Update environment variables
ALLOWED_ORIGINS="http://localhost:3000"
COOKIE_SECRET="your-super-secret-cookie-key"
```

### 2. Frontend Setup
```bash
# Update environment variables
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
```

### 3. Usage in Components
```javascript
// Wrap your app with AuthProvider
import { AuthProvider } from '@/context/auth-context';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

## 🔍 Debugging

### Check Authentication Status
```javascript
// In browser console
document.cookie; // Won't show httpOnly cookies (this is correct!)

// Check network tab for:
// - Set-Cookie headers on login
// - Cookie headers on subsequent requests
```

### Backend Logs
```javascript
// Add to auth middleware for debugging
console.log('Cookies:', req.cookies);
console.log('Auth header:', req.headers.authorization);
```

## 📋 Migration Checklist

- ✅ Install cookie-parser package
- ✅ Update Express middleware configuration
- ✅ Update auth routes to use cookies
- ✅ Update frontend auth context
- ✅ Update environment variables
- ✅ Test authentication flow
- ✅ Test automatic refresh
- ✅ Test logout functionality
- ✅ Test route protection

## 🚨 Important Notes

1. **Development vs Production**: Cookies work over HTTP in development but require HTTPS in production
2. **CORS Configuration**: Must have `credentials: true` for cookies to work
3. **Domain Configuration**: Cookies respect domain boundaries
4. **Debugging**: Use network tab to inspect cookie headers, not JavaScript console

This enhanced authentication system provides a much more secure and user-friendly experience while maintaining backward compatibility with existing API patterns.
