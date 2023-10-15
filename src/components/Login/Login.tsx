"use client";

import { Button, Col, Row, message } from "antd";
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

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const router = useRouter();

  if (isLoading) {
    return message.loading("Loading...");
  }

  // console.log(isLoggedIn());
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      // console.log(data, "data");
      const res = await userLogin({ ...data }).unwrap();
      // @ts-ignore
      if (res?.token) {
        // @ts-ignore
        const decode = decodedToken(res?.token);
        // @ts-ignore
        if (decode?.role === "customer") {
          router.push(`/`);
        } else {
          // @ts-ignore
          router.push(`/${decode?.role}`);
        }
        message.success("User logged in successfully!");
        // @ts-ignore
        storeUserInfo({ accessToken: res?.token });
      }

      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
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
            color: "#29ABE2;",
          }}
        >
          Please login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Phone Number"
                required
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
              />
            </div>
            <p
              style={{
                margin: "10px 0px",
                fontSize: "16px",
                color: "#29ABE2;",
                fontWeight: "bold",
              }}
            >
              New to Clena?<span>create new account</span>
            </p>
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
