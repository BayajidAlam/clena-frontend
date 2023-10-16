import { Button } from "antd";
import React from "react";

const CleanCommonCloseButton = ({ children, className, onClick }: any) => {

  return (
    <Button
      onClick={onClick}
      style={{
        background: "#FF9800",
        padding: "4px 22px",
        color: "white",
        fontSize: "14px",
        borderRadius: "20px",
        cursor: "pointer"
      }}
      className={className}
    >
      <p>{children}</p>
    </Button>
  );
};

export default CleanCommonCloseButton;
