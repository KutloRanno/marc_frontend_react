import AdminLogin from "./AdminLogin.jsx";
import { Outlet } from "react-router-dom";
import styles from "./AuthMain.module.css";

function AuthMain() {
  return (
    <div className={styles.main}>
      {/*wanna create a navigation for user to switch between create account and login here*/}
      <Outlet />
    </div>
  );
}

export default AuthMain;
