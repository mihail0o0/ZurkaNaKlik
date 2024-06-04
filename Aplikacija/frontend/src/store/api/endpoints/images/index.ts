import api from "../..";
import { providesSingle } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query<string, string>({
      query: (location) => ({
        url: `Pregled/get-sliku/${location}`,
      }),
      transformResponse: (response) => URL.createObjectURL(response as Blob),
      //   invalidatesTags: (result) => [{ type: "Image", id: "IMAGEKORISNIK" }],
    }),
    uploadKorisnik: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "Korisnik/uploadKorisnik",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result) => [{ type: "Image", id: "IMAGEKORISNIK" }],
    }),
  }),
});

export const { useGetImageQuery, useUploadKorisnikMutation } = authApiSlice;
