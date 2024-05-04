import { RootState } from "..";

export const selectAuthState = (state: RootState) => state.authSlice;
export const selectAuthToken = (state: RootState) => state.authSlice.token;