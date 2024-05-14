import api from "../..";
import { CreateUserDTO, LoginPayload, LoginResponse } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    userSignUp: builder.mutation<LoginResponse, CreateUserDTO>({
      query: (body) => ({
        url: "Auth/RegistrationKorisnik",
        method: "Post",
        body,
      }),
    }),
    userLogin: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "Auth/login", method: "POST", body }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `auth/user/logout`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useLogoutMutation,
} = authApiSlice;
