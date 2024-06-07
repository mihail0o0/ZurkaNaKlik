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
        url: `Pregled/VartiMenije/Lista/listaMenija`,
      }),
    }),
  }),
});

export const {
  useGetAgencyMenuesQuery,
  useGetAgencyListMenuesQuery,
} = authApiSlice;
