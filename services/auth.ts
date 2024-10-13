import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  // Add other properties of your token here
}

export function checkAuth(): boolean {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode(token) as DecodedToken;
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token"); // Remove expired token
        return false;
      }

      return true; // Token is valid and not expired
    } catch (error) {
      console.error("Error decoding token:", error);
      return false;
    }
  }
  return false;
}
