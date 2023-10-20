"use client";

import Loading from "@/app/loading";
import { useGetSingleCartItemQuery } from "@/redux/api/services/cartApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import {
  useAddNewBookingMutation,
  useDeleteSingleItemFormCartMutation,
} from "@/redux/api/bookingApi";
import { useRouter } from "next/navigation";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import { FormProvider, useForm } from "react-hook-form";

const CartPage = () => {
  const { userId } = getUserInfo();
  const router = useRouter();
  const { data, isLoading: isUserLoading } = useGetSingleUserQuery(userId);
  // @ts-ignore
  const id = data?.data.id;
  const methods = useForm();
  const [quantity, setQuantity] = useState(1);
  const [newDate, setNewDate] = useState(dayjs(new Date()));
  const { data: cartData, isLoading, refetch } = useGetSingleCartItemQuery(id);
  const [addNewBooking, { isLoading: isBookLoading }] =
    useAddNewBookingMutation();
  const [deleteSingleItemFormCart, { isLoading: isCartLoading }] =
    useDeleteSingleItemFormCartMutation();

  // @ts-ignore
  const carts = cartData?.data;
  console.log(carts, "carts");
  // Calculate total price for each item
  // const calculateItemTotal = (item) => {
  //   return item?.service?.price * quantity;
  // };

  // Calculate overall total price
  // const calculateOverallTotal = () => {
  //   return carts?.reduce((total: any, item: any) => {
  //     return total + calculateItemTotal(item);
  //   }, 0);
  // };

  const handleBooking = async (item: any) => {
    console.log(item.id, "item");
    const bookingData = {
      status: "pending",
      booking_schedult: newDate,
      servicesId: item.servicesId,
      userId,
    };
    const res = await addNewBooking(bookingData);

    // @ts-ignore
    if (res?.data?.success) {
      const result = await deleteSingleItemFormCart(item.id);
      // @ts-ignore
      if (result.data.success) {
        refetch();
        message.success("Your booking has been added");
        router.push("/customer/booking");
      }
    }
  };

  const handleOnChange = (date: any, dateString: any) => {
    const isoDate = date?.toISOString();
    setNewDate(isoDate);
    console.log(newDate);
  };

  const disabledDate = (current: any) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  if (isLoading || isUserLoading || isBookLoading) {
    return <Loading />;
  }

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{carts?.length} Items</h2>
            </div>

            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 mx-auto">
                Product Details
              </h3>
              {/* <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Quantity
            </h3> */}
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center mx-auto">
                Price
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center mx-auto">
                Booking Schedule
              </h3>
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center mx-auto">
                {/* Price */}
              </h3>
              {/* <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3> */}
              {/* <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3> */}
            </div>
            {carts?.map((cart: any) => {
              return (
                <>
                  {" "}
                  <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                    <div className="flex w-1/5 mx-auto">
                      <div className="w-20">
                        <Image
                          src={cart?.service?.image}
                          alt={cart?.service?.image}
                          width={70}
                          height={96}
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {cart?.service?.name}
                        </span>
                        <span className="text-red-500 text-xs">Apple</span>
                        <a
                          href="#"
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                        >
                          {/* Remove */}
                        </a>
                      </div>
                    </div>

                    <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                      {`$ ${cart?.service?.price * quantity}`}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                      <FormDatePicker
                        value={dayjs(newDate) || undefined}
                        disabledDate={disabledDate}
                        onChange={handleOnChange}
                        name="booking_schedult"
                      />
                    </span>

                    {cart?.status !== "requested" && (
                      <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                        <button
                          onClick={() => handleBooking(cart)}
                          className="bg-[#fd4f1a] outline-none border-none font-semibold py-2 text-sm text-white uppercase w-40"
                        >
                          Book Now
                        </button>
                      </span>
                    )}
                    {cart?.status == "pending" && (
                      <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                        <button
                          onClick={() => handleBooking(cart)}
                          className="bg-[#fd4f1a] outline-none border-none font-semibold py-2 text-sm text-white uppercase w-40"
                        >
                          Book Now
                        </button>
                      </span>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default CartPage;
