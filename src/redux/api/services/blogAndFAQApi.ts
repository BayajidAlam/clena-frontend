import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
const BLOGS_URL = "/blogs";
const FAQ_URL = "/faqs";

export const BlogAndFaqApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // add new blog
    addNewBlog: build.mutation({
      query: (data: any) => ({
        url: `${BLOGS_URL}/create-blog`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // add new faq
    addNewFeedBack: build.mutation({
      query: (data: any) => ({
        url: "/feedbacks/my-feedback",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedback],
    }),

    // add new Faq
    addNewFaq: build.mutation({
      query: (data: any) => ({
        url: `${FAQ_URL}/create-faq`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // add new review
    addNewReview: build.mutation({
      query: (data: any) => ({
        url: "/reviews",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    // get all reviews
    getAllReviews: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: "/reviews",
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
          url: BLOGS_URL,
          method: "GET",
        };
      },
      providesTags: [tagTypes.blog],
    }),

    // get all faqs
    getAllFaqs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FAQ_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.faq],
    }),


    // get single blog
    getSingleBlog: build.query({
      query: (id: string) => ({
        url: `/${BLOGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // get single faq
    getSingleFaq: build.query({
      query: (id: string) => ({
        url: `/${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),

    // update blog
    updateSingleBlog: build.mutation({
      query: (data: any) => ({
        url: `/${BLOGS_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // update blog
    updateSingleFaq: build.mutation({
      query: (data: any) => ({
        url: `/${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.faq],
    }),

    // delete blog
    deleteBlog: build.mutation({
      query: (id: any) => ({
        url: `/${BLOGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // delete blog
    deleteFaq: build.mutation({
      query: (id: any) => ({
        url: `/${FAQ_URL}/${id}`,
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
  useAddNewFeedBackMutation
} = BlogAndFaqApi;
