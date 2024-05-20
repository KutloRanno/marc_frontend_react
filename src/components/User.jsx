import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import styles from "./User.module.css";
function User() {
  const navigate = useNavigate();

  const { admin, logOut, isAuthenticated } = useAuth();

  if (!isAuthenticated) return;
  function handleClick() {
    logOut();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      {/*<img src={user.avatar} alt={user.name} />*/}
      <span>Welcome, {admin.username}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
