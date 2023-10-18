"use client";

import Loading from "@/app/loading";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  useGetSingleBlogQuery,
  useUpdateSingleBlogMutation,
} from "@/redux/api/services/blogAndFAQApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditBlogPage = ({ params }: any) => {
  const { role } = getUserInfo();
  const router = useRouter()
  const id = params.slug;
  const [value, setValue] = useState({});
  const [updateSingleBlog, { isLoading: BlogLoading }] =
    useUpdateSingleBlogMutation();
  const { data, error, isLoading, refetch } = useGetSingleBlogQuery(id);

  // @ts-ignore
  const myData = data?.data as any;
  useEffect(() => {
    if (data) {
      setValue({
        title: myData?.title,
        text: myData?.text,
        image: myData?.image,
      });
    }
  }, [data, myData]);

  const onSubmit = async (values: any) => {
    console.log(value, "values");
    try {
      const res = await updateSingleBlog({
        id: params?.slug,
        body: values,
      }).unwrap();
      // @ts-ignore
      if (res?.success) {
        refetch();
        message.success("Blog Successfully Updated!");
        router.push("/admin/content-management/all-blogs")
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading || BlogLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb
        items={[
          {
            label: `all-blogs`,
            link: `/admin/content-management/all-blogs`,
          },
          {
            label: `edit`,
            link: `/admin/content-management/blogs/edit/${params?.slug}`,
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
              Create Blog Post
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
                  name="title"
                  size="large"
                  label="Title"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput type="text" name="text" size="large" label="Text" />
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

export default EditBlogPage;
