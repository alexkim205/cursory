import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

// HOC Components
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    static propTypes = {
      firebase: PropTypes.object.isRequired
    };

    state = { isSent: false };

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <React.Fragment>
                {this.state.isSent ? (
                  <p>
                    E-Mail confirmation sent: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail. Refresh this page once
                    you confirmed your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder included)
                    for a confirmation E-Mail or send another confirmation
                    E-Mail.
                  </p>
                )}
                <button type="button" onClick={this.onSendEmailVerification}>
                  Send confirmation E-Mail
                </button>
              </React.Fragment>
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
