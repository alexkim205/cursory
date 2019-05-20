import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { MemoryRouter } from "react-router";

import {
  SignInForm,
  SignUpForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGithub,
  SignInMicrosoft
} from "../components";

storiesOf("Components|Authentication Forms", module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={["/"]}>{story()}</MemoryRouter>
  ))
  .add("SignInForm", () => <SignInForm />)
  .add("SignUpForm", () => <SignUpForm />)
  .add("Social Sign Up Buttons", () => (
    <React.Fragment>
      <SignInGoogle />
      <SignInFacebook />
      <SignInTwitter />
      <SignInGithub />
      <SignInMicrosoft />
    </React.Fragment>
  ));
