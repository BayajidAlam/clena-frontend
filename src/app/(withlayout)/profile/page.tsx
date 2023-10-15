"use client";

import CleanCommonCloseButton from "@/components/Buttons/CleanCommonCloseButton";
import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { IDepartment } from "@/types";
import { Button, Col, Row, message } from "antd";


const CreateAdminPage = () => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
  //@ts-ignore
  const departments: IDepartment[] = data?.departments;
  const { role } = getUserInfo() as any;

  const departmentOptions =
    departments &&
    departments?.map((department) => {
      return {
        label: department?.title,
        value: department?.id,
      };
    });

  const onSubmit = async (values: any) => {
    console.log(values);
    const obj = { ...values };
    const file = obj["profileImg"];
    delete obj["profileImg"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("profileImg", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    
    try {
      await addAdminWithFormData(formData);
      message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
          {
            label: "admin",
            link: "/super_admin/admin",
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
                <UploadImage name="file" />
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <CleanCommonCloseButton>Close</CleanCommonCloseButton>

              <CleanCommonSaveButton>Create</CleanCommonSaveButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdminPage;
