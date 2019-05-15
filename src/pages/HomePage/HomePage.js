import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {isUser, withAuthorization} from '../../components/Session';

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
    withAuthorization(isUser),
    connect(null, null),
)(HomePage);

export {connectedPage as HomePage};
