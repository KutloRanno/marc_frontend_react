import { useSports } from "../contexts/SportsContext.jsx";
import styles from "./Form.module.css";
import { useState } from "react";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { sportSchema } from "../validations/SportValidation.jsx";
import { useFormik } from "formik";
import { toast } from "react-toastify";

// const baseUrl = `https://api.imgbb.com/1/upload`;
// const apiKey = `e476e2f7ad4820db2312d78642ddc93c`;

const initialValues = {
  sportName: "",
  imageUri: "",
};
function Form() {
  const { values, handleBlur, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: sportSchema,
    onSubmit: (values) => console.log(values),
  });

  const { isLoading, createSport, error } = useSports(); //from context
  const { admin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const notify = (message) => {
    toast(message);
  };

  // const [sportName, setSportName] = useState("");
  // const [imageUri, setImageUri] = useState("");
  // const [image, setImage] = useState("");

  /*const handleImageChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!sportName || !image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(`${baseUrl}?key=${apiKey}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);
      const data = await res.json();
      console.log(data);

      setImageUri((uri) => data.url);

      const newSportDto = {
        Name: sportName,
        ImageUri: imageUri,
        AdminId: crypto.randomUUID(),
      };

      await createSport(newSportDto);
      navigate("/app/sports");
    } catch (e) {}
  };
*/
  async function handleSubmitForm(e) {
    e.preventDefault();

    // const formData = {
    //   name: e.target.value[0],
    //   imageUri: e.target.value[1],
    // };

    handleSubmit();

    // const isValid = await sportSchema.isValid(formData);

    // if (!values.sportName || !values.imageUri) return;

    const newSportDto = {
      Name: values.sportName,
      ImageUri: values.imageUri,
      AdminId: crypto.randomUUID(),
    };

    await createSport(newSportDto);
    if (!error) notify("Sport added...🚀");
    navigate("/app/sports");
  }

  if (isLoading) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmitForm}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">Sport name</label>
        <input
          id="sportName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.sportName}
        />
        {errors.sportName && <small>{errors.sportName}</small>}
      </div>

      <div className={styles.row}>
        <label htmlFor="image">Image</label>
        <input
          type={"text"}
          name={"imageUri"}
          id={"imageUri"}
          value={values.imageUri}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.imageUri && <small>{errors.imageUri}</small>}
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
