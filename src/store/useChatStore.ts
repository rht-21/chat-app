/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

interface ChatState {
  messages: any[];
  users: any[];
  selectedUser: any;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => Promise<void>;
  getMessages: (userId: string) => Promise<void>;
  setSelectedUser: (selectedUser: any) => void;
  sendMessage: (messageData: { text: string }) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await api.get("/messages/users");
      set({ users: response.data });
    } catch (error: any) {
      toast.error("Something went wrong: " + error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await api.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error: any) {
      toast.error("Something went wrong: " + error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser: any) => set({ selectedUser }),

  sendMessage: async (messageData: { text: string }) => {
    const { selectedUser, messages } = get();
    try {
      const response = await api.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, response.data] });
    } catch (error: any) {
      toast.error("Something went wrong: " + error.response.data.message);
    }
  },
}));
