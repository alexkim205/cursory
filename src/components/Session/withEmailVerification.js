import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

// HOC Components
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

import {NarrowWrapper} from '../PageWrappers';

// Checks if user logged in with email, verified their email
const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    static propTypes = {
      firebase: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
    };

    state = { isSent: false };

    onSendEmailVerification = () => {
      const currentRoute = this.props.location.pathname;
      console.log("currentroute", currentRoute);

      this.props.firebase
        .doSendEmailVerification(currentRoute)
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <NarrowWrapper>
                {this.state.isSent ? (
                  <p>
                    E-mail confirmation sent: Check you e-mails (Spam folder
                    included) for a confirmation e-mail. Refresh this page once
                    you confirmed your e-mail.
                  </p>
                ) : (
                  <p>
                    Verify your e-mail: Check you e-mails (Spam folder included)
                    for a confirmation e-mail or send another confirmation
                    e-mail.
                  </p>
                )}
                <button type="button" onClick={this.onSendEmailVerification}>
                  Send confirmation e-mail
                </button>
              </NarrowWrapper>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return compose(withFirebase)(WithEmailVerification);
};

export default withEmailVerification;
