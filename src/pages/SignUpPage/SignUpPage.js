import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import {
  SignUpForm,
  NarrowWrapper,
  FormWrapper,
  SignInGoogle,
  SignInGithub,
  SignInFacebook,
  SignInTwitter,
  SignInMicrosoft,
  SignInForm,
} from "../../components";
import { SignInLink } from "../SignInPage";

import { ROUTES } from "../../_constants";
import { PasswordForgetLink } from "../PasswordForgetPage";

class SignUpPage extends React.Component {
  state = { error: null };
  setError = error => {
    this.setState({ error });
  };
  render() {
    return (
      <NarrowWrapper>
        <h1>Sign Up Page</h1>
        <FormWrapper>
          {this.state.error && (
            <div className={"error"}>{this.state.error.message}</div>
          )}
          <SignUpForm setError={this.setError} />
        </FormWrapper>
        <div className={"form-links"}>
          <SignInLink />
          <div className={"divider"} />
          <PasswordForgetLink />
        </div>
      </NarrowWrapper>
    );
  }
}

const SignUpLink = () => (
  <React.Fragment>
    <Link to={ROUTES.SIGN_UP}>Sign Up!</Link>
  </React.Fragment>
);

const connectedPage = compose()(SignUpPage);

export { connectedPage as SignUpPage, SignUpLink };
