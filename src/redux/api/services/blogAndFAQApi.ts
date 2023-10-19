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
      invalidatesTags: [tagTypes.faq],
    }),

    // add new review
    addNewReview: build.mutation({
      query: (data: any) => ({
        url: "/my-review",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    // get all reviews
    getAllReviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/all-review",
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    // get all blogs
    getAllBlogs: build.query({
      query: () => {
        return {
          url: "/blogs",
          method: "GET",
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
      providesTags: [tagTypes.faq],
    }),


    // get single blog
    getSingleBlog: build.query({
      query: (id: string) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // get single faq
    getSingleFaq: build.query({
      query: (id: string) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
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

    // update blog
    updateSingleFaq: build.mutation({
      query: (data: any) => ({
        url: `/faq/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // delete blog
    deleteBlog: build.mutation({
      query: (id: any) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete blog
    deleteFaq: build.mutation({
      query: (id: any) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
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
  useDeleteBlogMutation,
  useGetSingleFaqQuery,
  useUpdateSingleFaqMutation,
  useDeleteFaqMutation,
  useAddNewReviewMutation,
  useGetAllReviewsQuery,
} = BlogAndFaqApi;
