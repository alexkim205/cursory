import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import {
  SignInForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGithub,
} from "../../components";

import { ROUTES } from "../../_constants";
import { PasswordForgetLink } from "../PasswordForgetPage";
import { SignUpLink } from "../SignUpPage";

const SignInPage = () => (
  <React.Fragment>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogle />
    <SignInFacebook />
    <SignInGithub/>
    <SignInTwitter /> 
    <PasswordForgetLink />
    <SignUpLink />
  </React.Fragment>
);

const connectedPage = compose()(SignInPage);

export { connectedPage as SignInPage };
