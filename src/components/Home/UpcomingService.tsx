"use client";
import { useGetAllServicesQuery } from "@/redux/api/services/ServiceApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Rate, Row, Skeleton } from "antd";
import Link from "next/link";
import Loading from "@/app/loading";
import { ArrowRightOutlined } from "@ant-design/icons";
const UpcomingService = () => {
  const { data, isLoading } = useGetAllServicesQuery({});
  // @ts-ignore
  const services = data?.data?.data;

  const filterData = services?.filter(
    (service: any) => service.status === "inActive"
  );

  // console.log("🚀 ~ file: page.tsx:41 ~ ServicePage ~ data:", data)

  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "60px 0",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="my-4">Upcoming Service</h1>
        <Link
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textDecoration: "none",
            gap: "5",
            color: "#fd4f1a",
          }}
          href={`/service`}
        >
          <p>See All</p> <ArrowRightOutlined className="ml-2" />
        </Link>
      </div>
      <Row gutter={[16, 16]}>
        {isLoading ? (
          <>
            {" "}
            <Skeleton
              style={{
                height: "300px",
              }}
              active
            />
          </>
        ) : (
          <>
            {filterData?.slice(0, 4).map((service: any) => {
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
                </Col>
              );
            })}
          </>
        )}
      </Row>
    </div>
  );
};

export default UpcomingService;
