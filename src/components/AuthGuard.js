import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const username = localStorage.getItem("username");

  if (!username) {
    return <Redirect to="/auth/sign-in" />;
  }

  return children;
}

export default AuthGuard;
