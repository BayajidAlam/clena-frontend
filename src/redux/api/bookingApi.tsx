import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "./baseApi";
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

    // get all bookings
    getAllBookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/bookings",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.admin, tagTypes.category],
    }),

    // update booking status
    updateBookingStatus: build.mutation({
      query: (data: any) => ({
        url: `/bookings/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [
        tagTypes.admin,
        tagTypes.bookings,
        tagTypes.service,
        tagTypes.user,
      ],
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
  useGetAllBookingsQuery, //get all bookings
  useAddNewServiceMutation,
  useUpdateSingleServiceMutation,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useUpdateBookingStatusMutation, //update booking status
} = serviceApi;