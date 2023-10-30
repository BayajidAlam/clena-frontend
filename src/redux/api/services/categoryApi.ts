import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
const CATEGORY_URL = "/categories";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    AddNewCategory: build.mutation({
      query: (data: any) => ({
        url: CATEGORY_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getAllCategory: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CATEGORY_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.admin, tagTypes.category,tagTypes.service],
    }),
    
    // updateAdmin: build.mutation({
    //   query: (data: any) => ({
    //     url: `${ADMIN_URL}/${data.id}`,
    //     method: "PATCH",
    //     data: data.body,
    //   }),
    //   invalidatesTags: [tagTypes.admin],
    // })
  }),
});

export const {
  useAddNewCategoryMutation,
  useGetAllCategoryQuery
} = serviceApi;
