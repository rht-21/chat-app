/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  checkAuth: () => Promise<void>;
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  onlineUsers: [],

  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");
      set({ authUser: response.data });
    } catch (error) {
      console.log(error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await api.post("/auth/signup", data);
      toast.success("Account created successfully");
      set({ authUser: response.data });
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong: " + error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const response = await api.post("/auth/login", data);
      set({ authUser: response.data });
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong: " + error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong" + error.response.data.message);
    }
  },
}));
