"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import { useAdminsQuery, useUpdateRoleMutation } from "@/redux/api/adminApi";
import Image from "next/image";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import Loading from "@/app/loading";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/api/services/blogAndFAQApi";
import moment from "moment";

const AllBlogsPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading, refetch } = useGetAllBlogsQuery({ ...query });
  const [deleteBlog, { isLoading: blogLoading }] = useDeleteBlogMutation();
  // @ts-ignore
  const BlogsData = data?.data?.data;
  // @ts-ignore
  const BlogsDataLength = data?.data?.meta;

  const handleDelete = async (id: any) => {
    const res = await deleteBlog(id).unwrap();
    // @ts-ignore
    if (res?.success) {
      refetch();
      message.success("Blog deleted successfully!");
    }
  };

  if (isLoading || blogLoading) {
    return <Loading />;
  }

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
      dataIndex: "image",
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
            width={60}
            height={60}
            alt={imageURL ? imageURL : ""}
          ></Image>
        </div>
      ),
      width: "15%",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      width: "20%",
      align: "center",
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
            fontWeight: "bold",
            color: "blue",
          }}
        >
          {text.length > 20 ? `${text.substring(0, 30)}...` : text}
        </div>
      ),
    },
    {
      title: "Text",
      dataIndex: "text",
      width: "25%",
      render: (text: string) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {text.length > 20 ? `${text.substring(0, 90)}...` : text}
        </div>
      ),
      align: "center",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      width: "15%",
      align: "center",
      render: (text: any, record: any) => {
        const formattedDate = moment(text).format("MMMM DD, YYYY HH:mm:ss");
        return <p>{formattedDate}</p>;
      },
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
          <Link href={`/admin/content-management/blogs/edit/${record}`}>
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

  if (isLoading || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "all blogs",
            link: "/admin/content-management/all-blogs",
          },
        ]}
      />
      <div style={{ padding: "10px" }}>
        <ActionBar>
          <div>
            <Link href="/admin/content-management/blogs">
              <button className="text-white shadow-xl bg-[#FF5100] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Create Blog
              </button>
            </Link>
          </div>
        </ActionBar>
      </div>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={BlogsData}
        pageSize={size}
        // @ts-ignore
        totalPages={BlogsDataLength}
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

export default AllBlogsPage;
