"use client";

import Loading from "@/app/loading";
import ReviewComponent from "@/components/Forms/ReviewAndRatings";
import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import Providers from "@/lib/Providers";
import { getUserInfo } from "@/services/auth.service";
import { Button, Rate, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleServicePage = ({ params }: any) => {
  const [serviceId,setServiceId] = useState("");
  const { userId } = getUserInfo();
  const [productData, setProductData] = useState({});
  const [addToCart, setAddToCart] = useState("");
  const [loading, setLoading] = useState(false);
  const prdid = params.slug;

  const router = useRouter();

  const apiUrl = `http://localhost:5000/api/v1/services/${prdid}`;
  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductData(data?.data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    setLoading(false);

    setServiceId(prdid);
  }, [apiUrl, prdid]);

  const { image, name, details, price, rating, id }: any = productData;

  const handleAddToCart = (id: any) => {
    setLoading(true);
    const cartData = {
      userId,
      servicesId: id,
    };
    // Define the URL you want to make a POST request to
    const cartApiUrl = `http://localhost:5000/api/v1/add-to-cart`; // Replace with your API endpoint

    fetch(cartApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.success) {
          message.success("Added to cart successfully!");
          router.push("/customer/cart");
        }
        setAddToCart(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
    setLoading(false);
  };

  if (!!loading) {
    return <Loading />;
  }

  return (
    <Providers>
      <div>
        <HomeHeader />

        <section className="text-gray-700 body-font overflow-hidden bg-white">
          <div className="container px-5 pt-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                width={400}
                height={600}
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src={image}
                alt="Single product details"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {name}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  The Catcher in the Rye
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <Rate allowHalf defaultValue={rating} />
                    <span className="text-gray-600 ml-3"> Reviews</span>
                  </span>
                  <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a className="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a className="ml-2 text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p className="leading-relaxed h-60">{details}</p>
                {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div> */}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    $ {price}
                  </span>
                  <Button
                    onClick={() => handleAddToCart(id)}
                    className="flex ml-auto text-white bg-[#ff5100] border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ReviewComponent serviceId={serviceId}/>
        </section>
        <Footer />
      </div>
    </Providers>
  );
};

export default SingleServicePage;
