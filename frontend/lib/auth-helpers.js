/**
 * Helper functions for authentication and authorization
*/
// import { cookies } from "next/headers";


//TODO: remove this file while deployment


export const isSuperAdmin = async() => {
  // In a real app, this would check user claims/roles from an auth system
  // For demo purposes, we'll determine based on URL
  const currentUser = await  getCurrentUser();
  if (currentUser.isSuperAdmin === true) {
    return true
  }else{
    return false
  }

  if (typeof window !== "undefined") {
    return window.location.pathname.includes("/superadmin")
  }
  return false
  
}

export const getAuthToken = () => {
  // const authToken = cookies().get("authToken")?.value;
  // return authToken || null;
  return "sample-auth-token"; // Replace with actual token retrieval logic
};

export const getCurrentUser = () => {


  return {
    id: "1",
    name: isSuperAdmin() ? "Super Admin" : "John Doe",
    email: isSuperAdmin() ? "superadmin@example.com" : "admin@example.com",
    role: isSuperAdmin() ? "superadmin" : "admin",
    clubId: isSuperAdmin() ? null : "1",
  }
}

