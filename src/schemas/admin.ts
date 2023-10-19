import * as yup from "yup";

export const registerSchema = yup.object().shape({
  password: yup.string().min(6).max(32).required(),
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  contactNo: yup.string().required("Contact No is required"),
  address: yup.string().required("Address is required"),
  profileImg: yup.string().required("Profile Image is required"),
});
