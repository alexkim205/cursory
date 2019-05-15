import React from 'react';
import PropTypes from 'prop-types';
import {Log} from '../../_helpers';

// HOC Components
import AuthUserContext from './context';
import {withFirebase} from '../Firebase';

export const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    static propTypes = {
      firebase: PropTypes.object.isRequired,
    };

    state = {
      authUser: null,
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
          authUser => {
            if (authUser) {
              Log.success('Authenticated!', 'withAuthentication');
              this.setState({authUser});
            } else {
              Log.warn('Not authenticated!', 'withAuthentication');
              this.setState({authUser: null});
            }
          },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
          <AuthUserContext.Provider value={this.state.authUser}>
            <Component {...this.props} />
          </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
