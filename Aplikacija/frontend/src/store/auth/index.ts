import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string | null>) => {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;

export * from "./selectors";

export default authSlice.reducer;
