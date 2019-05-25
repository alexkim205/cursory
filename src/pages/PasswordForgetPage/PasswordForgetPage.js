import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { Link } from "react-router-dom";
import { withFirebase } from "../../components/Firebase";

import { ROUTES } from "../../_constants";

const INITIAL_STATE = {
  email: "",
  isSent: false, // is reset email sent?
  error: null
};

class PasswordForgetBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = { ...INITIAL_STATE };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE, isSent: true });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  checkRules = () => {
    const { email } = this.state;
    return email.length === 0;
  };

  render() {
    const { email, isSent, error } = this.state;
    const isInvalid = this.checkRules();

    return (
      <React.Fragment>
        {isSent ? (
          <React.Fragment>
            <p>
              Password reset email has been sent. Please check your email
              including your spam folder.
            </p>
            <button type="button" onClick={this.onSubmit}>
              Resend password reset e-mail.
            </button>
          </React.Fragment>
        ) : (
          <form onSubmit={this.onSubmit}>
            <input
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>

            {error && <p>{error.message}</p>}
          </form>
        )}
      </React.Fragment>
    );
  }
}

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetBase);

const PasswordForgetLink = () => (
  <React.Fragment>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </React.Fragment>
);

const PasswordForgetPage = () => (
  <React.Fragment>
    <h1>Password Forget Page</h1>
    <PasswordForgetForm />
  </React.Fragment>
);

export { PasswordForgetPage, PasswordForgetForm, PasswordForgetLink };
