import { tagTypes } from "@/redux/tag-types";
import { IAcademicDepartment, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: (data: any) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.customer, tagTypes.admin],
    }),

    // delete  user
    deleteSingleUser: build.mutation({
      query: (id: any) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteSingleUserMutation,
} = userApi;
