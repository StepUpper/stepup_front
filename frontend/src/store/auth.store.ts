import { getUserData } from "@apis/firebase/auth";
import { TUser } from "@type/auth";
import { create } from "zustand";

type likeShoes =
  | {
      shoeId: string;
      productName: string;
      imgUrl: string;
      modelNo: string;
      brand: string;
      customerLink: string;
      customerImg?: string | null;
      price?: number | null;
    }[]
  | null;

type shoeCloset =
  | {
      closetId: string;
      image: string;
      brand: string;
      modelName: string;
      rating: number;
      len: string;
      width: string;
      height: string;
      soft: string;
      weight: string;
      recommendSize: string;
      text: string;
    }[]
  | null;

interface UserState {
  isLoggedIn: boolean;
  user: TUser | null;
  // 좋아요한 신발들을 관리하기 위한 상태
  likeShoes: likeShoes;
  // 신발장의 신발들 관리하는 상태
  shoeCloset: shoeCloset;
  updateUserInfo: () => Promise<TUser | undefined>; // async 함수는 암묵적으로 Promise를 반환한다.
  setUserInfo: (key: string, value: string | number) => void;
  setIsLoggedIn: (state: boolean) => void;
}

const userStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  likeShoes: null,
  shoeCloset: null,
  updateUserInfo: async () => {
    try {
      const data = await getUserData();
      if (data) {
        const { likeShoes, shoeCloset, ...userData } = data;
        set({
          user: userData as TUser,
          likeShoes: likeShoes as likeShoes,
          shoeCloset: shoeCloset as shoeCloset,
        });
        return userData;
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error(error);
    }
  },
  setUserInfo: (key: string, value: string | number) => {
    set((user) => ({ ...user, [key]: value }));
  },
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}));

export default userStore;
