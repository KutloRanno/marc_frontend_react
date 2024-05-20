import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const baseUrl = "http://localhost:5091";

const UsersContext = createContext();

const initialState = {
  users: [],
  isLoading: false,
  currentUser: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "users/loaded":
      return { ...state, users: action.payload, isLoading: false };
    case "user/staged":
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: "",
      };
    case "user/created":
      return { ...state, currentUser: action.payload, isLoading: false };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function UsersProvider({ children }) {
  const [{ users, isLoading, currentUser, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [email, setEmail] = useState();

  useEffect(function () {
    dispatch({ type: "loading" });

    async function fetchUsers() {
      try {
        const res = await fetch(`${baseUrl}/users`);
        const data = await res.json();
        console.log(data);
        dispatch({ type: "users/loaded", payload: data });
      } catch (e) {
        dispatch({
          type: "rejected",
          payload: "There was an error fetching users...",
        });
      }
    }

    fetchUsers();
  }, []);

  async function stageUser(userDto) {
    dispatch({ type: "loading" });

    try {
      const user = {
        Name: userDto.name,
        Email: userDto.email,
        PhoneNumber: userDto.PhoneNumber,
        FavouriteSportIds: userDto.likedSports,
        CountryCode: userDto.country,
      };
      dispatch({ type: "user/staged", payload: user });
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
      throw new Error();
    }
  }

  async function createUser(userDto) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${baseUrl}/users`, {
        method: "POST",
        body: JSON.stringify(userDto),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      dispatch({ type: "user/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating user...",
      });
      throw new Error();
    }
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        isLoading,
        error,
        currentUser,
        setEmail,
        email,
        stageUser,
        createUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}
function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined)
    throw new Error("Users context was used outside the users provider");
  return context;
}
export { UsersProvider, useUsers };
