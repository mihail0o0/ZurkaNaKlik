import api from "../..";
import { providesList } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "Agencija/VratiKategorije",
      }),
      providesTags: (result) => providesList("Agency", result),
    }),
    addCategory: builder.mutation<Category, AddCategoryDTO>({
      query: (body) => ({
        url: "Agencija/DodajKategoriju",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Agency", id: result?.id },
        { type: "Agency", id: "LISTAGENCY" },
      ],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Agencija/ObrisiKategoriju/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "Agency", id: arg },
        { type: "Agency", id: "LISTAGENCY" },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = authApiSlice;
