import { getUserData } from "@/apis/firebase/auth";
import { TUser } from "@/types/auth";
import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  user: TUser | null;
  // 좋아요한 신발들을 관리하기 위한 상태 추가
  likeShoes:
    | {
        shoeId: string;
        title?: string;
        imgUrl?: string;
        modelNo?: string;
        brand?: string;
        customerLink?: string;
        customerImg?: string | null;
        price?: number | null;
      }[]
    | null;
  updateUserInfo: () => void;
  setUserInfo: (key: string, value: string | number) => void;
  setIsLoggedIn: (state: boolean) => void;
}

const userStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  likeShoes: null,
  updateUserInfo: () => {
    getUserData().then((data) => {
      if (data) {
        const { likeShoes, ...userData } = data;
        set({ user: userData as TUser, likeShoes: likeShoes || [] });
      }
    });
  },
  setUserInfo: (key: string, value: string | number) => {
    set((user) => ({ ...user, [key]: value }));
  },
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}));

export default userStore;
