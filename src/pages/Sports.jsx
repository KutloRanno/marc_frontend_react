import styles from "./Sports.module.css";
import MainBar from "../components/MainBar.jsx";
import User from "../components/User.jsx";
import { useUsers } from "../contexts/UserContext.jsx";

export default function Sports() {
  const { currentUser, createUser, isLoading } = useUsers();

  const userPack = {
    currentUser,
    createUser,
    isLoading,
  };
  return (
    <div className={styles.sports}>
      <User />
      <MainBar userPack={userPack} />
    </div>
  );
}
