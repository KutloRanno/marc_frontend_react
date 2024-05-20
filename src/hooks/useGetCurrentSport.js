import { useSports } from "../contexts/SportsContext.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

// Custom hook for fetching sport data
export function useFetchSport(getSport, id) {
  useEffect(() => {
    getSport(id); // Call the getSport function with the provided id
  }, [getSport, id]); // Re-run effect if getSport or id changes
}
