import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const baseUrl = "http://localhost:5091";

const SportsContext = createContext();

const initialState = {
  sports: [],
  isLoading: false,
  currentSport: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "sports/loaded":
      return { ...state, sports: action.payload, isLoading: false };
    case "sport/loaded":
      return { ...state, currentSport: action.payload, isLoading: false };
    case "sport/created":
      return {
        ...state,
        isLoading: false,
        sports: [...state.sports, action.payload],
      };
    case "sport/updated":
      return {
        ...state,
        isLoading: false,
        currentSport: action.payload,
        sports: [
          action.payload,
          ...state.sports.filter((sport) => sport.id !== action.payload.id),
        ],
      };
    case "sport/deleted":
      return {
        ...state,
        isLoading: false,
        sports: state.sports.filter((sport) => sport.id !== action.payload),
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}
function SportsProvider({ children }) {
  const [{ sports, isLoading, currentSport, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSports = sports.length
    ? sports.filter((sport) =>
        sport.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  //create a useffect to load sports on initial load. We access backend here
  useEffect(function () {
    dispatch({ type: "loading" });
    async function fetchSports() {
      try {
        const res = await fetch(`${baseUrl}/sports`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "sports/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading sports",
        });
      }
    }
    fetchSports();
  }, []);

  async function createSport(newSport) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${baseUrl}/sports/`, {
        method: "POST",
        body: JSON.stringify(newSport),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("There was an error creating sport");

      const data = await res.json();
      dispatch({ type: "sport/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: e.message,
      });
    }
  }

  const getSport = useCallback(
    async function getSport(id) {
      if (id === currentSport.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${baseUrl}/sports/${id}`);
        const data = await res.json();
        dispatch({ type: "sport/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading sport...",
        });
      }
    },
    [currentSport.id]
  );

  const updateSport = async function (updateDto) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${baseUrl}/sports/${updateDto.sportId}`, {
        method: "PUT",
        body: JSON.stringify({
          Name: updateDto.Name,
          ImageUri: updateDto.ImageUri,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("There was an error updating sport...");
      const data = await res.json();
      dispatch({ type: "sport/updated", payload: data });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "rejected",
        payload: e.message,
      });
    }
  };

  async function deleteSport(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${baseUrl}/sports/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "sport/deleted", payload: id });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the sport",
      });
    }
  }

  return (
    <SportsContext.Provider
      value={{
        sports,
        isLoading,
        currentSport,
        error,
        createSport,
        deleteSport,
        getSport,
        updateSport,
        setSearchTerm,
        filteredSports,
      }}
    >
      {children}
    </SportsContext.Provider>
  );
}

function useSports() {
  const context = useContext(SportsContext);
  if (context === undefined)
    throw new Error("Sports context was used outside the sports provider");
  return context;
}
export { SportsProvider, useSports };
