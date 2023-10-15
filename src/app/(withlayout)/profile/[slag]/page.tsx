"use client";

import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserProfilePage = ({ params }: any) => {
  const { role } = getUserInfo();
  const id = params.slag;
  const [value, setValue] = useState({});

  const { data, error, isLoading } = useGetSingleUserQuery(id);

  const myData = data?.data[0];
  useEffect(() => {
    if (data) {
      setValue({
        name: myData.name,
        email: myData.email,
        address: myData.address,
        profileImg: myData.profileImg,
        contactNo: myData.contactNo,
        password: myData.password,
      });
    }
  }, [data, myData]);

  const onSubmit = async (values: any) => {};

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb
        items={[
          {
            label: `profile`,
            link: `/profile/${id}`,
          },
          {
            label: `edit`,
            link: `/profile/edit/${id}`,
          },
        ]}
      />

      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        {/* resolver={yupResolver(adminSchema)} */}
        <Form submitHandler={onSubmit} defaultValues={value}>
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
                  disable
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
                  disable
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
                  name="password"
                  size="large"
                  label="Password"
                  disable
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
                  disable
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
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Image
                  src={`/${myData?.profileImg}`}
                  width={150}
                  height={150}
                  alt="image"
                ></Image>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/profile/edit/${id}`}>
                <CleanCommonSaveButton>Update</CleanCommonSaveButton>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserProfilePage;
