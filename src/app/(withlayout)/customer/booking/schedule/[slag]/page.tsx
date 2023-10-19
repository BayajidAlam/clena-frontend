"use client";

import CleanCommonSaveButton from "@/components/Buttons/CleanCommonSaveButton";
import Form from "@/components/Forms/Form";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Col, Row, message } from "antd";
import { useRouter } from "next/navigation";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import { useState } from "react";
import { useUpdateBookingStatusMutation } from "@/redux/api/bookingApi";
import dayjs from "dayjs";

const CreateCategoryPage = ({ params }: any) => {
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  const router = useRouter();
  const [newDate, setNewDate] = useState(dayjs(new Date()));

  const onSubmit = async (values: any) => {
    console.log(newDate, "newData");
    const res = await updateBookingStatus({
      id: params.slag,
      body: { booking_schedult: newDate },
    }).unwrap();
    console.log(res, "data");
    // @ts-ignore
    if (res?.success) {
      router.push("/customer/booking");
      message.success("Booking Status Updated successfully!");
    }
  };

  const disabledDate = (current: any) => {
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const handleOnChange = (date: any, dateString: any) => {
    const isoDate = date.toISOString();
    setNewDate(isoDate);
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
              Reschedule Booking
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  value={dayjs(newDate) || undefined}
                  disabledDate={disabledDate}
                  onChange={handleOnChange}
                  label="Time"
                  name=""
                ></FormDatePicker>
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
