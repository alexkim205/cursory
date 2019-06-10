import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

// HOC
import {withFirebase} from '../Firebase/index';
import {withRouter} from 'react-router-dom';

import {ROUTES} from '../../_constants/index';

// Styles
import {Form, FormFieldText, SocialButton} from './Form.style';
import {PasswordForgetLink} from '../../pages/PasswordForgetPage';

/* Sign In Form Base */

const SIGN_IN_INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {...SIGN_IN_INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {email, password} = this.state;

    this.props.firebase.doSignInWithEmailAndPassword(email, password).
        then(() => {
          this.setState({...SIGN_IN_INITIAL_STATE});
          this.props.history.push(ROUTES.HOME);
        }).
        catch(error => {
          this.props.setError(error);
        });

    event.preventDefault();
  };

  checkRules = () => {
    const {email, password} = this.state;
    return password.length === 0 || email.length === 0;
  };

  render() {
    const {email, password, error} = this.state;
    const isInvalid = this.checkRules();
    return (
        <form onSubmit={this.onSubmit}>
          <FormFieldText
              label={'Email'}
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
          />
          <FormFieldText
              label={'Password'}
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
        </form>
    );
  }
}

/* Sign Up Form Base */

const SIGN_UP_INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {...SIGN_UP_INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {username, email, passwordOne} = this.state;
    const roles = {};

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne).
        then(authUser => {
          // Create a user in Firebase cloud database
          return this.props.firebase.user(authUser.user.uid).set({
            username,
            email,
            roles,
          });
        }).
        then(() => {
          return this.props.firebase.doSendEmailVerification();
        }).
        then(() => {
          this.setState({...SIGN_UP_INITIAL_STATE});
          this.props.history.push(ROUTES.HOME);
        }).
        catch(error => {
          this.props.setError(error);
        });

    event.preventDefault();
  };

  checkRules = () => {
    const {username, email, passwordOne, passwordTwo, error} = this.state;
    return (
        passwordOne !== passwordTwo ||
        passwordOne.length === 0 ||
        email.length === 0 ||
        username.length === 0
    );
  };

  render() {
    const {username, email, passwordOne, passwordTwo, error} = this.state;

    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <FormFieldText
                label={'Full Name'}
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
            />
            <FormFieldText
                label={'Email Address'}
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <FormFieldText
                label={'Password'}
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <FormFieldText
                label={'Confirm Password'}
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button type="submit" disabled={isInvalid}>
              Sign Up
            </button>
          </form>
        </React.Fragment>
    );
  }
}

/* Password Forget Base */

const PW_FORGET_INITIAL_STATE = {
  email: '',
  isSent: false, // is reset email sent?
  error: null,
};

class PasswordForgetBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {...PW_FORGET_INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {email} = this.state;

    this.props.firebase.doPasswordReset(email).then(() => {
      this.setState({isSent: true});
      this.props.setError(null);
    }).catch(error => {
      this.props.setError(error);
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {email} = this.state;
    return email.length === 0;
  };

  render() {
    const {email, isSent, error} = this.state;
    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          {isSent ? (
              <React.Fragment>
                <p>
                  Password reset email has been sent. Please check your email
                  including your spam folder.
                </p>
                <button type="button" onClick={this.onSubmit}>
                  Resend e-mail.
                </button>
              </React.Fragment>
          ) : (
              <form onSubmit={this.onSubmit}>
                <FormFieldText
                    label={'Email Address'}
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                  Reset
                </button>
              </form>
          )}
        </React.Fragment>
    );
  }
}

/* Google Sign In Form Base */
class SignInGoogleBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  onSubmit = event => {
    this.props.firebase.doSignInWithGoogle().then(socialAuthUser => {
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.user.displayName,
        email: socialAuthUser.user.email,
        roles: {},
      });
    }).then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => this.props.setError(error));
    event.preventDefault();
  };

  render() {

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <SocialButton type="submit" color={'#4285F4'}>
              <FontAwesomeIcon icon={['fab', 'google']} size={'2x'}/>
            </SocialButton>
          </form>
        </React.Fragment>
    );
  }
}

/* Facebook Sign In Form Base */
class SignInFacebookBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {error: null};

  onSubmit = event => {
    this.props.firebase.doSignInWithFacebook().then(socialAuthUser => {
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      });
    }).then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => this.props.setError(error));
    event.preventDefault();
  };

  render() {
    const {error} = this.state;

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <SocialButton type="submit" color={'#3C5A99'}>
              <FontAwesomeIcon icon={['fab', 'facebook-f']} size={'2x'}/>
            </SocialButton>
          </form>
        </React.Fragment>
    );
  }
}

/* Twitter Sign In Form Base */
class SignInTwitterBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {error: null};

  onSubmit = event => {
    this.props.firebase.doSignInWithTwitter().then(socialAuthUser => {
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      });
    }).then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => this.props.setError(error));
    event.preventDefault();
  };

  render() {
    const {error} = this.state;

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <SocialButton type="submit" color={'#00acee'}>
              <FontAwesomeIcon icon={['fab', 'twitter']} size={'2x'}/>
            </SocialButton>
          </form>
        </React.Fragment>
    );
  }
}

/* Github Sign In Form Base */
class SignInGithubBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {error: null};

  onSubmit = event => {
    this.props.firebase.doSignInWithGithub().then(socialAuthUser => {
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      });
    }).then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => this.props.setError(error));
    event.preventDefault();
  };

  render() {
    const {error} = this.state;

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <SocialButton type="submit" color={'#333333'}>
              <FontAwesomeIcon icon={['fab', 'github']} size={'2x'}/>
            </SocialButton>
          </form>
        </React.Fragment>
    );
  }
}

/* Microsoft Sign In Form Base */
class SignInMicrosoftBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {error: null};

  onSubmit = event => {
    this.props.firebase.doSignInWithMicrosoft().then(socialAuthUser => {
      console.log(socialAuthUser);
      // Create a user in your Firebase Realtime Database too
      return this.props.firebase.user(socialAuthUser.user.uid).set({
        username: socialAuthUser.additionalUserInfo.profile.name,
        email: socialAuthUser.additionalUserInfo.profile.email,
        roles: {},
      });
    }).then(() => {
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => this.props.setError(error));
    event.preventDefault();
  };

  render() {
    const {error} = this.state;

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <SocialButton type="submit" color={'#F25022'}>
              <FontAwesomeIcon icon={['fab', 'microsoft']} size={'2x'}/>
            </SocialButton>
          </form>
        </React.Fragment>

    );
  }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

const PasswordForgetForm = compose(
    withRouter,
    withFirebase,
)(PasswordForgetBase);

const SignInGoogle = compose(
    withRouter,
    withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
    withRouter,
    withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
    withRouter,
    withFirebase,
)(SignInTwitterBase);

const SignInGithub = compose(
    withRouter,
    withFirebase,
)(SignInGithubBase);

const SignInMicrosoft = compose(
    withRouter,
    withFirebase,
)(SignInMicrosoftBase);

export {
  SignInForm,
  SignUpForm,
  PasswordForgetForm,
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  SignInGithub,
  SignInMicrosoft,
};
