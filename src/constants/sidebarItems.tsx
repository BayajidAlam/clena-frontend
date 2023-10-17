import { Button, type MenuProps } from "antd";
import {
  BookOutlined,
  CloudUploadOutlined,
  ProfileOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { getUserInfo } from "@/services/auth.service";
import { MdContentPaste, MdMiscellaneousServices } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaQuestionCircle } from "react-icons/fa";


export const sidebarItems = (role: string) => {
  const { userId } = getUserInfo();

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/profile/${userId}`}>Account Profile</Link>,
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
      key: `/admin/user-management/customer`,
      children: [
        {
          label: <Link href={`/admin/user-management`}>All Customer</Link>,
          key: `/admin/user-management`,
        },
        {
          label: (
            <Link href={`/admin/user-management/create`}>Add Customer</Link>
          ),
          key: `/admin/user-management/create`,
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
      key: `/admin/service-management/service`,
      children: [
        {
          label: <Link href={`/admin/service-management`}>All Service</Link>,
          key: `/admin/service-management`,
        },
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
      icon: <BookOutlined />,
      key: `/admin/booking-management`,
    },
    {
      label: <p>Content-Management</p>,
      icon: <CloudUploadOutlined />,
      key: `/admin/content-management/ok`,
      children: [
        {
          label: <p>All Content</p>,
          icon: <TableOutlined />,
          key: `/admin/content-management`,
          children: [
            {
              label: (
                <Link href={`/admin/content-management/all-blogs`}>
                  All Blogs
                </Link>
              ),
              icon: <MdContentPaste />,
              key: `/admin/content-management/all-blogs`,
            },
            {
              label: (
                <Link href={`/admin/content-management/all-faqs`}>
                  All FAQS
                </Link>
              ),
              icon: <FaQuestionCircle />,
              key: `/admin/content-management/all-faqss`,
            },
          ],
        },
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
          key: `/admin/content-management/faqs`,
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
