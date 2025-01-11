import { create } from "zustand";

export const useChatStore = create((set) => ({
  signalData: "",
  messages: [],
  isConnected: false,
  setSignalData: (data) => set({ signalData: data }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setIsConnected: (status) => set({ isConnected: status }),
}));
