import React from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Log } from "../../_helpers";

// HOC Components
import { withRouter } from "react-router-dom";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

// Routes
import { ROUTES } from "../../_constants";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    static propTypes = {
      firebase: PropTypes.object.isRequired,
      history: PropTypes.object.isRequired,
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            Log.warn("Not authorized!", "withAuthorization");
            this.props.history.push(ROUTES.SIGN_IN);
          }
          Log.success("Authorized!", "withAuthorization");
        },
        () => {
          Log.warn("Not authorized!", "withAuthorization");
          this.props.history.push(ROUTES.SIGN_IN);
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;
