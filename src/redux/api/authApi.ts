import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    userLogin: build.mutation({
      query: (loginData: any) => ({
        url: `${AUTH_URL}/signin`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    userSignUp: build.mutation({
      query: (loginData: any) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
  overrideExisting: false,
});

export const { useUserLoginMutation, useUserSignUpMutation } = authApi;
