import { message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { getImgBBUrl } from "@/helpers/config/envConfig";

type ImageUploadProps = {
  name: string;
};

const UploadImage = ({ name }: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<"">();
  const { setValue } = useFormContext();
  const imageHostKey = getImgBBUrl();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      // Upload the image to imgBB
      const formData = new FormData();
      formData.append("image", info.file.originFileObj as any);

      try {
        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();

        if (data.status === 200) {
          // Set the uploaded image URL to your form field or state
          setValue(`${name ? name : "profileImg"}`, data.data.url);
          setImageUrl(data.data.url);
          message.success("Image uploaded successfully!");
        } else {
          message.error("Error uploading image to imgBB");
        }
      } catch (error: any) {
        message.error("Error uploading image: " + error.message);
      }

      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/file"
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="avatar"
            style={{ width: "100%" }}
            width={100}
            height={100}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
