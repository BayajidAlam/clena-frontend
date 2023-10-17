import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
const ADMIN_URL = "/admin";

export const BlogAndFaqApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // add new blog
    addNewBlog: build.mutation({
      query: (data: any) => ({
        url: "/blog/create-blog",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // add new Faq
    addNewFaq: build.mutation({
      query: (data: any) => ({
        url: "/blog/create-faq",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // get all blogs
    getAllBlogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/blogs",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.blog],
    }),

    // get all faqs
    getAllFaqs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/faqs",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.blog],
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
  }),
});

export const {
  useAddNewBlogMutation,
  useAddNewFaqMutation,
  useGetAllBlogsQuery,
  useGetAllFaqsQuery,
} = BlogAndFaqApi;
