import styles from "./UserRegister.module.css";
import { useEffect, useState } from "react";
import Message from "./Message.jsx";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useUsers } from "../contexts/UserContext.jsx";
import { useFormik } from "formik";
import { userSchema } from "../validations/UserValidation.jsx";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";

const baseUrl = `https://restcountries.com/v3.1/all`;

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
};
function UserRegister() {
  const { error, stageUser, isLoading } = useUsers();
  const navigate = useNavigate();

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [likedSports, setLikedSports] = useState([]);

  const { values, handleBlur, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values) => console.log(values),
  });

  const [countries, setCountries] = useState([]);

  useEffect(function () {
    async function getCountries() {
      try {
        const res = await fetch(baseUrl);
        const data = await res.json();
        setCountries((prevCountries) => [...prevCountries, ...data]);
        console.log(data);
      } catch (e) {
        console.error(e.message);
      }
    }
    getCountries();
  }, []);

  async function handleSubmitForm(e) {
    e.preventDefault();

    handleSubmit();

    // if (!(phoneNumber && email && country))
    //   return <Message message={"Please enter all your details first"} />;
    try {
      const myUser = {
        name: values.name,
        email: values.email,
        country,
        phoneNumber: values.phoneNumber,
        likedSports: [],
      };

      await stageUser(myUser);

      navigate("/app/sports");
    } catch (e) {}
  }

  function handleSelectCountry(e) {
    console.log(e.target.value);
    setCountry(e.target.value);
  }

  if (isLoading) return <Spinner />;

  return (
    <main className={styles.register}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.row}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
          />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div className={styles.row}>
          <label htmlFor="country">Country</label>
          <select
            className={styles.select}
            onChange={(e) => handleSelectCountry(e)}
          >
            <option key={"default"} value={"Country"}>
              Select a country
            </option>
            {countries.map((country) => (
              <option
                key={
                  country.cca3 +
                  "@" +
                  country.ccn3 +
                  "@" +
                  country.cca2 +
                  "@" +
                  crypto.randomUUID()
                }
                value={country.cca3 + "@" + country.ccn3 + "@" + country.cca2}
              >
                {country.name.common}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.row}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            onChange={handleChange}
            value={values.phoneNumber}
            onBlur={handleBlur}
          />
          {errors.phoneNumber && <small>{errors.phoneNumber}</small>}
        </div>

        {error && <Message message={error} />}

        <div>
          <Button type={"primary"}>Register</Button>
          <BackButton />
        </div>
      </form>
    </main>
  );
}

export default UserRegister;
