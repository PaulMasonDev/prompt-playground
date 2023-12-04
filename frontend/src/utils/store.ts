import { create } from "zustand";

interface User {
  username: string;
  settings: any;
}

interface UserStore {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: (userData: User | null) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: {} as User,
  isLoading: false,
  isLoggedIn: false,
  recipes: [],
  setUser: (userData: User | null) => {
    set(() => ({
      user: userData,
      isLoggedIn: true,
    }));
  },
  setLoading: (value: boolean) => {
    set(() => ({
      isLoading: value,
    }));
  },
  logout: () => {
    set(() => ({
      isLoggedIn: false,
    }));
  },
}));

export default useUserStore;
