import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AppContext from "contexts/AppContext";

export default ({ render, ...routeProps }) => {
  const { authenticated } = useContext(AppContext);
  return authenticated ? <Route {...routeProps} /> : <Redirect to="/auth" />;
};
