import { create } from "zustand";
import { TChatResponse } from "@/types/chat";
import { getMessagesFromLatestRoom } from "@/apis/firebase/chatFirestore";

interface ChatState {
  guestMessages: { type: "user" | "bot"; content: string | TChatResponse }[];
  userMessages: { type: "user" | "bot"; content: string | TChatResponse }[];
  roomId: string | null;
  setRoomId: (roomId: string) => void;
  addGuestMessage: (message: {
    type: "user" | "bot";
    content: string | TChatResponse;
  }) => void;
  addUserMessage: (message: {
    type: "user" | "bot";
    content: string | TChatResponse;
  }) => void;
  loadGuestMessages: () => void;
  loadUserMessages: (userId: string) => void;
  clearGuestMessages: () => void;
}

const useChatStore = create<ChatState>((set) => ({
  guestMessages: [],
  userMessages: [],
  roomId: null,

  // roomId 설정 함수
  setRoomId: (roomId: string) => set({ roomId }),

  // 비회원 메시지 추가
  addGuestMessage: (message) =>
    set((state) => {
      const updatedMessages = [...state.guestMessages, message];
      sessionStorage.setItem("guestMessages", JSON.stringify(updatedMessages));
      return { guestMessages: updatedMessages };
    }),

  // 회원 메시지 추가
  addUserMessage: (message) =>
    set((state) => {
      const updatedMessages = [...state.userMessages, message];
      return { userMessages: updatedMessages };
    }),

  // 비회원 메시지 로드
  loadGuestMessages: () => {
    const savedMessages = sessionStorage.getItem("guestMessages");
    if (savedMessages) {
      set({ guestMessages: JSON.parse(savedMessages) });
    }
  },

  // 회원 메시지 로드 (Firestore에서)
  loadUserMessages: async (userId: string) => {
    const { roomId, messages } = await getMessagesFromLatestRoom(userId);
    set({ roomId, userMessages: messages });
  },

  // 비회원 메시지 비우기 (로그인 시)
  clearGuestMessages: () => {
    sessionStorage.removeItem("guestMessages");
    set({ guestMessages: [] });
  },
}));

export default useChatStore;
