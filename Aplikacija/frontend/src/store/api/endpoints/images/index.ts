import api from "../..";
import { providesSingle } from "../../utils";
import { UploadOglasDTO } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query<string, string>({
      query: (location) => ({
        url: `Pregled/get-sliku/${location}`,
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: (response) => URL.createObjectURL(response as Blob),
      providesTags: () => [
        { type: "Image", id: "IMAGEOGLAS" },
        { type: "Image", id: "IMAGEKORISNIK" },
      ],
    }),
    uploadKorisnik: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "Korisnik/uploadKorisnik",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: () => [
        { type: "User", id: "LISTUSER" },
        { type: "Image", id: "IMAGEKORISNIK" },
      ],
    }),
    uploadOglas: builder.mutation<void, UploadOglasDTO>({
      query: (body) => ({
        url: `Korisnik/uploadOglas/${body.id}`,
        method: "POST",
        body: body.formData,
      }),
      invalidatesTags: (result, err, args) => [
        { type: "Oglas", id: args.id },
        { type: "Image", id: "IMAGEOGLAS" },
      ],
    }),
  }),
});

export const {
  useGetImageQuery,
  useLazyGetImageQuery,
  useUploadKorisnikMutation,
  useUploadOglasMutation,
} = authApiSlice;
