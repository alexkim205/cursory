import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {withDashboard} from '../../components/Layout'

import {
  isUser,
  withAuthorization,
  withEmailVerification,
} from '../../components/Session';

class HomePage extends React.Component {
  static propTypes = {};

  render() {
    return (
        <React.Fragment>
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in user.</p>
        </React.Fragment>
    );
  }
}

const connectedPage = compose(
    withEmailVerification,
    withAuthorization(isUser),
    withDashboard,
)(HomePage);

export {connectedPage as HomePage};
