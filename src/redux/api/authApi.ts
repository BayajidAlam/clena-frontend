import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build:any) => ({
    userLogin: build.mutation({
        query: (loginData:any) => ({
            url:`${ AUTH_URL}/signin`,
            method: "POST",
            data: loginData
        }),
        invalidatesTags:[tagTypes.customer]
    }),
  }),
  overrideExisting: false,
})

export const { useUserLoginMutation } = authApi