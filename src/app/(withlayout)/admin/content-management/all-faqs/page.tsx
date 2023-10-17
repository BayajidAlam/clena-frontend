"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { useState } from "react";
import CLENATable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/api/services/ServiceApi";
import Loading from "@/app/loading";

const AllFaqsPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading, refetch } = useGetAllServicesQuery({ ...query });
  const [deleteService] = useDeleteServiceMutation();
  // @ts-ignore
  const serviceData = data?.data?.data;
  // @ts-ignore
  const serviceDataLength = data?.data?.meta;
  console.log(serviceData);
  const handleDelete = async (id: any) => {
    const res = await deleteService(id).unwrap();
    // @ts-ignore
    if (res?.success) {
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "10%",
      align: "center",
    },
    {
      title: "Category Name",
      dataIndex: ["category", "title"],
      render: (text: string, record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {text}
        </div>
      ),
      width: "15%",
      align: "center",
    },

    {
      title: "Location",
      dataIndex: "location",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
    },
    {
      title: "Stock",
      dataIndex: "inStock",
      width: "15%",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Link href={`/admin/service-management/edit/${record}`}>
            <CleanCommonCloseButton>Edit</CleanCommonCloseButton>
          </Link>
          <CleanCommonSaveButton onClick={() => handleDelete(record)}>
            Delete
          </CleanCommonSaveButton>
        </div>
      ),
      align: "center",
      width: "20%",
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "all-faqs",
            link: "/admin/content-management/all-faqs",
          },
        ]}
      />
      <div style={{ padding: "10px" }}>
        <ActionBar>
          <div>
            <Link href="/admin/content-management/faqs">
              <button className="text-white shadow-xl bg-[#FF5100] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Create FAQ
              </button>
            </Link>
          </div>
        </ActionBar>
      </div>

      <CLENATable
        loading={isLoading}
        columns={columns}
        dataSource={serviceData}
        pageSize={size}
        // @ts-ignore
        totalPages={serviceDataLength}
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

export default AllFaqsPage;
