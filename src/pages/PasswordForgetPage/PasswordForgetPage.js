import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';

import {
  FormWrapper,
  PasswordForgetForm,
  SignUpForm,
} from '../../components/Forms';

import {ROUTES} from '../../_constants';
import {SignInLink} from '../SignInPage';
import {NarrowWrapper} from '../../components';

const PasswordForgetLink = () => (
    <React.Fragment>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </React.Fragment>
);

class PasswordForgetPage extends React.Component {
  state = {error: null};
  setError = (error) => {
    this.setState({error});
  };

  render() {
    return (
        <NarrowWrapper>
          <h2>Reset Password</h2>
          <FormWrapper>
            {this.state.error &&
            <div className={'error'}>
              {this.state.error.message}
            </div>
            }
            <PasswordForgetForm setError={this.setError}/>
          </FormWrapper>
          <div className={'form-links'}>
            <SignInLink/>
            <div className={'divider'}/>
            <PasswordForgetLink/>
          </div>
        </NarrowWrapper>
    );
  }
}

const connectedPage = compose(
    // withNavbar(),
)(PasswordForgetPage);

export {connectedPage as PasswordForgetPage, PasswordForgetLink};
