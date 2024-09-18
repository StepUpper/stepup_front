import { getUserData } from "@/apis/firebase/auth";
import { TUser } from "@/types/auth";
import { create } from "zustand";

interface UserState {
  user: TUser | null;
  updateUserInfo: () => void;
  setUserInfo: (key: string, value: string | number) => void;
}

const userStore = create<UserState>((set) => ({
  user: null,
  updateUserInfo: () => {
    getUserData().then((data) => {
      set({ user: data });
    });
  },
  setUserInfo: (key: string, value: string | number) => {
    set((user) => ({ ...user, [key]: value }));
  },
}));

export default userStore;
