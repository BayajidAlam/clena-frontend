"use client";

import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { USER_ROLE } from "@/constants/role";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { useAddNewCategoryMutation } from "@/redux/api/services/categoryApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateCategoryPage = () => {
  const [AddNewCategory, {}] = useAddNewCategoryMutation();
  const { role } = getUserInfo() as any;
  const router = useRouter();

  const onSubmit = async (values: any) => {
    
    try {
      const res = await AddNewCategory(values);
      console.log(res, "customer create on admin");
      // @ts-ignore
      if (res?.data?.success) {
        router.push("/admin/service-management");
        message.success("Category Created Successfully!");
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
              Add New Category
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
