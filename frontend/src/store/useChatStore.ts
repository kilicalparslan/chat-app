import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "@/lib/requests";
import type {
  ChatState,
  Message,
  SendMessageParams,
  User,
} from "@/types/types";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [] as Message[],
  users: [] as User[],
  selectedUser: null as User | null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      const fetchedUsers = Array.isArray(response.data)
        ? response.data
        : response.data?.users;

      if (!Array.isArray(fetchedUsers)) {
        throw new Error("Unexpected response format: users is not an array");
      }
      set({ users: fetchedUsers });
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/users/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      set({ isMessagesLoading: false });
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData: SendMessageParams) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({
        messages: [...messages, response.data],
      });
    } catch (error) {
      toast.error("Failed to send message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage: Message) => {
      if (newMessage.sender !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
}));
