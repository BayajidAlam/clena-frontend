"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";
import UMModal from "@/components/ui/UMModal";
import {
  useAdminsQuery,
  useUpdateRoleMutation,
} from "@/redux/api/adminApi";
import Image from "next/image";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";

const AdminPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};
  const [updateRole] = useUpdateRoleMutation();

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
  query["role"] = "admin";

  // const debouncedSearchTerm = useDebounced({
  //   searchQuery: searchTerm,
  //   delay: 600,
  // });

  // useEffect(() => {
  //   if (!!debouncedSearchTerm) {
  //     query["searchTerm"] = debouncedSearchTerm;
  //   }
  // }, [debouncedSearchTerm, query]);

  const { data, isLoading } = useAdminsQuery({ ...query });

  // @ts-ignore
  const adminData = data?.data?.data;
  // @ts-ignore
  const adminDataLength = data?.data?.meta;
  
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: function (data: any) {
        const fullName = `${data}`;
        return <>{fullName}</>;
      },
      width: "20%",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
    },
    {
      title: "Contact no.",
      dataIndex: "contactNo",
      width: "20%",
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
          <CleanCommonCloseButton onClick={() => makeUserHandler(record)}>
            Remove Admin
          </CleanCommonCloseButton>
        </div>
      ),
      align: "center",
      width: "15%",
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

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };


  const makeUserHandler = async (id: string) => {
    
    try {
      const res = await updateRole({
        id,
        body: { role: "customer" },
      });
      // @ts-ignore 
      if (res?.data?.success) {
        console.log(res, "up res");
        message.success("Role Updated Deleted!");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super-admin",
            link: "/superadmin/admin",
          },
          {
            label: "Create admin",
            link: "/superadmin/admin/create",
          },
        ]}
      />
      <div style={{ padding: "10px" }}>
        <ActionBar>
          {/* <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "13%",
            }}
          /> */}
          <div>
            <Link href="/superadmin/admin/create">
              <button className="text-white shadow-xl bg-[#FF5100] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Create Admin
              </button>
            </Link>
            {/* {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <Button
                className="bg-[#FF5100] font-bold"
                style={{ margin: "0px 13px" }}
                type="primary"
                onClick={resetFilters}
              >
                <ReloadOutlined />
              </Button>
            )} */}
          </div>
        </ActionBar>
      </div>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={adminData}
        pageSize={size}
        // @ts-ignore
        totalPages={adminDataLength}
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

export default AdminPage;
