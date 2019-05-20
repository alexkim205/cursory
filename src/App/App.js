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
import {
  FavoritesPage,
  TagsPage,
  RecentPage,
  TrendingPage,
  PeoplePage
} from "../pages/PrivatePages";
import { Navigation, Footer, Toolbar } from "./";
import { RootWrapper, MainWrapper } from "./styles";

loadFonts();

const App = () => (
  <RootWrapper>
    <Router history={history}>
      <Navigation />
      <MainWrapper>
        <div className="content">
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
          {/* PRIVATE ROUTES at /home/* */}
          <Route
            exact
            path={`${ROUTES.HOME}${ROUTES.FAVORITES}`}
            component={FavoritesPage}
          />
          <Route
            exact
            path={`${ROUTES.HOME}${ROUTES.TAGS}`}
            component={TagsPage}
          />
          <Route
            exact
            path={`${ROUTES.HOME}${ROUTES.RECENT}`}
            component={RecentPage}
          />
          <Route
            exact
            path={`${ROUTES.HOME}${ROUTES.TRENDING}`}
            component={TrendingPage}
          />
          <Route
            exact
            path={`${ROUTES.HOME}${ROUTES.PEOPLE}`}
            component={PeoplePage}
          />
        </div>
      </MainWrapper>
      {/* <Footer /> */}
    </Router>
    {/* {renderToaster()} */}
  </RootWrapper>
);

const connectedPage = compose(
  withAuthentication,
)(App);

export { connectedPage as App };
