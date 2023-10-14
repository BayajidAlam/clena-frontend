import React from "react";
import ServiceImage from "../../assets/window.jpg";
import Image from "next/image";
const HomeService = () => {
  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
    >
        <h1 className="my-4">Available Service</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 items-center gap-6">


        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[350px] md:w-[300px] h-[400px] lg:w-[350px]">
          <Image
            src={ServiceImage}
            alt="image"
            className="md:w-[280px] lg:w-[350px] w-[350px]"
            width={350}
            height={200}
          ></Image>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Window Cleaning</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla!
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[350px] md:w-[300px] h-[400px] lg:w-[350px]">
          <Image
            src={ServiceImage}
            alt="image"
            className="md:w-[280px] lg:w-[350px] w-[350px]"
            width={350}
            height={200}
          ></Image>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Window Cleaning</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla!
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[350px] md:w-[300px] h-[400px] lg:w-[350px]">
          <Image
            src={ServiceImage}
            alt="image"
            className="md:w-[280px] lg:w-[350px] w-[350px]"
            width={350}
            height={200}
          ></Image>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Window Cleaning</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla!
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>

        <div className="max-w-sm rounded overflow-hidden shadow-lg w-[350px] md:w-[300px] h-[400px] lg:w-[350px]">
          <Image
            src={ServiceImage}
            alt="image"
            className="md:w-[280px] lg:w-[350px] w-[350px]"
            width={350}
            height={200}
          ></Image>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Window Cleaning</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla!
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span>
          </div>
        </div>


      </div>
    </div>
  );
};

export default HomeService;
