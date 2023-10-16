import { Button } from "antd";
import React from "react";

const CleanCommonCloseButton = ({ children, className, onClick,style }: any) => {
  return (
    <Button
      type="primary"
      onClick={onClick}
      style={{
        background: "#FF9800",
        padding: "4px 22px",
        color: "white",
        fontSize: "14px",
        borderRadius: "20px",
        cursor: "pointer",
        ...style
      }}
      className={className}
    >
      <p>{children}</p>
    </Button>
  );
};

export default CleanCommonCloseButton;
