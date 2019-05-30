import React from "react";
import { AuthConsumer } from "contexts/AuthContext";
import {getLoginURL} from 'utils/token';

export default function Auth() {
  return (
    <AuthConsumer>
      {({ authReddit }) => (
        <div>
          <p onClick={authReddit}>reddit</p>
          <p onClick={() => window.location = getLoginURL()}>steemit</p>
        </div>
      )}
    </AuthConsumer>
  );
}
