import { Breadcrumb } from "antd";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";

const UMBreadCrumb = ({
  items,
}: {
  items: {
    label: string;
    link: string;
  }[];
}) => {
  const breadCrumbItems = [
    {
      title: (
        <Link href="/">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => {
      return {
        title: item.link ? (
          <Link href={item.link}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        ),
      };
    }),
  ];

  return (
    <Breadcrumb
      style={{
        background: "linear-gradient(45deg, #ffdbcb, transparent)",
        color: "#444 ",
      }}
      className="flex px-5 bg-white shadow-sm py-3 text-gray-700  rounded-md  dark:bg-gray-800 dark:border-gray-700"
      items={breadCrumbItems}
    ></Breadcrumb>
  );
};

export default UMBreadCrumb;
