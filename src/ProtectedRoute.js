import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "contexts/AuthContext";
import {getParams} from 'utils/helpers/urlHelper';

export default ({ render, ...routeProps }) => {
  const { emailMe, authenticating } = useContext(AuthContext);

  if(authenticating) {
    return <div className="full-page" />;
  }

  const query = window.location.search;

  return emailMe ? <Route {...routeProps} /> : <Redirect to={`/auth${query}`} />;
};
