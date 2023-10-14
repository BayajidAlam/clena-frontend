import Image from "next/image";
import Logo from "../../assets/clena-logo.png";
import Link from "next/link";
import { Button } from "antd";

const HomeHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "75%",
        padding: "10px 0px",
        margin: "0px auto",
      }}
    >
      <p
        style={{
          fontSize: "30px",
          color: "#ff5100",
          fontWeight: "bold"
        }}
      >
        CLENA
      </p>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}>
        <Link href={`/service`}>
        
          <Button
            style={{
              background: "#fd4f1a",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Booking
          </Button>
        </Link>
        <Link href={`/service`}>
    
          <Button
            style={{
              background: "#fd4f1a",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Cart
          </Button>

        </Link>
        <Link href={`/service`}>
      
          <Button
            style={{
              background: "#fd4f1a",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Login
          </Button>
        </Link>
        <Link href={`/service`}>
        
          <Button
            style={{
              background: "#fd4f1a",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Register
          </Button>
        </Link>
      </div>

    </div>
  );
};

export default HomeHeader;
