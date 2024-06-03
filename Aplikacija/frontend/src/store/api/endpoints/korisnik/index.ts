import api from "../..";
import { providesList, providesSingle } from "../../utils";
import { OglasObjekata } from "../oglas/types";
import { AllUserData } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<AllUserData, number>({
      query: (id) => ({
        url: `Pregled/GetKorisnik/${id}`,
      }),
      providesTags: (result) => providesSingle("User", result?.id),
    }),
    // updateUser: builder.mutation<AllUserData, number>({
    //   query: (id) => ({
    //     url: `Pregled/GetKorisnik/${id}`,
    //   }),
    //   providesTags: (result) => providesSingle("User", result?.id),
    // }),
    getFavourites: builder.query<OglasObjekata[], void>({
      query: () => ({
        url: "Pregled/PrikaziSveOmiljeneOglase",
      }),
      providesTags: (result) => providesList("OmiljeniOglasi", result),
    }),
    addFavourite: builder.mutation<OglasObjekata, number>({
      query: (id) => ({
        url: `Pregled/DodajOmiljeniOglas/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "OmiljeniOglasi", id: result?.id },
        { type: "OmiljeniOglasi", id: "LISTOMILJENIOGLASI" },
      ],
    }),
    deleteFavourite: builder.mutation<OglasObjekata, number>({
      query: (id) => ({
        url: `Pregled/ObrisiOmiljeniOglas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "OmiljeniOglasi", id: result?.id },
        { type: "OmiljeniOglasi", id: "LISTOMILJENIOGLASI" },
      ],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
} = authApiSlice;
