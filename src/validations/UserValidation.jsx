import * as yup from "yup";

export const userSchema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup.string().email().required("Please enter valid email"),
  phoneNumber: yup
    .string()
    .matches(/^\d{1,8}$/, "Phone number must be at most 8 digits")
    .required("Please enter your mobile number"),
});
