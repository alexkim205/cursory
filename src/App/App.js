import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Router, Route } from "react-router-dom";

// Routing
import { ROUTES } from "../_constants";

// Helpers
import { loadFonts, renderToaster, history } from "../_helpers";

// Components
import { withAuthentication } from "../components/Session";
import {
  AccountPage,
  AdminPage,
  EditorPage,
  HomePage,
  LandingPage,
  PasswordForgetPage,
  SignInPage,
  SignUpPage,
  LegalPage
} from "../pages";
import { Navigation, Footer } from "../components";
import { RootWrapper } from "./App.style";

loadFonts();

const App = () => (
  <RootWrapper>
    <Router history={history}>
      <Navigation />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route exact path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route exact path={ROUTES.ADMIN} component={AdminPage} />
      <Route exact path={ROUTES.EDITOR} component={EditorPage} />
      <Route exact path={ROUTES.LEGAL} component={LegalPage} />
      <Footer />
    </Router>
    {renderToaster()}
  </RootWrapper>
);
// function mapStateToProps(state) {
//   return {};
// }

const connectedPage = compose(
  withAuthentication,
  connect(
    null,
    null
  )
)(App);

export { connectedPage as App };
