import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { Link } from "react-router-dom";

import {
  SignInForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGithub,
  SignInMicrosoft
} from "../../components";
import { PasswordForgetLink } from "../PasswordForgetPage";
import { SignUpLink } from "../SignUpPage";

import { ROUTES } from "../../_constants";


const SignInPage = () => (
  <React.Fragment>
    <h1>Sign In</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInTwitter />
    <SignInGithub />
    <SignInMicrosoft />
    <PasswordForgetLink />
    <SignUpLink />
  </React.Fragment>
);

const SignInLink = () => (
    <p>
      Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </p>
  );

const connectedPage = compose()(SignInPage);

export { connectedPage as SignInPage, SignInLink};
