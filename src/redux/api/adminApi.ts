
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const USER_URL = "/users";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    addAdminWithFormData: build.mutation({
      query: (data: any) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.admin],
    }),

    

    admins: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: USER_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.admin],
    }),
    admin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    updateRole: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id: any) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAdminsQuery,
  useAdminQuery,
  useAddAdminWithFormDataMutation,
  useUpdateRoleMutation,
  useDeleteAdminMutation,
} = adminApi;
