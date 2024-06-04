import api from "../..";
import { providesList, providesSingle } from "../../utils";
import { OglasObjekata } from "../oglas/types";
import { AllUserData, UpdateUserDTO } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserData: builder.query<AllUserData, number>({
      query: (id) => ({
        url: `Pregled/GetKorisnik/${id}`,
      }),
      providesTags: (result) => providesSingle("User", result?.id),
    }),
    updateUser: builder.mutation<AllUserData, UpdateUserDTO>({
      query: (body) => ({
        url: "Korisnik/IzmeniPodatkeOKorisniku",
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "User", id: result?.id },
        { type: "User", id: "LISTUSER" },
      ],
    }),
    getFavourites: builder.query<OglasObjekata[], void>({
      query: () => ({
        url: "Korisnik/PrikaziSveOmiljeneOglase",
      }),
      providesTags: (result) => providesList("OmiljeniOglasi", result),
    }),
    addFavourite: builder.mutation<OglasObjekata, number>({
      query: (id) => ({
        url: `Korisnik/DodajOmiljeniOglas/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "OmiljeniOglasi", id: result?.id },
        { type: "OmiljeniOglasi", id: "LISTOMILJENIOGLASI" },
      ],
    }),
    deleteFavourite: builder.mutation<OglasObjekata, number>({
      query: (id) => ({
        url: `Korisnik/ObrisiOmiljeniOglas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "OmiljeniOglasi", id: result?.id },
        { type: "OmiljeniOglasi", id: "LISTOMILJENIOGLASI" },
      ],
    }),
    deleteUser: builder.mutation<void, number>({
      query: () => ({
        url: `Korisnik/ObrisiKorisnika`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "User", id: arg },
        { type: "User", id: "LISTUSER" },
      ],
    }),
    isFavorite: builder.query<boolean, number>({
      query: (id) => ({
        url: `Korisnik/DaLiOmiljen/${id}`,
      }),
      providesTags: (result, error, id) => {
        if (error) {
          return [{ type: 'User' }, { type: 'OmiljeniOglasi', id }];
        }
        return [{ type: 'OmiljeniOglasi', id }];
      },
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useUpdateUserMutation,
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useDeleteFavouriteMutation,
  useDeleteUserMutation,
  useIsFavoriteQuery,
} = authApiSlice;
