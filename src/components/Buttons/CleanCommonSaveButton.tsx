import { Button } from "antd";
import React from "react";

const CleanCommonSaveButton = ({ children, className, onClick,style }: any) => {
  return (
    <Button
      onClick={onClick}
      htmlType="submit"
      type="primary"
      style={{
        background: "#fd4f1a",
        padding: "4px 22px",
        color: "white",
        fontSize: "14px",
        borderRadius: "20px",
        cursor: "pointer",
        ...style
      }}
      className={className}
    >
      {children}
    </Button>
  );
};

export default CleanCommonSaveButton;
