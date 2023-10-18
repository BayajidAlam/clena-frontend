"use client";

import Loading from "@/app/loading";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  useGetSingleFaqQuery,
  useUpdateSingleBlogMutation,
  useUpdateSingleFaqMutation,
} from "@/redux/api/services/blogAndFAQApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfilePage = ({ params }: any) => {

  const { role } = getUserInfo();
  const router = useRouter();
  const id = params.slug;
  const [value, setValue] = useState({});

  const [updateSingleFaq, { isLoading: BlogLoading }] =
    useUpdateSingleFaqMutation();
  const { data, error, isLoading, refetch } = useGetSingleFaqQuery(id);
 
  
  // @ts-ignore
  const myData = data?.data as any;
  useEffect(() => {
    if (data) {
      setValue({
        ans: myData?.ans,
        question: myData?.question,
      });
    }
  }, [data, myData]);

  const onSubmit = async (values: any) => {
    
    try {
      const res = await updateSingleFaq({
        id,
        body: values,
      }).unwrap();
      // @ts-ignore
      if (res?.success) {
        refetch();
        message.success("Faq Successfully Updated!");
        router.push("/admin/content-management/all-faqs");
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
            label: `faqs`,
            link: `/admin/content-management/all-faqs`,
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
                <FormInput type="Ans" name="ans" size="large" label="Text" />
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

export default UserProfilePage;
