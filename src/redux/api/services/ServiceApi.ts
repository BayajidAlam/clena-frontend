import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
const ADMIN_URL = "/admin";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    addAdminWithFormData: build.mutation({
      query: (data: any) => ({
        url: "/users/create-admin",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service, tagTypes.category, tagTypes.admin],
    }),

    addNewService: build.mutation({
      query: (data: any) => ({
        url: "/create-service",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service, tagTypes.category, tagTypes.admin],
    }),

    getAllServices: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/services",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.admin, tagTypes.category],
    }),

    getAllNewServices: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/new-services",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.admin, tagTypes.category],
    }),

    admin: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ADMIN_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),

    getSingleService: build.query({
      query: (id: string) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service, tagTypes.category, tagTypes.admin],
    }),

    updateSingleService: build.mutation({
      query: (data: any) => ({
        url: `/services/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.category, tagTypes.service],
    }),

    deleteService: build.mutation({
      query: (id: any) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.admin, tagTypes.category, tagTypes.service],
    }),

    updateAdmin: build.mutation({
      query: (data: any) => ({
        url: `${ADMIN_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const {
  useAdminQuery,
  useAddAdminWithFormDataMutation,
  useUpdateAdminMutation,
  useGetAllServicesQuery,
  useAddNewServiceMutation,
  useUpdateSingleServiceMutation,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useGetAllNewServicesQuery
} = serviceApi;
