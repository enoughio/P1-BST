/**
 * Helper functions for authentication and authorization
*/
// import { cookies } from "next/headers";


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
  // This would fetch the current user profile from storage or context in a real app

  // try {

  //     const data = fetch("/api/auth/user", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })

  //     if (!data.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const user = data.json();
  //     return user;
  // }
  // catch (error) {
  //   console.trace("Error fetching user data:", error);
  // }



  return {
    id: "1",
    name: isSuperAdmin() ? "Super Admin" : "John Doe",
    email: isSuperAdmin() ? "superadmin@example.com" : "admin@example.com",
    role: isSuperAdmin() ? "superadmin" : "admin",
    clubId: isSuperAdmin() ? null : "1",
  }
}

