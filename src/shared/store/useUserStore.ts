import { create } from "zustand";

interface UserInfoState {
  loginStatus: boolean;
  setLoginStatus: (status: boolean) => void;
}

const useUserStore = create<UserInfoState>((set) => ({
  loginStatus: false,
  setLoginStatus: (status) => set({ loginStatus: status }),
}));

export default useUserStore;
