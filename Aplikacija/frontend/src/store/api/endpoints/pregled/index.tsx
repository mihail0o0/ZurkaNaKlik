import api from "../..";
import { providesList, providesSingle } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyMenues: builder.query<GetMenuDTO[], number>({
      query: (id) => ({
        url: `Pregled/VratiSveKategorijeIMenijeAgencije/${id}`,
      }),
    }),
    getAgencyListMenues: builder.query<MenuForList[], number[]>({
      query: (ids) => ({
        url: `Pregled/VratiMenije/Lista/listaMenija`,
      }),
    }),

    getAllCategories: builder.query<string[], void>({
      query: () => ({
        url: `Oglas/VratiNaziveKategorija`,
      }),
      // providesTags: (result) => providesList("Categories", result),
    }),
  }),
});

export const {
  useGetAgencyMenuesQuery,
  useGetAgencyListMenuesQuery,
  useGetAllCategoriesQuery,
} = authApiSlice;
