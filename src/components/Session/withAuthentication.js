import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
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
      authUser: JSON.parse(localStorage.getItem('authUser')),
    };

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            if (authUser) {
              Log.success('Authenticated!', 'withAuthentication');
              localStorage.setItem('authUser', JSON.stringify(authUser));
              this.setState({authUser});
            }
          },
          () => {
            Log.warn('Not authenticated!', 'withAuthentication');
            localStorage.removeItem('authUser');
            this.setState({ authUser: null });
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

  return compose(
      withFirebase,
  )(WithAuthentication);
};

export default withAuthentication;
