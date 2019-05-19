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
    connect(null, null),
)(AccountPage);

export {connectedPage as AccountPage};
