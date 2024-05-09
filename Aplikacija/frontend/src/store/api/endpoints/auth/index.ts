import { User } from "@/models/user";
import api from "../..";
import { LoginPayload } from "./types";
import { providesSingle } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<User, LoginPayload>({
      query: (body) => ({ url: "Auth/login", method: "POST", body }),
      // providesTags: (result) => providesSingle('')
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
