import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "contexts/AuthContext";

export default ({ render, ...routeProps }) => {
  const { me } = useContext(AuthContext);
  return me ? <Route {...routeProps} /> : <Redirect to="/auth" />;
};
