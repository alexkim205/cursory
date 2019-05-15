import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {withAuthorization} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';

class HomePage extends React.Component {
  static propTypes = {};

  render() {
    // const {save, discard} = this.props;

    return (
        <React.Fragment>
          <h1>Home Page</h1>
          <p>The Home Page is accessible by every signed in user.</p>
        </React.Fragment>
    );
  }
}

const condition = authUser => !!authUser;

const connectedPage = compose(
    withAuthorization(condition),
    connect(null, null),
)(HomePage);

export {connectedPage as HomePage};
