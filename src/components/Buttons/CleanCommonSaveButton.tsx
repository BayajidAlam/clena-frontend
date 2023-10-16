import { Button } from "antd";
import React from "react";

const CleanCommonSaveButton = ({ children, className, onClick }: any) => {
  return (
    <Button
      onClick={onClick}
      htmlType="submit"
      style={{
        background: "#fd4f1a",
        padding: "4px 22px",
        color: "white",
        fontSize: "14px",
        borderRadius: "20px",
        cursor: "pointer",
      }}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CleanCommonSaveButton;
