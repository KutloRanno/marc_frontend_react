import { useSports } from "../contexts/SportsContext.jsx";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner.jsx";
import BackButton from "./BackButton.jsx";
import Message from "./Message.jsx";
import { useFetchSport } from "../hooks/useGetCurrentSport.js";
import {useAuth} from "../contexts/AuthContext.jsx";
function Sport() {
  const { id } = useParams();

  const {admin,isAuthenticated}=useAuth();
  const { currentSport, isLoading, getSport } = useSports();

  useFetchSport(getSport, id);

  /*useEffect(
    function () {
      getSport(id);
    },
    [getSport, id]
  ); //should finish up later after I add getSport function to context*/

  const { name, postDate, imageUri, adminId } = currentSport;

  //i wanna enable me to get name of admin who added sport using their admin id

  if (isLoading) return <Spinner />;

  if (!Object.keys(currentSport).length)
    return <Message message={"There is currently no sport selected"} />;

  return (
    <div>
      {isAuthenticated&&<Link className={""} to={`edit`}>
        Edit
      </Link>}
      <div className={""}>
        <div className={""}>
          <h6>Sport name</h6>
        </div>

        <div className={""}>
          <h6>The sport {name} was added on</h6>
          <p>{postDate || null}</p>
        </div>

        <div className={""}>
          <h6>By admin</h6>
          <p>{adminId || "John Doe"}</p>
        </div>

        <div className={""}>
          <h6>Image Uri</h6>
          <a href={`${imageUri}`} target="_blank" rel="noreferrer">
            {imageUri}
          </a>
        </div>

        <div>
          <BackButton />
        </div>
      </div>
    </div>
  );
}

export default Sport;
