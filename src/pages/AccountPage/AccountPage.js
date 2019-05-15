import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {PasswordChangeForm} from '../PasswordChangeForm';
import {PasswordForgetForm} from '../PasswordForgetPage';
import {
  AuthUserContext,
  isUser,
  withAuthorization,
} from '../../components/Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
      {authUser =>
          <React.Fragment>
            <h1>Account: {authUser.email}</h1>
            <PasswordForgetForm/>
            <PasswordChangeForm/>
          </React.Fragment>
      }
    </AuthUserContext.Consumer>
);

const connectedPage = compose(
    withAuthorization(isUser),
    connect(null, null),
)(AccountPage);

export {connectedPage as AccountPage};
