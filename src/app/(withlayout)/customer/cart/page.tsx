"use client";

import Loading from "@/app/loading";
import { useGetSingleCartItemQuery } from "@/redux/api/services/cartApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { DatePicker, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import dayjs from "dayjs";
import {
  useAddNewBookingMutation,
  useDeleteSingleItemFormCartMutation,
} from "@/redux/api/bookingApi";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { userId } = getUserInfo();
  const router = useRouter();
  const {
    data,
    isLoading: isUserLoading,
  } = useGetSingleUserQuery(userId);
  // @ts-ignore
  const id = data?.data.id;
  const [quantity, setQuantity] = useState(1);
  const [newDate, setNewDate] = useState(dayjs(new Date()));
  const { data: cartData, isLoading,refetch } = useGetSingleCartItemQuery(id);
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
        router.push("/customer/booking")
      }
    }
  };

  const handleOnChange = (date: any, dateString: any) => {
    const isoDate = date?.toISOString();
    setNewDate(isoDate);
  };

  const disabledDate = (current: any) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  if (isLoading || isUserLoading || isBookLoading) {
    return <Loading />;
  }

  return (
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
                  {/* quantity section  */}
                  {/* <div className="flex justify-center w-1/5 border-none hover:bg-gray-100">
                    <div className="flex items-center justify-center">
                      <Button
                        className="bg-none border-none text-xl hover:text-[#fd4f1a]"
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        <AiOutlineMinusSquare />
                      </Button>
                      <input
                        className="mx-2 text-center w-8 h-8 "
                        type="text"
                        value={quantity}
                      />
                      <Button
                        className="bg-none border-none text-xl hover:text-[#fd4f1a]"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <AiOutlinePlusSquare />
                      </Button>
                    </div>
                  </div> */}

                  <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                    {`$ ${cart?.service?.price * quantity}`}
                  </span>
                  <span className="text-center w-1/5 font-semibold text-sm mx-auto">
                    <DatePicker
                      defaultValue={dayjs(newDate) || undefined}
                      disabledDate={disabledDate}
                      onChange={handleOnChange}
                    />
                  </span>
                  {/* <span className="text-center w-1/5 font-semibold text-sm">
                    $400.00
                  </span> */}
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

          {/* <div className="flex justify-between items-center mx-12">
            <a
              href="#"
              className="flex font-semibold text-indigo-600 text-sm mt-10 "
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div> */}
        </div>

        {/* <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">{carts?.length}</span>
            <span className="font-semibold text-sm">
              {calculateOverallTotal()}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
              <option>Special delivery - $16.6.00</option>
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>

            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full"
            />
          </div>
          <button className="bg-[#fd4f1a] border-none px-5 py-2 text-sm text-white uppercase">
            Apply
          </button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>{calculateOverallTotal()}</span>
            </div>
            <button onClick={()=>handleBooking()} className="bg-[#fd4f1a] outline-none border-none font-semibold py-3 text-sm text-white uppercase w-full">
              Book Now
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CartPage;
