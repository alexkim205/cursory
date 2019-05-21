import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Router, Route, Switch, withRouter} from 'react-router-dom';

// Routing
import {ROUTES} from '../_constants';

// Helpers
import {loadFonts, renderToaster, history} from '../_helpers';

// Components
import {withAuthentication} from '../components/Session';
import {
  AccountPage,
  AdminPage,
  EditorPage,
  HomePage,
  LandingPage,
  PasswordForgetPage,
  SignInPage,
  SignUpPage,
  LegalPage,
} from '../pages';
import {
  FavoritesPage,
  TagsPage,
  RecentPage,
  TrendingPage,
  PeoplePage,
} from '../pages/PrivatePages';
import {Navigation, Footer} from './';
import {BodyWrapper, RootWrapper} from './styles';
import {Content} from '../components/Layout/Content';

loadFonts();

const App = () => (
    <Router history={history}>
      <RootWrapper>
        <Navigation/>
        <BodyWrapper>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
          <Content>
            <Route exact path={ROUTES.LANDING} component={LandingPage}/>
            <Route exact path={ROUTES.SIGN_UP} component={SignUpPage}/>
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage}/>
            <Route
                exact
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
            />
            <Route exact path={ROUTES.ACCOUNT} component={AccountPage}/>
            <Route exact path={ROUTES.ADMIN} component={AdminPage}/>
            <Route exact path={ROUTES.EDITOR} component={EditorPage}/>
            <Route exact path={ROUTES.LEGAL} component={LegalPage}/>
          </Content>
          {/* <Footer /> */}
          {/* {renderToaster()} */}
        </BodyWrapper>
      </RootWrapper>
    </Router>
);

const connectedPage = compose(
    withAuthentication,
)(App);

export {connectedPage as App};
