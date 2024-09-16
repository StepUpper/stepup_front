import { create } from "zustand";
import { TChatResponse } from "@/types/chat";

interface ChatState {
  messages: { type: "user" | "bot"; content: string | TChatResponse }[];
  addMessage: (message: {
    type: "user" | "bot";
    content: string | TChatResponse;
  }) => void;
  loadMessages: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => {
      const updatedMessages = [...state.messages, message];
      sessionStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
      return { messages: updatedMessages };
    }),
  loadMessages: () => {
    const savedMessages = sessionStorage.getItem("chatMessages");
    if (savedMessages) {
      set({ messages: JSON.parse(savedMessages) });
    }
  },
}));

export default useChatStore;
