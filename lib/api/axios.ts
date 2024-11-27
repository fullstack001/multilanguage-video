import axios from "axios";
import { getToken } from "../token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["authorization"] = `${token}`; // Attach the token to headers
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized: Logging out the user...");
      logout(); // Ensure logout is triggered on unauthorized access
    }
    console.error("Response error:", error.message || error.response);
    return Promise.reject(error);
  },
);

// Logout function
const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login
};

export type { AxiosProgressEvent } from "axios"; // Use export type for re-exporting types
export default axiosInstance;
