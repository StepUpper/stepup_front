import { create } from "zustand";
import { TChatResponse } from "@/types/chat";
import {
  getMessagesByUserIdAndRoomId,
  getMessagesFromLatestRoom,
  getOlderMessages,
} from "@/apis/firebase/chatFirestore";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface UserMessage {
  type: "user";
  content: string;
}

interface BotMessage {
  type: "bot";
  content: TChatResponse;
  id?: string | null;
}

interface ChatState {
  guestMessages: (UserMessage | BotMessage)[];
  userMessages: (UserMessage | BotMessage)[];
  roomId: string | null;
  lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null;
  setRoomId: (roomId: string) => void;
  addGuestMessage: (message: UserMessage | BotMessage) => void;
  addUserMessage: (message: UserMessage | BotMessage) => void;
  loadGuestMessages: () => void;
  loadUserMessages: (userId: string) => Promise<void>;
  getMessagesByRoomId: (userId: string, roomId: string) => void;
  loadOlderMessages: (userId: string, roomId: string) => Promise<void>;
  clearGuestMessages: () => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  guestMessages: [],
  userMessages: [],
  roomId: null,
  lastVisibleDoc: null,

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
    const { roomId, messages, lastVisibleDoc } =
      await getMessagesFromLatestRoom(userId);

    // 어디서부터 꼬인건지.. 일단 여기서 이렇게 해줘야 에러가 안나긴 한다. 나중에 찾아보자..
    const formattedMessages = messages.map((msg) => {
      if (msg.type === "bot") {
        return {
          type: "bot",
          content: msg.content,
          id: msg.id,
        } as BotMessage;
      } else {
        return {
          type: "user",
          content: msg.content,
        } as UserMessage;
      }
    });
    set({ roomId, userMessages: formattedMessages, lastVisibleDoc });
  },

  // userId와 roomId를 인자로 받아 그에 해당하는 메세지를 가져오는 함수
  getMessagesByRoomId: async (userId: string, roomId: string) => {
    const {
      roomId: fetchedRoomId,
      messages,
      lastVisibleDoc,
    } = await getMessagesByUserIdAndRoomId(userId, roomId);

    // 어디서부터 꼬인건지.. 일단 여기서 이렇게 해줘야 에러가 안나긴 한다. 나중에 찾아보자..
    const formattedMessages = messages.map((msg) => {
      if (msg.type === "bot") {
        return {
          type: "bot",
          content: msg.content,
          id: msg.id,
        } as BotMessage;
      } else {
        return {
          type: "user",
          content: msg.content,
        } as UserMessage;
      }
    });

    set({
      roomId: fetchedRoomId,
      userMessages: formattedMessages,
      lastVisibleDoc,
    });
  },

  loadOlderMessages: async (userId: string, roomId: string) => {
    const { lastVisibleDoc } = get();
    if (!lastVisibleDoc) return; // 마지막 메시지가 없으면 더 이상 로드하지 않음
    const { messages, newLastVisibleDoc } = await getOlderMessages(
      userId,
      roomId,
      lastVisibleDoc
    );

    const formattedMessages = messages.map((msg) => {
      if (msg.type === "bot") {
        return {
          type: "bot",
          content: msg.content,
          id: msg.id,
        } as BotMessage;
      } else {
        return {
          type: "user",
          content: msg.content,
        } as UserMessage;
      }
    });
    set((state) => ({
      userMessages: [...formattedMessages, ...state.userMessages],
      lastVisibleDoc: newLastVisibleDoc,
    }));
  },

  // 비회원 메시지 비우기 (로그인 시)
  clearGuestMessages: () => {
    sessionStorage.removeItem("guestMessages");
    set({ guestMessages: [] });
  },
}));

export default useChatStore;
