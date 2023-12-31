"use client";

import Loading from "@/app/loading";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  useGetSingleServiceQuery,
  useUpdateSingleServiceMutation,
} from "@/redux/api/services/ServiceApi";
import { Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ServiceEditPage = ({ params }: any) => {
  const id = params.slug;
  const router = useRouter();

  const [value, setValue] = useState({});
  const [updateSingleService, { isLoading: isServiceLoading }] =
    useUpdateSingleServiceMutation();
  const { data, error, isLoading, refetch } = useGetSingleServiceQuery(id);

  // @ts-ignore
  const myData = data?.data as any;
  useEffect(() => {
    if (data) {
      setValue({
        name: myData.name,
        price: myData?.price,
        details: myData?.details,
        location: myData?.location,
        status: myData.status,
        rating: myData.rating,
        image: myData?.image,
        inStock: myData?.inStock,
      });
    }
  }, [data, myData]);

  const onSubmit = async (values: any) => {
    // console.log(values);
    try {
      const res = await updateSingleService({
        id: params?.slug,
        body: values,
      }).unwrap();
      // console.log(res, "update response");
      // @ts-ignore
      if (res?.success) {
        router.push("/admin/service-management");
        message.success("Admin Successfully Updated!");
        refetch();
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading || isServiceLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "user management",
            link: "/admin/user-management",
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
              Customer Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput type="text" name="name" size="large" label="Name" />
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
                  name="price"
                  size="large"
                  label="Price"
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
                  name="location"
                  size="large"
                  label="location"
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
                  name="status"
                  size="large"
                  label="status"
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
                  name="rating"
                  size="large"
                  label="Rating"
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
                  name="details"
                  size="large"
                  label="Details"
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
                  name="inStock"
                  size="large"
                  label="Details"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Image
                  src={myData?.image}
                  width={150}
                  height={150}
                  alt="image"
                ></Image>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="image" />
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <CleanCommonSaveButton>Save</CleanCommonSaveButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ServiceEditPage;
