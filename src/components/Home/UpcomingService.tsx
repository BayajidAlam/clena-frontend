"use client";
import { useGetAllServicesQuery } from "@/redux/api/services/ServiceApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Rate, Row } from "antd";
import Link from "next/link";
import Loading from "@/app/loading";
const UpcomingService = () => {
  // temp

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
  console.log(services);
  // console.log("🚀 ~ file: page.tsx:41 ~ ServicePage ~ data:", data)
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
    >
      <h1 className="my-4">Available Service</h1>
      <Row gutter={[16, 16]}>
        {services?.map((service: any) => {
          return (
            <Col
              key={service.id}
              sm={24}
              md={12}
              lg={6}
              style={{ marginBottom: 16 }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  border: "none",
                }}
                href={`/service/${service.id}`}
              >
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
                <div className="text-sm rounded-3xl text-white px-3 py-1 bg-[#fd4f1a]  absolute bottom-3 right-5">
                  Add to cart
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>{" "}
      <Row gutter={[16, 16]}>
        {services?.map((service: any) => {
          return (
            <Col key={service.id} sm={24} md={12} lg={6}>
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
                  <div className="font-bold text-xl mb-2">{service?.name}</div>

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
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default UpcomingService;
