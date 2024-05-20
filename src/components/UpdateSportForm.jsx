import styles from "./Form.module.css";
import Button from "./Button.jsx";
import BackButton from "./BackButton.jsx";
import { useSports } from "../contexts/SportsContext.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { useFetchSport } from "../hooks/useGetCurrentSport.js";
import { toast } from "react-toastify";

function UpdateSportForm() {
  const { currentSport, isLoading, updateSport, error, getSport } = useSports();
  const navigate = useNavigate();
  const { id } = useParams();
  const notify = (message) => {
    toast(message);
  };

  useFetchSport(getSport, id);

  /* useEffect(
    function () {
      getSport(id);
      // setSportName(currentSport.name);
      // setImageUri(currentSport.imageUri);
    },
    [getSport, id]
  ); //should finish up later after I add getSport function to context*/

  // const [sportName, setSportName] = useState(currentSport.name);
  // const [imageUri, setImageUri] = useState(currentSport.imageUri);
  const [sportName, setSportName] = useState(currentSport.name);
  const [imageUri, setImageUri] = useState(currentSport.imageUri);

  if (isLoading) return <Spinner />;
  if (!Object.keys(currentSport).length)
    return <Message message={"No sport has been selected for updating"} />;

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const sportUpdateDto = {
        Name: sportName,
        ImageUri: imageUri,
        sportId: currentSport.id,
      };

      await updateSport(sportUpdateDto);
      if (!error) notify("Sport updated! 💅💅");
      navigate(-1);
    } catch (e) {
      return <Message message={"what in the world"} />;
    }
  }
  console.log(currentSport);
  return (
    <form onSubmit={handleUpdate}>
      <div className={styles.row}>
        <label htmlFor="cityName">Sport name</label>
        <input
          id="sportName"
          onChange={(e) => setSportName(e.target.value)}
          value={sportName}
        />
      </div>
      <div className={styles.row}>
        <label htmlFor="cityName">Image Uri</label>
        <input
          id="imageUri"
          onChange={(e) => setImageUri(e.target.value)}
          value={imageUri}
        />
      </div>
      <div className={styles.buttons}>
        <Button type={"primary"}>Update</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default UpdateSportForm;
