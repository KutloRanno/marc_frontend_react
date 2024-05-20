import styles from "./AdminReg.module.css";
import PageNav from "./PageNav.jsx";
import Message from "./Message.jsx";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

function AdminReg() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { error, isLoading, createAdmin } = useAuth();
  console.log(isLoading);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!(username && password))
        return <Message message={"Please enter username and password"} />;
      const createAdminDto = {
        Username: username,
        Password: password,
      };

      await createAdmin(createAdminDto);

      if (error) return <Message message={error} />;

      navigate("/");
    } catch (e) {
      return <Message message={e.message} />;
    }
  }

  return (
    <main className={styles.register}>
      {isLoading && <Spinner />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <Message message={error} />}
        <div>
          <Button type={"primary"}>Register</Button>
          <BackButton />
        </div>
      </form>
      <p>
        Already have an account? Then{" "}
        <span>
          <NavLink to={"../login"}>login</NavLink>
        </span>
      </p>
    </main>
  );
}

export default AdminReg;
