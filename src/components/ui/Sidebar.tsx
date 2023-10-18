"use client";

import { useEffect, useId, useState } from "react";
import { Layout, Menu } from "antd";

import { sidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import Loading from "@/app/loading";

const { Sider } = Layout;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState("");
  const [id, setId] = useState("");

  const { userId } = getUserInfo() as any;
  const { data } = useGetSingleUserQuery(userId);

  useEffect(() => {
    // @ts-ignore
    if (data?.data) {
      // @ts-ignore
      setRole(data?.data.role);
      // @ts-ignore
      setId(data?.data?.id);
    }
    // @ts-ignore
  }, [data?.data]);



  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#ff5100",
      }}
    >
      <div
        style={{
          color: "#ff5100",
          fontSize: collapsed ? "12px" : "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontWeight: "bold",
          padding: "12px 0px",
          backgroundColor: "white",
          height: "63px",
        }}
      >
        CLEANA
      </div>
      <Menu
        style={{
          backgroundColor: "#ff5100",
        }}
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role, id)}
      />
    </Sider>
  );
};

export default SideBar;
