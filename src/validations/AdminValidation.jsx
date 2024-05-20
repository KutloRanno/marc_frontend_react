import * as yup from "yup";
export const adminSchema = yup.object().shape({
  username: yup.string().required("Please enter username..."),
  password: yup.string().required("Please enter your password..."),
});
