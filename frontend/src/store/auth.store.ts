import { getUserData } from "@/apis/firebase/auth";
import { TUser } from "@/types/auth";
import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  user: TUser | null;
  updateUserInfo: () => void;
  setUserInfo: (key: string, value: string | number) => void;
  setIsLoggedIn: (state: boolean) => void;
}

const userStore = create<UserState>((set) => ({
  isLoggedIn: false,
  user: null,
  updateUserInfo: () => {
    getUserData().then((data) => {
      set({ user: data as TUser });
    });
  },
  setUserInfo: (key: string, value: string | number) => {
    set((user) => ({ ...user, [key]: value }));
  },
  setIsLoggedIn: (state) => set({ isLoggedIn: state }),
}));

export default userStore;
