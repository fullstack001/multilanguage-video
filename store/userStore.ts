import { create } from "zustand";
import { setToken, getToken, removeToken } from "../lib/token";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  email: string;
  name: string;
  exp: number;
}

interface UserState {
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
  checkAuth: () => void;
  isAuthenticated: boolean; // Add this field to check if user is authenticated
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false, // Initialize authentication as false

  login: (token: string) => {
    setToken(token);
    const decoded: DecodedToken = jwtDecode(token);
    set({ token, user: decoded, isAuthenticated: true });
  },

  logout: () => {
    removeToken();
    set({ token: null, user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const token = getToken();
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      set({ token, user: decoded, isAuthenticated: true });
    } else {
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));
