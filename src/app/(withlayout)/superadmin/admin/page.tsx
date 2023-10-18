"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import UMTable from "@/components/ui/CLENATable";
import UMModal from "@/components/ui/UMModal";
import { useAdminsQuery, useUpdateRoleMutation } from "@/redux/api/adminApi";
import Image from "next/image";
import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import { useDeleteSingleUserMutation } from "@/redux/api/userApi";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";


const AdminPage = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const query: Record<string, any> = {};
  const [updateRole, { isLoading: isUserLoading }] = useUpdateRoleMutation();
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
  query["role"] = "admin";

  const { data, isLoading, refetch } = useAdminsQuery({ ...query });
  const [deleteSingleUser, { isLoading: userLoading }] =
    useDeleteSingleUserMutation();
  // @ts-ignore
  const adminData = data?.data?.data;
  // @ts-ignore
  const adminDataLength = data?.data?.meta;

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
        refetch();
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      const res: any = await deleteSingleUser(id).unwrap();

      // @ts-ignore
      if (res?.success) {
        refetch();
        message.success("User Deleted Successfully!");
        router.push("/superadmin/admin");
      } else {
        message.error(res?.message);
      }
    } catch (error: any) {}
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
      dataIndex: "profileImg",
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
            style={{
              borderRadius: "50%",
            }}
            src={imageURL}
            width={50}
            height={50}
            alt={imageURL ? imageURL : ""}
          ></Image>
        </div>
      ),
      width: "5%",
      align: "center",
    },
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
          <Link href={`/superadmin/admin/${record}`}>
            <CleanCommonCloseButton>Edit</CleanCommonCloseButton>
          </Link>
          <CleanCommonCloseButton onClick={() => makeUserHandler(record)}>
            Demote to user
          </CleanCommonCloseButton>

          <Button
            onClick={() => deleteHandler(record)}
            htmlType="submit"
            type="primary"
            style={{
              background: "red",
              padding: "4px 22px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Delete
          </Button>
        </div>
      ),
      align: "center",
      width: "15%",
    },
  ];

  if (isLoading || userLoading || isUserLoading) {
    return <Loading />;
  }

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
          <div>
            <Link href="/superadmin/admin/create">
              <button className="text-white shadow-xl bg-[#FF5100] hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Create Admin
              </button>
            </Link>
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
