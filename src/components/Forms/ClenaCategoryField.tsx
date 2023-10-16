import { useGetAllCategoryQuery } from "@/redux/api/services/categoryApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";

type ACDepartmentIDFieldProps = {
  name: string;
  label?: string;

};

const CategoryField = ({
  name,
  label,

}: ACDepartmentIDFieldProps) => {
  const { data, isLoading } = useGetAllCategoryQuery({
    limit: 100,
    page: 1,
  });

  // @ts-ignore 
  const serviceCategories = data?.data;
  const acDepartmentOptions = serviceCategories?.map((category: any) => {
    console.log(category?.id);
    return {
      label: category?.title,
      value: category?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acDepartmentOptions as SelectOptions[]}
    
    />
  );
};

export default CategoryField;