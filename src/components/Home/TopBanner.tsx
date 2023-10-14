import React from "react";
import CleanSvg from "../../assets/cleaning service-pana.svg";
import Image from "next/image";
import { Button } from "antd";

const TopBanner = () => {
  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
        padding: "70px 0",
      }}
      className="lg:flex justify-between items-center"
    >
      <div className="lg:mb-0 mb-6">
        <h1
          style={{
            color: "#13287E",
            fontSize: "60px",
          }}
          className="tracking-widest"
        >
          Spring <br />
          Cleaning <br /> Don't Panic
        </h1>
        <p className="w-[90%] my-6">
          We understand people are different and so are their cleaning
          requirements
        </p>

        <div className="flex items-center gap-4">
          <Button
            htmlType="submit"
            style={{
              background: "#fd4f1a",
              padding: "8px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
              display:"flex",
              justifyContent: "center",
              alignItems : "center",
            }}
         
          >
            Our Service
          </Button>
          <Button
    
            style={{
              background: "#fd4f1a",
              padding: "8px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
              display:"flex",
              justifyContent: "center",
              alignItems : "center",
            }}
           
          >
            Upcoming Events
          </Button>
        </div>
      </div>

      <Image className="w-[100%] lg:w-[800px]" src={CleanSvg} alt="clean svg" width={800} height={400}></Image>
    </div>
  );
};

export default TopBanner;
