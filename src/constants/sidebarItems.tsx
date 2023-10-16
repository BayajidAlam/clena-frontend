import type { MenuProps } from "antd";
import { ProfileOutlined, TableOutlined } from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";

export const sidebarItems = (role: string) => {
  const { userId } = getUserInfo();

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/profile/${userId}`}>Account Profile</Link>,
      key: `/${role}/change-password`,
      icon: <ProfileOutlined />,
      style: {
        background: "#ff5100",
      },
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/admin/user-management`}>Customer-Management</Link>,
      icon: <TableOutlined />,
      key: `/admin/user-management`,
    },
    {
      label: (
        <Link href={`/${role}/service-management`}>Service-Management</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/service-management`,
      children: [
        {
          label: (
            <Link href={`/admin/service-management/create-category`}>
              Create Category
            </Link>
          ),
          key: `/admin/service-management/create-category`,
        },
        {
          label: (
            <Link href={`/admin/service-management/create`}>
              Create Service
            </Link>
          ),
          key: `/admin/service-management/create`,
        },
      ],
    },
    {
      label: (
        <Link href={`/${role}/booking-management`}>Booking-Management</Link>
      ),
      icon: <TableOutlined />,
      key: `/admin/booking-management`,
    },
    {
      label: <Link href={`/admin/content-management`}>Content-Management</Link>,
      icon: <TableOutlined />,
      key: `/admin/content-management`,
      children: [
        {
          label: (
            <Link href={`/admin/content-management/blogs`}>Add Blogs</Link>
          ),
          icon: <TableOutlined />,
          key: `/admin/booking-management/blogs`,
        },
        {
          label: <Link href={`/admin/content-management/faqs`}>Add FAQS</Link>,
          icon: <TableOutlined />,
          key: `/admin/booking-management/faqs`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
  ];

  const CustomerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/cart`}>Cart</Link>,
      icon: <TableOutlined />,
      key: `/${role}/cart`,
    },
    {
      label: <Link href={`/${role}/booking`}>Booking</Link>,
      icon: <TableOutlined />,
      key: `/${role}/booking`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return CustomerSidebarItems;
  }
};
