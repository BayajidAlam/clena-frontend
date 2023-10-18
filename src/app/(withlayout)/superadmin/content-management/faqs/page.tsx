"use client";

import Loading from "@/app/loading";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  useAddNewBlogMutation,
  useAddNewFaqMutation,
} from "@/redux/api/services/blogAndFAQApi";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AddFAQSPage = () => {
  const [addNewFaq, { isLoading }] = useAddNewFaqMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    try {
      console.log(values, "value");
      const res = await addNewFaq(values);
      // @ts-ignore
      if (res?.data?.success) {
        router.push("/admin/content-management/all-faqs");
        message.success("FAQ Create Successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "content-management",
            link: "/admin/content-management/all-faqs",
          },
          {
            label: "add-faqs",
            link: "/admin/content-management/faqs",
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
              Create a new FAQ
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
                  name="question"
                  size="large"
                  label="Question"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput type="text" name="ans" size="large" label="Ans" />
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

export default AddFAQSPage;
