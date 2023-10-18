"use client";

import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAddNewBlogMutation } from "@/redux/api/services/blogAndFAQApi";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddBlogsPage = () => {

  const [addNewBlog, {}] = useAddNewBlogMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      const res = await addNewBlog(values);
      console.log(res, "customer create on admin");
      // @ts-ignore
      if (res?.data?.success) {
        router.push("/admin/content-management/all-blogs");
        message.success("Blog Created Successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "content-management",
            link: "/admin/content-management",
          },
          {
            label: "add-blogs",
            link: "/admin/content-management/blogs",
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
        <Form submitHandler={onSubmit}>
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
                <FormInput type="text" name="title" size="large" label="Title" />
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
                  name="text"
                  size="large"
                  label="Text"
                />
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

export default AddBlogsPage;
