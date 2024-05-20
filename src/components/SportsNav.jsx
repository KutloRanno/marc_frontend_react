import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import styles from "./SportsNav.module.css";
import { useAuth } from "../contexts/AuthContext.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import { toast } from "react-toastify";
import Search from "./Search.jsx";

function SportsNav({ userPack }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { currentUser, createUser, error, isLoading } = userPack;
  const notify = (message) => {
    toast(message);
  };

  function handleClick() {
    navigate("form");
  }

  async function handleSave() {
    try {
      await createUser(currentUser);
      if (!error)
        notify("Preferences successfully recorded, thanks for registering");

      if (error) return <Message message={error} />;
      navigate("/app");
    } catch (e) {
      return <Message message={e.message} />;
    }
  }

  //function will contain the search bar, create sport button and other things I might think of in the future.
  return (
    <div>
      <nav className={styles.nav}>
        <Search />
        <Button onClick={handleClick} type={"new"}>
          New Sport +
        </Button>

        {isLoading ? (
          <Spinner />
        ) : (
          <Button onClick={handleSave} type={"primary"}>
            Submit
          </Button>
        )}
      </nav>
    </div>
  );
}

export default SportsNav;
