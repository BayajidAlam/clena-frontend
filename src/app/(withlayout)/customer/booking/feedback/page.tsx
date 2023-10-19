"use client";

import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Col, Row, message } from "antd";
import FormInput from "@/components/Forms/FormInput";
import FormTextArea from "@/components/Forms/FormTextArea";
import { getUserInfo } from "@/services/auth.service";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useAddNewFeedBackMutation } from "@/redux/api/services/blogAndFAQApi";
import { useRouter } from "next/navigation";

const CreateCategoryPage = () => {
  
  const { userId } = getUserInfo();
  const router = useRouter();
  const { data } = useGetSingleUserQuery(userId);
  const [addNewFeedBack] = useAddNewFeedBackMutation();
  // @ts-ignore
  const id = data?.data?.id;
  const onSubmit = async (values: any) => {
    const feedBack = {
      userId: id,
      feedback: values.feedback,
    };
    const res = await addNewFeedBack(feedBack);
    // @ts-ignore
    if (res?.data?.data) {
      router.push("/customer/booking");
      message.success("Thanks for your feedback!");
    }
  };

  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "service management",
            link: "/admin/service-management",
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
              Write Your Feedback
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                {" "}
                <FormTextArea name="feedback" label="Feedback" rows={4} />
                <FormInput type="text" name="name" size="large" label="Name" />
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

export default CreateCategoryPage;
