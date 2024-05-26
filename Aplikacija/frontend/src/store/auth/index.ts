import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { User } from "@/models/user";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.accessToken = payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
    },
    setIsFirstLogin: (state, { payload }: PayloadAction<boolean>) => {
      state.firstLogin = payload;
    },
  },
});

export const { setToken, setUser, logOut, setIsFirstLogin } = authSlice.actions;
export * from "./selectors";
export default authSlice.reducer;
