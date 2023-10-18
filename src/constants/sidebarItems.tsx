import { Button, type MenuProps } from "antd";
import {
  BookOutlined,
  CloudUploadOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";
import { MdContentPaste, MdMiscellaneousServices } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaQuestionCircle } from "react-icons/fa";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

export const sidebarItems = (role: string, id: any) => {
 

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/profile/${id}`}>Account Profile</Link>,
      key: `/${role}/change-password`,
      icon: (
        <div className="text-xl">
          <CgProfile />
        </div>
      ),
      style: {
        background: "#ff5100",
      },
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <p>Customer-Management</p>,
      icon: (
        <div className="text-xl">
          <RiCustomerService2Fill />
        </div>
      ),
      key: `/${role}/user-management/customer`,
      children: [
        {
          label: <Link href={`/${role}/user-management`}>All Customer</Link>,
          key: `/${role}/user-management`,
        },
        {
          label: (
            <Link href={`/${role}/user-management/create`}>Add Customer</Link>
          ),
          key: `/${role}/user-management/create`,
        },
      ],
    },
    {
      label: <p>Service-Management</p>,
      icon: (
        <div className="text-xl">
          <MdMiscellaneousServices />
        </div>
      ),
      key: `/${role}/service-management/service`,
      children: [
        {
          label: <Link href={`/${role}/service-management`}>All Service</Link>,
          key: `/${role}/service-management`,
        },
        {
          label: (
            <Link href={`/${role}/service-management/create-category`}>
              Create Category
            </Link>
          ),
          key: `/${role}/service-management/create-category`,
        },
        {
          label: (
            <Link href={`/${role}/service-management/create`}>
              Create Service
            </Link>
          ),
          key: `/${role}/service-management/create`,
        },
      ],
    },
    {
      label: (
        <Link href={`/${role}/booking-management`}>Booking-Management</Link>
      ),
      icon: <BookOutlined />,
      key: `/${role}/booking-management`,
    },
    {
      label: <p>Content-Management</p>,
      icon: <CloudUploadOutlined />,
      key: `/${role}/content-management/ok`,
      children: [
        {
          label: <p>All Content</p>,
          icon: <TableOutlined />,
          key: `/${role}/content-management`,
          children: [
            {
              label: (
                <Link href={`/${role}/content-management/all-blogs`}>
                  All Blogs
                </Link>
              ),
              icon: <MdContentPaste />,
              key: `/${role}/content-management/all-blogs`,
            },
            {
              label: (
                <Link href={`/${role}/content-management/all-faqs`}>
                  All FAQS
                </Link>
              ),
              icon: <FaQuestionCircle />,
              key: `/${role}/content-management/all-faqss`,
            },
          ],
        },
        {
          label: (
            <Link href={`/${role}/content-management/blogs`}>Add Blogs</Link>
          ),
          icon: <TableOutlined />,
          key: `/${role}/booking-management/blogs`,
        },
        {
          label: <Link href={`/${role}/content-management/faqs`}>Add FAQS</Link>,
          icon: <TableOutlined />,
          key: `/${role}/content-management/faqs`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
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
