import PageNav from "./PageNav.jsx";

import styles from "./AdminLogin.module.css";
import Button from "./Button.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import BackButton from "./BackButton.jsx";
import { useFormik } from "formik";
import { adminSchema } from "../validations/AdminValidation.jsx";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  password: "",
};

function AdminLogin() {
  const { logIn, admin, isAuthenticated, isLoading, error } = useAuth();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const notify = (message) => {
    toast(message);
  };

  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    validationSchema: adminSchema,
    initialValues: initialValues,
  });

  async function handleSubmitForm(e) {
    e.preventDefault();

    handleSubmit();

    try {
      // if (!username || !password)
      //   return <Message message={"Please enter all your details"} />;

      const logInDto = {
        Username: values.username,
        Password: values.password,
      };

      await logIn(logInDto);

      if (isAuthenticated) notify("You are logged in...");

      // if (error) return;
      // <Message message={error} />;

      navigate("/");
    } catch (e) {}
  }

  if (isLoading) return <Spinner />;
  // if (isAuthenticated)
  //   return <Message message={`User ${admin.username} already logged in...`} />;
  // if (error) return <Message message={error} />;
  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={handleSubmitForm}>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            onChange={handleChange}
            value={values.username}
            onBlur={handleBlur}
          />
          {errors.username && <small>{errors.username}</small>}
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>
        {error && <Message message={error} />}

        <div>
          <Button type={"primary"}>Login</Button>
          <BackButton />
        </div>
      </form>
      <p>
        Don't have an account yet? Then{" "}
        <span>
          <NavLink to={"../register"}>register...</NavLink>
        </span>
      </p>
    </main>
  );
}

export default AdminLogin;
