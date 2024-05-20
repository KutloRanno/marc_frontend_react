import { useSports } from "../contexts/SportsContext.jsx";
import SportItem from "./SportItem.jsx";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import styles from "./SportList.module.css";
import { useEffect } from "react";
import BackButton from "./BackButton.jsx";
import { useUsers } from "../contexts/UserContext.jsx";

function SportList() {
  const { sports, isLoading, error, filteredSports } = useSports();
  const { user, createUser } = useUsers;

  const sportsToRender = filteredSports.length > 0 ? filteredSports : sports;
  async function handleClick() {
    try {
    } catch (e) {}
  }

  if (error) return <Message message={error} />;
  if (isLoading) return <Spinner />;
  if (!sportsToRender.length)
    return <Message message={"No sports input yet."} />;
  return (
    <>
      <BackButton />
      <ul className={styles.sportList}>
        {sportsToRender.map((sport) => (
          <SportItem sport={sport} key={sport.id} />
        ))}
      </ul>
    </>
  );
}

export default SportList;
