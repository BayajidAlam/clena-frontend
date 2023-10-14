import type { MenuProps } from "antd";
import { ProfileOutlined, TableOutlined } from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  console.log(role, "role");

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
      style: {
        background: "#ff5100",
      },
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/user-management`}>User-Management</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user-management`,
    },
    {
      label: (
        <Link href={`/${role}/service-management`}>Service-Management</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/service-management`,
    },
    {
      label: (
        <Link href={`/${role}/booking-management`}>Booking-Management</Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/booking-management`,
    },
    {
      label: (
        <Link href={`/${role}/content-management`}>
          Content-Management
        </Link>
      ),
      icon: <TableOutlined />,
      key: `/${role}/content-management`,
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
