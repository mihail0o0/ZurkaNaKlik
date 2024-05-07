import { User } from "@/models/user";
import api from "../..";
import { LoginPayload } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<User, LoginPayload>({
      query: (body) => ({ url: "auth/login", method: "POST", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `auth/user/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useUserLoginMutation, useLogoutMutation } = authApiSlice;
