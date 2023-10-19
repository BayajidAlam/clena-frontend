"use client";

import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";
import { useGetAllServicesQuery } from "@/redux/api/services/ServiceApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import React, { useState } from "react";
import Loading from "../loading";
import { Button, Col, Input, Rate, Row, Select } from "antd";
import Link from "next/link";
import { Option } from "antd/es/mentions";

const ServicePage = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["searchTerm"] = searchTerm;
  
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllServicesQuery({ ...query });

  // @ts-ignore
  const services = data?.data?.data;

  // services?.map(service=>{
  //   console.log(service,'ser');
  // })
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can use the searchValue state here for further processing, such as sending it to an API or performing a search.
    console.log("Search Value:", searchValue);
  };

  // console.log("🚀 ~ file: page.tsx:41 ~ ServicePage ~ data:", data)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <HomeHeader />

      <form onSubmit={handleSearchSubmit}>
        <div
          style={{
            width: "75%",
            margin: "0 auto",
          }}
          className="flex"
        >
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Your Email
          </label>
          <Select
            onChange={(value) => setSearchTerm(value)}
            defaultValue="All categories"
            style={{ width: "350px" }} // Set the width as desired
            // You can add more Select properties here
          >
            <Option value="Mockups">Mockups</Option>
            <Option value="Templates">Templates</Option>
            <Option value="Design">Design</Option>
            <Option value="Logos">Logos</Option>
          </Select>
          <div className="relative w-full">
            <Input
              type="search"
              id="search-dropdown"
              placeholder="Search Mockups, Logos, Design Templates..."
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      <div
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "75%",
            margin: "0 auto",
            padding: "60px 0",
          }}
        >
          <Row gutter={[16, 16]}>
            {services?.map((service: any) => {
              return (
                <Col key={service.id} sm={24} md={12} lg={6}>
                  <Link href={`/service/${service.id}`}>
                    <div
                      style={{
                        height: "460px",
                      }}
                      className=" rounded overflow-hidden shadow-lg relative"
                    >
                      <Image
                        src={service?.image}
                        alt="image"
                        className="md:w-[280px] lg:w-[350px] w-[350px]"
                        width={350}
                        height={200}
                      ></Image>
                      <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">
                          {service?.name}
                        </div>

                        <p className="text-gray-700 text-base">
                          {service.details.length > 40
                            ? service.details.substring(0, 40) + " ..."
                            : service.details}
                        </p>
                      </div>
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          Price:{service.price}
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          Category: {service.category.title}
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ">
                          <Rate disabled defaultValue={service.rating} />
                        </span>
                      </div>
                    </div>
                    <Link href={`/service/${service.id}`}>
                      <Button
                        type="primary"
                        className="text-sm rounded-3xl text-white px-3 py-1 bg-[#fd4f1a]  absolute bottom-3 right-5"
                      >
                        View Details
                      </Button>
                    </Link>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicePage;
