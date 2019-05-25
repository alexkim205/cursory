import React from "react";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { withFirebase } from "./Firebase";
import { ROUTES } from "../_constants";

const SignOutButton = ({ firebase, history }) => (
  <a
    type="button"
    onClick={() => {
      firebase.doSignOut();
      history.push(ROUTES.LANDING);
    }}
  >
    Sign Out
  </a>
);

const connectedComponent = compose(
  withRouter,
  withFirebase
)(SignOutButton);

export { connectedComponent as SignOutButton };
