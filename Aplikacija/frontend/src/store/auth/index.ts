import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { AuthState } from "./types";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<AuthState>) => {
      state.token = payload.token;
      state.user = payload.user;
    },
    logOut: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, logOut } = authSlice.actions;
export * from "./selectors";
export default authSlice.reducer;
