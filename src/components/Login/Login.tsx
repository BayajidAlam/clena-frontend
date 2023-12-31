"use client";

import { Button, Col, Radio, RadioChangeEvent, Row, message } from "antd";
import loginImage from "../../assets/login-image.png";
import Image from "next/image";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import { decodedToken } from "@/utils/jwt";
import Link from "next/link";
import { useEffect, useState } from "react";
import { demoUser } from "@/utils/demoUser";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [value, setValue] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [userLogin, { isLoading, data }] = useUserLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (value === "super-admin") {
      setCredentials({
        email: "johndoe11@example.com",
        password: "mysecretpassword",
      });
    } else if (value === "admin") {
      setCredentials({
        email: "admin1111@miagmail.com",
        password: "111111",
      });
    } else if (value === "customer") {
      setCredentials({
        email: "customer@gmail.com",
        password: "customer123",
      });
    }
  }, [value]);

  if (isLoading) {
    return message.loading("Loading...");
  }

  // console.log(isLoggedIn());
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      let formData = {};
      if (credentials.email && credentials.password) {
        formData = {
          email: credentials.email,
          password: credentials.password,
        };
      } else {
        formData = { ...data };
      }
      
      const res = await userLogin({ ...formData }).unwrap();
      
      // @ts-ignore
      if (res?.token) {
        // @ts-ignore
        const decode = decodedToken(res?.token);
        // console.log(decode, "decode token from login");
        // @ts-ignore
        if (decode?.role === "customer") {
          router.push(`/`);
          message.success("User logged in successfully!");
          // @ts-ignore
          storeUserInfo({ accessToken: res?.token });
        } else {
          // @ts-ignore
          storeUserInfo({ accessToken: res?.token });
          router.push(`/profile/${decode?.userId}`);
        }
      }

      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={6}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
      <Col sm={12} md={8} lg={6}>
        <h1
          style={{
            margin: "15px 0px",
            color: "#29ABE2",
          }}
        >
          Please login your account
        </h1>
        <div
          style={{
            margin: "15px 0px",
          }}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={"customer"}>Customer</Radio>
            <Radio value={"admin"}>Admin</Radio>
            <Radio value={"super-admin"}>Super Admin</Radio>
          </Radio.Group>
        </div>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Phone Number"
                required
                defaultValue={credentials.email}
                value={credentials.email}
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                required
                defaultValue={credentials.password}
                value={credentials.password}
              />
            </div>
            <Link href={`/registeration`}>
              {" "}
              <p
                style={{
                  margin: "10px 0px",
                  fontSize: "16px",
                  color: "#29ABE2",
                  fontWeight: "bold",
                }}
              >
                New to Clena?<span>create new account</span>
              </p>
            </Link>
            <Button
              style={{
                color: "white",
                backgroundColor: "#29ABE2;",
              }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
