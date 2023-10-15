import { tagTypes } from "@/redux/tag-types";
import { IAcademicDepartment, IMeta } from "@/types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    // academicDepartments: build.query({
    //   query: (arg: Record<string, any>) => {
    //     return {
    //       url: ACADEMIC_DEPARTMENT_URL,
    //       method: "GET",
    //       params: arg,
    //     };
    //   },
    //   transformResponse: (response: IAcademicDepartment[], meta: IMeta) => {
    //     return {
    //       academicDepartments: response,
    //       meta,
    //     };
    //   },
    //   providesTags: [tagTypes.academicDepartment],
    // }),
    // // get single academic department
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `${USER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    // // create a new academic department
    // addAcademicDepartment: build.mutation({
    //   query: (data) => ({
    //     url: ACADEMIC_DEPARTMENT_URL,
    //     method: "POST",
    //     data,
    //   }),
    //   invalidatesTags: [tagTypes.academicDepartment],
    // }),
    // // update ac department
    // updateAcademicDepartment: build.mutation({
    //   query: (data) => ({
    //     url: `${ACADEMIC_DEPARTMENT_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.academicDepartment],
    // }),

    // // delete ac department
    // deleteAcademicDepartment: build.mutation({
    //   query: (id) => ({
    //     url: `${ACADEMIC_DEPARTMENT_URL}/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: [tagTypes.academicDepartment],
    // }),
  }),
});

export const { useGetSingleUserQuery } = userApi;
