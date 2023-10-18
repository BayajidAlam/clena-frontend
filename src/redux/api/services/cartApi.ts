import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

export const CartApi = baseApi.injectEndpoints({
  endpoints: (build: any) => ({
    // add new blog
    addToCart: build.mutation({
      query: (data: any) => ({
        url: "/add-to-cart",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),

    // get all cart item
    getSingleCartItem: build.query({
      query: (id: string) => ({
        url: `/myCart/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),

    // delete a product to cart
    removeItemToCart: build.mutation({
      query: (id: any) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetSingleCartItemQuery,
  useRemoveItemToCartMutation,
} = CartApi;
