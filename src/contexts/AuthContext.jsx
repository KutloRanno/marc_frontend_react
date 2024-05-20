import { createContext, useContext, useReducer } from "react";
import { useToast } from "react-toastify";

const baseUrl = "http://localhost:5091";

const AuthContext = createContext();

const initialState = {
  admin: {},
  isAuthenticated: false,
  isLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, isAuthenticated: false };
    case "admin/created":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        admin: action.payload,
        error: "",
      };
    case "admin/logged":
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: "",
      };
    case "admin/loggedout":
      return { ...state, isLoading: false, isAuthenticated: false, error: "" };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ admin, isLoading, error, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function createAdmin(newAdminDto) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${baseUrl}/admin/register`, {
        method: "POST",
        body: JSON.stringify(newAdminDto),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log({ data });
      dispatch({ type: "admin/created", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: "Something went wrong while creating admin....",
      });
      throw new Error();
    }
  }
  async function logIn(loginDto) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${baseUrl}/admin/login`, {
        method: "POST",
        body: JSON.stringify(loginDto),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Wrong log in details...");
      const data = await res.json();

      console.log(data);
      dispatch({ type: "admin/logged", payload: data });
    } catch (e) {
      dispatch({
        type: "rejected",
        payload: e.message,
      });
      throw new Error();
    }
  }

  function logOut() {
    dispatch({ type: "loading" });

    try {
      dispatch({ type: "admin/loggedout" });
    } catch (e) {
      dispatch({ type: "rejected", payload: e.message });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated,
        error,
        isLoading,
        createAdmin,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth context was used outside the auth provider");
  return context;
}
export { AuthProvider, useAuth };
