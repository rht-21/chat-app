/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { io } from "socket.io-client";
import { useChatStore } from "./useChatStore";

const BASE_URL = "http://localhost:4001";

export interface AuthState {
  authUser: any;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  onlineUsers: any[];
  socket: any;
  checkAuth: () => Promise<void>;
  signup: (data: {
    fullName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
  isTyping: boolean;
  typingUserId: string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  isTyping: false,
  typingUserId: null,

  checkAuth: async () => {
    try {
      const response = await api.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
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
      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Account created successfully");
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
      get().connectSocket();
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
      get().disconnectSocket();
      toast.success("Logged out successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong" + error.response.data.message);
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });

    socket.on("typing", ({ senderId }) => {
      const { selectedUser } = useChatStore.getState();
      if (selectedUser?._id === senderId) {
        set({ isTyping: true, typingUserId: senderId });
      }
    });

    socket.on("stopTyping", ({ senderId }) => {
      const { selectedUser } = useChatStore.getState();
      if (selectedUser?._id === senderId) {
        set({ isTyping: false, typingUserId: null });
      }
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
    set({ isTyping: false, typingUserId: null });
  },
}));
