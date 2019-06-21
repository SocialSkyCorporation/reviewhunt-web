import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "contexts/AuthContext";

export default ({ render, ...routeProps }) => {
  const { emailMe, authenticating } = useContext(AuthContext);

  if(authenticating) {
    return <div className="full-page" />;
  }

  return emailMe ? <Route {...routeProps} /> : <Redirect to="/auth" />;
};
