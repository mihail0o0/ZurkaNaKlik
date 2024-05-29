import api from "../..";
import { providesList, providesSingle } from "../../utils";
import { FiltersPaginationData, GetOglasData, OglasObjekata } from "./types";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.query<string[], void>({
      query: () => ({
        url: "Oglas/VratiSveGradove",
      }),
      providesTags: () => providesList("Location"),
    }),
    getFilteredOglases: builder.query<OglasObjekata[], GetOglasData>({
      query: (body) => ({
        url: `Oglas/VratiOglase/${body.pageData.pageNumber}/${body.pageData.pageSize}`,
        method: "POST",
        body: body.filters,
      }),
      providesTags: (result) => providesList("Oglas", result),
    }),
    getOglas: builder.query<OglasObjekata, number>({
      query: (id) => ({
        url: `Oglas/PrikaziOglas/${id}`,
      }),
      providesTags: (result) => providesSingle("Oglas", result?.id),
    }),
    getUserOglasi: builder.query<OglasObjekata[], void>({
      query: () => ({
        url: `Korisnik/PrikaziOglaseKorisnika`,
      }),
      providesTags: (result) => providesList("Oglas", result),
    }),
  }),
});

export const { useGetAllCitiesQuery, useGetFilteredOglasesQuery } =
  authApiSlice;
