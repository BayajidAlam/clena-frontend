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

    // get single blog
    getSingleBlog: build.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // update blog
    updateSingleBlog: build.mutation({
      query: (data: any) => ({
        url: `/blog/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete blog
    deleteBlog: build.mutation({
      query: (id: any) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAddNewBlogMutation,
  useAddNewFaqMutation,
  useGetAllBlogsQuery,
  useGetAllFaqsQuery,
  useGetSingleBlogQuery,
  useUpdateSingleBlogMutation,
  useDeleteBlogMutation
} = BlogAndFaqApi;
