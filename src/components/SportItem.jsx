import { useSports } from "../contexts/SportsContext.jsx";
import { Link } from "react-router-dom";
import styles from "./SportItem.module.css";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useUsers } from "../contexts/UserContext.jsx";
import { toast } from "react-toastify";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function SportItem({ sport }) {
  const { deleteSport, error } = useSports(); //will be used to highlight our sport somehow if it the current sport
  const { id, name, postDate } = sport;
  const { isAuthenticated, admin } = useAuth();
  const { currentUser } = useUsers();
  const notify = (message) => {
    toast(message);
  };

  const handleDelete = async function (e) {
    e.preventDefault();

    await deleteSport(id);
    if (!error) notify("Sport deleted..🗑️");
  };

  const handleAdd = function (e) {
    e.preventDefault();

    currentUser.FavouriteSportIds.push(id);
  };

  //might use admin id to also show who added sport here

  return (
    <li>
      <Link className={`${styles.sportItem}`} to={`${id}`}>
        <img className={""} alt={"picture of sport"} />
        <h3 className={""}>{name}</h3>
        <time className={""}>({formatDate(postDate)})</time>
        <button className={styles.addButton} onClick={handleAdd}>
          &#43;
        </button>
        {isAuthenticated && (
          <button className={styles.deleteButton} onClick={handleDelete}>
            &times;
          </button>
        )}
      </Link>
    </li>
  );
}

export default SportItem;
