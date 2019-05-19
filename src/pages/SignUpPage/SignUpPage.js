import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import { SignUpForm } from "../../components";
import { SignInLink } from "../SignInPage";

import { ROUTES } from "../../_constants";

const SignUpPage = () => (
  <React.Fragment>
    <h1>Sign Up Page</h1>
    <SignUpForm />
    <SignInLink />
  </React.Fragment>
);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const connectedPage = compose()(SignUpPage);

export { connectedPage as SignUpPage, SignUpLink };
