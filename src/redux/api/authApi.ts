import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi"
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
        query: (loginData) => ({
            url:`${ AUTH_URL}/signin`,
            method: "POST",
            data: loginData
        }),
        invalidatesTags:[tagTypes.user]
    }),
  }),
  overrideExisting: false,
})

export const { useUserLoginMutation } = authApi