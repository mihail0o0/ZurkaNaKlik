import { RootState } from "..";

export const selectAuthState = (state: RootState) => state.authSlice;
export const selectAuthToken = (state: RootState) => state.authSlice.token;
export const selectUser = (state: RootState) => state.authSlice.user;
