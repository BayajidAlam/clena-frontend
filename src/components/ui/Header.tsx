import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const { role } = getUserInfo() as any;

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader
      style={{
        backgroundColor: "#ff5100",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Link href={`/`}>
            <Button
              style={{
                background: "#fd4f1a",
                padding: "6px 30px",
                color: "white",
                fontSize: "14px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              Home
            </Button>
          </Link>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span className="text-white text-base font-bold">
                {"John Doe"}
              </span>
              <span className="text-white text-sm capitalize">{role}</span>
            </div>

            <Dropdown menu={{ items }}>
              <a href="">
                {" "}
                <Space wrap size={24}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Row>
    </AntHeader>
  );
};

export default Header;
