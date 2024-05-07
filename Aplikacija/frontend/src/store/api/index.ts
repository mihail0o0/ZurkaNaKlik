import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "..";
import * as config from "../../../config.json";
import { logOut, setToken, setUser } from "../auth";
import { LoginResponse } from "./endpoints/auth/types";
// import { setToken } from "../auth";
// import { logoutThunk, setUser } from "../user";
// import { LoginResponse } from "./endpoints/auth/types";

const baseQuery = fetchBaseQuery({
  baseUrl: config.publicApi,
  credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authSlice.accessToken;
    headers.set("authorization", `Bearer ${token}`);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// TODO change this whole method
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error?.status === 401 || result.error?.status === 403) &&
    !result.meta?.request.url.includes("/login")
  ) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult.data) {
      const refreshResultData = refreshResult.data as LoginResponse;

      api.dispatch(setToken(refreshResultData.accessToken));
      api.dispatch(setUser(refreshResultData.user));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

// TODO default reducerPath
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["User"],
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});

export default api;