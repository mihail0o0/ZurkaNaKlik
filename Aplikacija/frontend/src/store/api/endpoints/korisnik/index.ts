import api from "../..";
import { providesList, providesSingle } from "../../utils";
import { AllUserData } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<AllUserData, number>({
      query: (id) => ({
        url: `Korisnik/GetKorisnik/${id}`,
      }),
      providesTags: (result) => providesSingle("User", result?.id),
    }),
  }),
});

export const { useGetUserDataQuery } = authApiSlice;
