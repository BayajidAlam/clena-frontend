"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { message } from "antd";
import Link from "next/link";
import { useState } from "react";
import UMTable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import Loading from "@/app/loading";
import dayjs from "dayjs";

import {
  useGetBookingsByUserIdQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import moment from "moment";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import Image from "next/image";

const CustomerBookingManagementPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};
  const { userId } = getUserInfo();
  const { data: userData, isLoading: isUserLoading } =
    useGetSingleUserQuery(userId);

  // @ts-ignore
  const userRole = userData?.data?.role;
  // @ts-ignore
  const id = userData?.data?.id;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading, refetch } = useGetBookingsByUserIdQuery(id);
  const [updateBookingStatus, { isLoading: isBookLoading }] =
    useUpdateBookingStatusMutation();

  // @ts-ignore
  const bookingsData = data?.data;
  // @ts-ignore
  const bookingsDataLength = data?.data?.meta;

  const handleCancel = async (id: any) => {
    const res = await updateBookingStatus({
      id: id?.id,
      body: { status: "canceled" },
    }).unwrap();
    // @ts-ignore
    if (res?.data) {
      message.success("Booking Status Updated successfully!");
      refetch();
    }
  };

  const renderActionButtons = (status: any, record: any) => {
    switch (status) {
      case "pending":
        if (userRole == "customer") {
          return (
            <div className="flex justify-center items-center gap-1">
              {/* <Link href={`/customer/booking/schedule/${record.id}`}>
                <CleanCommonCloseButton
                  style={{
                    background: "orange",
                  }}
                >
                  Reschedule
                </CleanCommonCloseButton>
              </Link> */}
              <CleanCommonSaveButton onClick={() => handleCancel(record)}>
                Cancel
              </CleanCommonSaveButton>
            </div>
          );
        }
      case "accepted":
        return (
          <div className="flex justify-center items-center gap-1">
            <CleanCommonSaveButton onClick={() => handleCancel(record)}>
              Cancel
            </CleanCommonSaveButton>
          </div>
        );
      case "rejected":
        return <p className="text-red-500 font-bold text lg">Rejected</p>;
      case "canceled":
        return <p className="text-red-500 font-bold text lg"></p>;
      default:
        return (
          <div className="flex justify-center items-center gap-1">
            <Link href={`/customer/booking/feedback`}>
              {" "}
              <CleanCommonSaveButton onClick={() => handleCancel(record)}>
                Feedback
              </CleanCommonSaveButton>
            </Link>
          </div>
        );
    }
  };

  const columns = [
    {
      title: "No",
      render: (text: string, record: any, index: number) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {index + 1}
        </div>
      ),
      width: "5%",
      align: "center",
    },
    {
      title: "Image",
      dataIndex: ["service", "image"],
      render: (imageURL: string, record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Image
            src={imageURL}
            width={50}
            height={50}
            alt={imageURL ? imageURL : ""}
          ></Image>
        </div>
      ),
      width: "10%",
      align: "center",
    },

    {
      title: "Service Name",
      dataIndex: ["user", "name"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
      width: "15%",
    },
    {
      title: "Location",
      dataIndex: ["service", "location"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: ["service", "price"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
      width: "10%",
    },
    {
      title: "Schedule",
      dataIndex: "booking_schedult",
      align: "center",
      render: (text: any, record: any) => {
        // Assuming text is the ISO date string, format it using dayjs
        const formattedDate = dayjs(text).format("MMMM DD, YYYY HH:mm:ss");
        return <p>{formattedDate}</p>;
      },
      width: "20",
    },
    {
      title: "Booking Status",
      dataIndex: "status",
      align: "center",
      render: (text: any, record: any) => {
        return <p className="text-green-500 font-bold text lg">{text}</p>;
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "status",
      width: "20%",
      render: (status: any, record: any) => {
        return renderActionButtons(status, record);
      },
      align: "center",
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  if (isLoading || isBookLoading || isUserLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "service management",
            link: "/admin/service-management",
          },
          {
            label: "create service",
            link: "/admin/service-management/create",
          },
        ]}
      />
      <div style={{ padding: "10px" }}></div>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={bookingsData}
        pageSize={size}
        // @ts-ignore
        totalPages={bookingsDataLength}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        // handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default CustomerBookingManagementPage;
