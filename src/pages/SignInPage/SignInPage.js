import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {Link} from 'react-router-dom';

import {
  SignInForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGithub,
  SignInMicrosoft,
  WideWrapper,
  NarrowWrapper,
  FormWrapper,
} from '../../components';
import {PasswordForgetLink} from '../PasswordForgetPage';
import {SignUpLink} from '../SignUpPage';

import {ROUTES} from '../../_constants';

class SignInPage extends React.Component {
  state = {error: null};
  setError = (error) => {
    this.setState({error});
  };
  render() {
    return(
        <NarrowWrapper>
          <h1>Sign In</h1>
          <FormWrapper>
            {this.state.error &&
            <div className={'error'}>
              {this.state.error.message}
            </div>
            }
            <div className={'social-forms'}>
              <SignInGoogle setError={this.setError}/>
              <SignInGithub setError={this.setError}/>
              <SignInFacebook setError={this.setError}/>
              <SignInTwitter setError={this.setError}/>
              <SignInMicrosoft setError={this.setError}/>
            </div>
            <SignInForm setError={this.setError}/>
          </FormWrapper>
          <div className={'form-links'}>
            <SignUpLink/>
            <div className={'divider'}/>
            <PasswordForgetLink/>
          </div>
        </NarrowWrapper>
    )
  }
}

const SignInLink = () => (
    <React.Fragment>
      <Link to={ROUTES.SIGN_IN}>Sign In!</Link>
    </React.Fragment>
);

const connectedPage = compose()(SignInPage);

export {connectedPage as SignInPage, SignInLink};
