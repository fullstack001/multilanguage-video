// lib/api/auth.ts
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Signup function using Axios and the proxy to /api/signup
export async function signup(email: string, password: string, name: string) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signup`, {
      email,
      password,
      name,
    });
    return response.data;
  } catch (error) {
    // Handle and throw the error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Signup failed");
    }
    throw new Error("An error occurred during signup");
  }
}

// Login function using Axios and the proxy to /api/login
export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    // Handle and throw the error
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.msg || "Login failed");
    }
    throw new Error("An error occurred during login");
  }
}
