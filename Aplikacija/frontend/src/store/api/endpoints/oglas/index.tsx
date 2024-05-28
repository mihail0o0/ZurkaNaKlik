import api from "../..";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCities: builder.query<string[], void>({
      query: () => ({
        url: "Oglas/VratiSveGradove",
      }),
    }),
  }),
});

export const { useGetAllCitiesQuery } = authApiSlice;
