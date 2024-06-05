import api from "../..";
import { providesList, providesSingle } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAgencyMenues: builder.query<GetMenuDTO[], number>({
      query: (id) => ({
        url: `Pregled/VratiSveKategorijeIMenijeAgencije/${id}`,
      }),
    }),
  }),
});

export const {
  useGetAgencyMenuesQuery,
} = authApiSlice;
