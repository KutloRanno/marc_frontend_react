import { useAuth } from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );

  return children;
}

export default ProtectedRoute;

/*
This will be used to protect the app from unauthorized access. This element will be used to wrap the AppLayout element in the
"app" route in our routes in App.jsx file. The AppLayout element renders all of our app that is why we chose it as the one we
wrap in the ProtectedRoute element and return it
*/
