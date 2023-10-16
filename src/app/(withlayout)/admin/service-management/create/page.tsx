"use client";

import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import CategoryField from "@/components/Forms/ClenaCategoryField";
import ClenaSelectField from "@/components/Forms/ClenaSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { locationOptions, statusOptions } from "@/constants/global";
import { USER_ROLE } from "@/constants/role";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const CreateServicePage = () => {
  const [userSignUp, {}] = useUserSignUpMutation();
  const { role } = getUserInfo() as any;
  const router = useRouter();

  const onSubmit = async (values: any) => {
    console.log(values,'data');
    // const dataWithRole = { ...values, role: USER_ROLE.CUSTOMER };
    // console.log(dataWithRole);
    try {
      // const res = await userSignUp(dataWithRole);
      // console.log(res, "customer create on admin");
      // // @ts-ignore
      // if (res?.data?.success) {
      //   router.push("/admin/user-management");
      //   message.success("Customer Created Successfully!");
      // }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
                <ClenaSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  size="large"
                  name="location"
                  options={locationOptions}
                  label="Location"
                  placeholder="Select Location"
                  onSearch={onSearch}
                  filterOption={filterOption}
                ></ClenaSelectField>
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <ClenaSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  size="large"
                  name="status"
                  options={statusOptions}
                  label="Status"
                  placeholder="Select Status"
                  onSearch={onSearch}
                  filterOption={filterOption}
                ></ClenaSelectField>
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <CategoryField
                  name="categoryId"
                  label="Category"
                ></CategoryField>
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
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="Details"
                  size="large"
                  label="details"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
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
              <CleanCommonSaveButton>Save</CleanCommonSaveButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateServicePage;
