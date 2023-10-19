import React, { useState } from "react";
import { Rate, Input, Button, message, Card, Avatar } from "antd";
import {
  useAddNewReviewMutation,
  useGetAllReviewsQuery,
} from "@/redux/api/services/blogAndFAQApi";
import Loading from "@/app/loading";
import Meta from "antd/es/card/Meta";
import Image from "next/image";

const { TextArea } = Input;

const ReviewComponent = ({ serviceId }: any) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const { data, isLoading, refetch } = useGetAllReviewsQuery({});
  // @ts-ignore
  const reviews = data?.data;
  const [addNewReview, { isLoading: isReviewLoading }] =
    useAddNewReviewMutation();

  const handleRatingChange = (value: any) => {
    setRating(value);
  };

  const handleReviewChange = (e: any) => {
    setReview(e.target.value);
  };

  const handleSubmit = async () => {
    const reviewData = {
      servicesId: serviceId,
      rating,
      review,
    };
    const res = await addNewReview(reviewData);
    // @ts-ignore
    if (res?.data?.success) {
      setRating(0);
      setReview("");
      message.success("Review added successfully");
      refetch();
    }
  };

  if (isLoading || isReviewLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        width: "75%",
        margin: "80px auto",
      }}
    >
      <div>
        <div className="grid grid-cols-2 items-center ">
          {reviews?.map((review: any, index: number) => {
            return (
              <>
                <ul className="">
                  <li
                    style={{
                      border: "1px solid gray",
                      listStyle: "none",
                      height: "160px",
                    }}
                    className="py-4 text-left  px-4 m-2"
                  >
                    <div className="flex items-start">
                      <Image
                        className="block h-10 w-10 max-w-full flex-shrink-0 rounded-full align-middle"
                        src={review?.service?.image}
                        alt={review?.service.image}
                        width={40}
                        height={40}
                      ></Image>

                      <div className="ml-6">
                        <p className=" text-xl font-bold text-gray-900">
                          {review?.service?.name}
                        </p>

                        <p className="mt-5 text-base text-gray-900">
                          {review?.review}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          March 01, 2022
                        </p>
                        <div className="flex items-center">
                          <svg
                            className="block h-6 w-6 align-middle text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                            ></path>
                          </svg>
                          <svg
                            className="block h-6 w-6 align-middle text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                            ></path>
                          </svg>
                          <svg
                            className="block h-6 w-6 align-middle text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                            ></path>
                          </svg>
                          <svg
                            className="block h-6 w-6 align-middle text-yellow-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                            ></path>
                          </svg>
                          <svg
                            className="block h-6 w-6 align-middle text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              className=""
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </>
            );
          })}
        </div>

        <div className="w-96 space-y-2 py-4">
          <h2>Write your Review</h2>
          <div className="space-y-1">
            <Rate value={rating} onChange={handleRatingChange} />
          </div>
          <div>
            <p>Review:</p>
            <TextArea
              rows={4}
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here..."
            />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
