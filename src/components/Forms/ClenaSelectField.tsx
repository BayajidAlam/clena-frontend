"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input, Select } from "antd";
import { type } from "os";
import { useFormContext, Controller } from "react-hook-form";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  required?: boolean;
  onSearch?: (value: string) => void; // Update this line
  filterOption?: (
    input: string,
    option: { label: string; value: string }
  ) => boolean;
  disable?: boolean;
  style?: any;
  validation?: object;
};

const ClenaSelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
  required,
  onSearch,
  filterOption,
  disable,
  style,
  validation,
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: "red" }}>{`${required ? "*" : ""}`}</p>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            size={size}
            showSearch
            placeholder={placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            // @ts-ignore
            filterOption={filterOption}
            options={options}
            value={value}
            style={{
              textAlign: "center",
              ...(style ? style : ""),
            }}
            disabled={disable}
          />
        )}
      />
      <small
        style={{
          color: "red",
        }}
      >
        {errorMessage}
      </small>
    </>
  );
};

export default ClenaSelectField;