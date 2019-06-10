import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import { withFirebase } from "../../components/Firebase";
import { AuthUserContext } from "../../components/Session";

import { ROUTES } from "../../_constants";

const INITIAL_STATE = {
  passwordCurrent: "",
  passwordOne: "",
  passwordTwo: "",
  isChanged: false,
  error: null,
};

// Checks if current user is NOT authenticated
// via social, but instead through email
const isNotSocialAccount = authUser =>
  authUser &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes("password");

class PasswordChangeForm extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  state = { ...INITIAL_STATE };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { passwordCurrent, passwordOne } = this.state;

    this.props.firebase
      .doReauthenticate(passwordCurrent)
      .then(() => this.props.firebase.doPasswordUpdate(passwordOne))
      .then(() => {
        this.setState({ ...INITIAL_STATE, isChanged: true });
      })
      .catch(error => {
        this.setState({ error, isChanged: false });
      });

    event.preventDefault();
  };

  checkRules = () => {
    const { passwordCurrent, passwordOne, passwordTwo, error } = this.state;
    return (
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      passwordCurrent === ""
    );
  };

  render() {
    const {
      passwordCurrent,
      passwordOne,
      passwordTwo,
      error,
      isChanged,
    } = this.state;

    const isInvalid = this.checkRules();

    return (
      <AuthUserContext.Consumer>
        {authUser =>
          isNotSocialAccount(authUser) ? (
            <React.Fragment>
              <form onSubmit={this.onSubmit}>
                <input
                  name="passwordCurrent"
                  value={passwordCurrent}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Current Password"
                />
                <input
                  name="passwordOne"
                  value={passwordOne}
                  onChange={this.onChange}
                  type="password"
                  placeholder="New Password"
                />
                <input
                  name="passwordTwo"
                  value={passwordTwo}
                  onChange={this.onChange}
                  type="password"
                  placeholder="Confirm New Password"
                />
                <button disabled={isInvalid} type="submit">
                  Reset My Password
                </button>

                {error && <p>{error.message}</p>}
              </form>
              {isChanged && <p>Password successfully changed.</p>}
            </React.Fragment>
          ) : (
            <p>
              Since you logged in with a social account, you don't have a
              password to change.
            </p>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}

const connectedComponent = compose(
  withFirebase,
  connect(
    null,
    null,
  ),
)(PasswordChangeForm);

export { connectedComponent as PasswordChangeForm };
