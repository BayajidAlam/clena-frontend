"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Link from "next/link";
import { useState } from "react";
import CLENATable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { message } from "antd";
import {
  useDeleteFaqMutation,
  useGetAllFaqsQuery,
} from "@/redux/api/services/blogAndFAQApi";

const AllFaqsPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};
  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading, refetch } = useGetAllFaqsQuery({ ...query });
  const [deleteFaq, { isLoading: faqLoading }] = useDeleteFaqMutation();
  // @ts-ignore
  const FaqData = data?.data?.data;

  // @ts-ignore
  const FaqDataLength = data?.data?.meta;

  const handleDelete = async (id: any) => {
    const res = await deleteFaq(id).unwrap();
    // @ts-ignore
    if (res?.success) {
      router.push("/admin/content-management/all-faqs");
      message.success("FAQ deleted successfully!");
      refetch();
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
      title: "Question",
      dataIndex: "question",
      width: "30%",
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
          {text.length > 20 ? `${text.substring(0, 40)}...` : text}
        </div>
      ),
      align: "center",
    },
    {
      title: "Ans",
      dataIndex: "ans",
      width: "40%",
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
          {text.length > 20 ? `${text.substring(0, 90)}...` : text}
        </div>
      ),
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
          <Link href={`/admin/content-management/faqs/edit/${record}`}>
            <CleanCommonCloseButton>Edit</CleanCommonCloseButton>
          </Link>
          <CleanCommonSaveButton onClick={() => handleDelete(record)}>
            Delete
          </CleanCommonSaveButton>
        </div>
      ),
      align: "center",
      width: "25%",
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

  if (isLoading || faqLoading) {
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
        dataSource={FaqData}
        pageSize={size}
        // @ts-ignore
        totalPages={FaqDataLength}
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
