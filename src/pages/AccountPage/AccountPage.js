import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {PasswordChangeForm} from '../PasswordChangeForm';
import {PasswordForgetForm} from '../PasswordForgetPage';
import {AuthUserContext, withAuthorization} from '../../components/Session';
import withAuthentication from '../../components/Session/withAuthentication';

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

const condition = authUser => !!authUser;

const connectedPage = compose(
    withAuthorization(condition),
    connect(null, null),
)(AccountPage);

export {connectedPage as AccountPage};
