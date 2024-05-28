// import api from "../..";
// import { providesList } from "../../utils";
// import { KorisnikType } from "./types";

// const authApiSlice = api.injectEndpoints({
//     endpoints: (builder) => ({
//         getCurrentUser: builder.query<KorisnikType, number>({
//             query: (id) => ({
//               url: `Korisnik/GetKorisnik/${id}`,
//               method: "GET",
//             }), 
//     providesTags: (result) => providesList("AgencyCategory", result),
// }),
// })