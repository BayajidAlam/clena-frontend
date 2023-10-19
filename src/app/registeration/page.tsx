"use client";


import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import HomeHeader from "@/components/Home/HomeHeader";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { USER_ROLE } from "@/constants/role";
import {
  useUserLoginMutation,
  useUserSignUpMutation,
} from "@/redux/api/authApi";
import { registerSchema } from "@/schemas/admin";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";
import { decodedToken } from "@/utils/jwt";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import { Footer } from "antd/es/layout/layout";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterationPage = () => {
  
  const [userSignUp, {}] = useUserSignUpMutation();
  const [userLogin, { isLoading, data }] = useUserLoginMutation();

  const { role } = getUserInfo() as any;
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const dataWithRole = { ...values, role: USER_ROLE.CUSTOMER };

    console.log(dataWithRole, "data");

    try {
      const res = await userSignUp(dataWithRole);
      const loginData = {
        email: values.email,
        password: values.password,
      };
      // @ts-ignore
      if (res?.data?.success) {
        const res = await userLogin(loginData).unwrap();

        // @ts-ignore
        if (res?.token) {
          // @ts-ignore
          const decode = decodedToken(res?.token);
          console.log(decode, "token");
          // @ts-ignore
          if (decode?.role === "customer") {
            router.push(`/`);
            // @ts-ignore
            storeUserInfo({ accessToken: res?.token });
            message.success("Account created successfully!");
          } else {
            // @ts-ignore
            router.push(`/${decode?.role}`);
          }
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <HomeHeader />
      <div
        style={{
          width: "75%",
          padding: "20px 0px",
          margin: "0px auto",
          height: "100vh",
        }}
      >
        <UMBreadCrumb
          items={[
            {
              label: "home",
              link: "/",
            },
          ]}
        />

        <div
          style={{
            padding: "20px 0px",
            marginTop: "0px",
          }}
        >
          <Form submitHandler={onSubmit} resolver={yupResolver(registerSchema)}>
            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
              className="pb-16"
            >
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                }}
                className="capitalize"
              >
                {role} Information
              </p>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="name"
                    size="large"
                    label="Name"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="email"
                    size="large"
                    label="Email"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="password"
                    name="password"
                    size="large"
                    label="Password"
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="contactNo"
                    size="large"
                    label="Contact No"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="address"
                    size="large"
                    label="Address"
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <UploadImage name="profileImg" />
                </Col>
              </Row>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
               
                  <CleanCommonSaveButton>Register</CleanCommonSaveButton>
               
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterationPage;
