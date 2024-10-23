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
    return { status: 200, data: response.data };
  } catch (error) {
    // Handle and throw the error
    if (axios.isAxiosError(error) && error.response) {
      return { status: 400, message: error.response.data.msg };
    }
    return { status: 500, message: "An error occurred during signup" };
  }
}

export async function resendVerificationCode(email: string) {
  const response = await axios.post(`${API_URL}/api/auth/resend`, {
    email,
  });
  return response.data;
}

export async function verifyCode(email: string, validationCode: string) {
  try {
    const response = await axios.post(`${API_URL}/api/auth/verify`, {
      email,
      validationCode,
    });
    return { status: 200, token: response.data.token };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return { status: 400, msg: error.response.data.msg };
    }
    return { status: 500, msg: "An error occurred during verification" };
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

export async function googleSignIn(credential: string) {
  const response = await axios.post(`${API_URL}/api/auth/google`, {
    credential,
  });
  return response.data;
}

// Logout function to remove token and redirect to landing page
export function logout() {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Redirect to the landing page
  window.location.href = "/";
}
