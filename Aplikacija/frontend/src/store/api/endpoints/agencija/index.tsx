import api from "../..";
import { providesList } from "../../utils";

const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({
        url: "Agencija/VratiKategorije",
      }),
      providesTags: (result) => providesList("AgencyCategory", result),
    }),
    addCategory: builder.mutation<Category, AddCategoryDTO>({
      query: (body) => ({
        url: "Agencija/DodajKategoriju",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "AgencyCategory", id: result?.id },
        { type: "AgencyCategory", id: "LISTAGENCY" },
      ],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Agencija/ObrisiKategoriju/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "AgencyCategory", id: arg },
        { type: "AgencyCategory", id: "LISTAGENCY" },
      ],
    }),
    // meniji
    getMenues: builder.query<GetMenuDTO[], void>({
      query: () => ({
        url: "Agencija/VratiSveMenije",
      }),
      providesTags: (result) => providesList("AgencyMenu", result),
    }),
    addMenu: builder.mutation<Menu, AddMenuDTO>({
      query: (addMenu) => ({
        url: `Agencija/DodajMeni/${addMenu.id}`,
        method: "POST",
        body: addMenu.menu,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "AgencyMenu", id: result?.id },
        { type: "AgencyMenu", id: "LISTAGENCYMENU" },
      ],
    }),
    updateMenu: builder.mutation<Menu, Menu>({
      query: (body) => ({
        url: `Agencija/AzurirajMeni`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "AgencyMenu", id: result?.id },
        { type: "AgencyMenu", id: "LISTAGENCYMENU" },
      ],
    }),
    deleteMenu: builder.mutation<Menu, number>({
      query: (id) => ({
        url: `Agencija/ObrisiMeni/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, err, arg) => [
        { type: "AgencyMenu", id: arg },
        { type: "AgencyMenu", id: "LISTAGENCYMENU" },
      ],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = authApiSlice;
