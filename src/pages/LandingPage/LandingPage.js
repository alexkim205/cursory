import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import withDashboard from '../../components/Layout/withDashboard';

class LandingPage extends React.Component {
  static propTypes = {

  };

  render() {
    // const {save, discard} = this.props;

    return (
        <React.Fragment>
          <h1>Landing Page</h1>
        </React.Fragment>
    );
  }
}

const connectedPage = compose(
)(LandingPage);

export {connectedPage as LandingPage};
