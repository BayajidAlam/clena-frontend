"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { message } from "antd";
import Link from "next/link";
import { useState } from "react";
import UMTable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import Loading from "@/app/loading";
import {
  useGetAllBookingsQuery,
  useUpdateBookingStatusMutation,
} from "@/redux/api/bookingApi";
import moment from "moment";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const ServiceManagementPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};
  const { userId } = getUserInfo();
  const { data: userData, isLoading: isUserLoading } =
    useGetSingleUserQuery(userId);
  // @ts-ignore
  const userRole = userData?.data?.role;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading, refetch } = useGetAllBookingsQuery({ ...query });
  const [updateBookingStatus, { isLoading: isBookLoading }] =
    useUpdateBookingStatusMutation();

  // @ts-ignore
  const bookingsData = data?.data;

  // @ts-ignore
  const bookingsDataLength = data?.data?.meta;

  const handleAccept = async (id: any) => {
    const res = await updateBookingStatus({
      id: id?.id,
      body: { status: "accepted" },
    }).unwrap();
    // @ts-ignore
    if (res?.success) {
      refetch();
      message.success("Booking Status Updated successfully!");
    }
  };

  const handleDelivered = async (id: any) => {
    console.log(id);
    const res = await updateBookingStatus({
      id: id?.id,
      body: { status: "delivered" },
    }).unwrap();
    // @ts-ignore
    if (res?.success) {
      refetch();
      message.success("Booking Status Updated successfully!");
    }
  };

  const handleReject = async (id: any) => {
    const res = await updateBookingStatus({
      id: id?.id,
      body: { status: "rejected" },
    }).unwrap();
    // @ts-ignore
    if (res?.success) {
      refetch();
      message.success("Booking Status Updated successfully!");
    }
  };

  const handleCancel = async (id: any) => {
    const res = await updateBookingStatus({
      id: id?.id,
      body: { status: "canceled" },
    }).unwrap();
    // @ts-ignore
    if (res?.success) {
      refetch();
      message.success("Booking Status Updated successfully!");
    }
  };

  const renderActionButtons = (status: any, record: any) => {
    switch (status) {
      case "pending":
        if (userRole !== "customer") {
          return (
            <div className="flex justify-center items-center gap-1">
              <CleanCommonSaveButton onClick={() => handleReject(record)}>
                Reject
              </CleanCommonSaveButton>
              <CleanCommonCloseButton
                style={{ background: "green" }}
                onClick={() => handleAccept(record)}
              >
                Accept
              </CleanCommonCloseButton>
              <Link href={`/admin/booking-management/schedule/${record.id}`}>
                <CleanCommonCloseButton
                  style={{
                    background: "orange",
                  }}
                >
                  Reschedule
                </CleanCommonCloseButton>
              </Link>
            </div>
          );
        }
      case "accepted":
        return (
          <div className="flex justify-center items-center gap-1">
            <CleanCommonSaveButton
              style={{
                background: "Green",
              }}
              onClick={() => handleDelivered(record)}
            >
              Delivery
            </CleanCommonSaveButton>

            <CleanCommonSaveButton onClick={() => handleCancel(record)}>
              Cancel
            </CleanCommonSaveButton>

            <Link href={`/admin/booking-management/schedule/${record.id}`}>
              <CleanCommonCloseButton
                style={{
                  background: "orange",
                }}
              >
                Reschedule
              </CleanCommonCloseButton>
            </Link>
          </div>
        );
      case "rejected":
        return <p className="text-red-500 font-bold text lg">Rejected</p>;
      case "canceled":
        return <p className="text-red-500 font-bold text lg">Canceled</p>;
      default:
        return <p className="text-green-500 font-bold text lg">Delivered</p>;
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
    },
    {
      title: "Price",
      dataIndex: ["service", "price"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
    },

    {
      title: "Customer",
      dataIndex: ["user", "name"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Customer Email",
      dataIndex: ["user", "email"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Contact",
      dataIndex: ["user", "contactNo"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Address",
      dataIndex: ["user", "address"],
      align: "center",
      render: (text: any, record: any) => {
        return <p>{text}</p>;
      },
    },
    {
      title: "Schedule",
      dataIndex: "booking_schedult",
      align: "center",
      render: (text: any, record: any) => {
        // Assuming text is the ISO date string, format it to a more readable format
        const formattedDate = moment(text).format("MMMM DD, YYYY HH:mm:ss");
        return <p>{formattedDate}</p>;
      },
    },
    {
      title: "Booking Status",
      dataIndex: "status",
      align: "center",
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "status",
      width: "10%",
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

export default ServiceManagementPage;
