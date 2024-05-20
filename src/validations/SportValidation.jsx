import * as yup from "yup";

export const sportSchema = yup.object().shape({
  sportName: yup.string().required("Please enter name of sport"),
  imageUri: yup.string().required("Please input image"),
});
