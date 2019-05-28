import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {PasswordChangeForm} from '../PasswordChangeForm';
import {
  AuthUserContext,
  isUser,
  withAuthorization,
  withEmailVerification
} from '../../components/Session';
import withDashboard from '../../components/Layout/withDashboard';

const AccountPage = () => (
    <AuthUserContext.Consumer>
      {authUser =>
          <React.Fragment>
            <h1>Account: {authUser.email}</h1>
            <PasswordChangeForm/>
          </React.Fragment>
      }
    </AuthUserContext.Consumer>
);

const connectedPage = compose(
    withEmailVerification,
    withAuthorization(isUser),
)(AccountPage);

export {connectedPage as AccountPage};
