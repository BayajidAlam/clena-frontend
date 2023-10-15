"use client";

import Link from "next/link";
import { Button } from "antd";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authKey } from "@/constants/storageKey";

const HomeHeader = () => {
  const [userRole, setUserRole] = useState("");
  const { role } = getUserInfo() as any;
  const router = useRouter();

  useEffect(() => {
    if (role) {
      setUserRole(role);
    }
  }, [role]);

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "75%",
        padding: "20px 0px",
        margin: "0px auto",
      }}
    >
      <Link
        style={{
          textDecoration: "none",
          border: "none",
        }}
        href={`/`}
      >
        {" "}
        <p
          style={{
            fontSize: "30px",
            color: "#ff5100",
            fontWeight: "bold",
          }}
        >
          CLENA
        </p>
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link href={`/service`}>
          <Button
            type="primary"
            style={{
              background: "#fd4f1a",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Service
          </Button>
        </Link>
        {userRole && (
          <>
            {" "}
            <Link href={`/customer/booking`}>
              <Button
                type="primary"
                style={{
                  background: "#fd4f1a",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Booking
              </Button>
            </Link>
            <Link href={`/customer/cart`}>
              <Button
                type="primary"
                style={{
                  background: "#fd4f1a",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Cart
              </Button>
            </Link>
          </>
        )}

        {userRole ? (
          <Button
            style={{
              // background: "#fd4f1a",
              border: "1px solid #fd4f1a",
              color: "#fd4f1a",
              padding: "6px 30px",
              fontWeight: "bold",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            onClick={logOut}
            type="text"
            danger
          >
            Logout
          </Button>
        ) : (
          <Link href={`/registeration`}>
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
              Register
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
