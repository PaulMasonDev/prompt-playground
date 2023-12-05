import { create } from "zustand";

interface User {
  username: string;
  settings: any;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  loadingMessage: string;
  isLoggedIn: boolean;
  setUser: (userData: User | null) => void;
  setLoading: (value: boolean, message?: string) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {} as User,
  isLoading: false,
  loadingMessage: "",
  isLoggedIn: false,
  recipes: [],
  setUser: (userData: User | null) => {
    set(() => ({
      user: userData,
      isLoggedIn: true,
    }));
  },
  setLoading: (value: boolean, message?: string) => {
    set(() => ({
      isLoading: value,
      loadingMessage: message || "",
    }));
  },
  logout: () => {
    set(() => ({
      isLoggedIn: false,
    }));
  },
}));

export default useUserStore;
