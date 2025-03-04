import React, { useContext } from "react";
import { ContextProvider } from "../../Provider/Provider";
import Loading from "../Loading/Loading";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userAcount, loading } = useContext(ContextProvider);

  if (loading) {
    return <Loading></Loading>;
  }
  if (userAcount) {
    return children;
  } else {
    return <Navigate state={location.pathname} to={"/sign-in"}></Navigate>;
  }
};

export default PrivateRoute;
