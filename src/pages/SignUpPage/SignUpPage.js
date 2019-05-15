import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../../components/Firebase';

import * as ROUTES from '../../_constants/routes';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {username, email, passwordOne} = this.state;

    this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne).then(authUser => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {username, email, passwordOne, passwordTwo, error} = this.state;
    return passwordOne !== passwordTwo ||
        passwordOne.length === 0 ||
        email.length === 0 ||
        username.length === 0;
  };

  render() {
    const {username, email, passwordOne, passwordTwo, error} = this.state;

    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <h1>Sign In Page</h1>
          <form onSubmit={this.onSubmit}>
            <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button type="submit" disabled={isInvalid}>Sign Up</button>

            {error && <p>{error.message}</p>}
          </form>
          <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </p>
        </React.Fragment>
    );
  }
}

const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
)

// function mapStateToProps(state) => {

// }

// const mapDispatchToProps = {
//   save: (entry_id) => editorActions.save(entry_id),
//   discard: (entry_id) => editorActions.discard(entry_id),
// };

const connectedPage = compose(
    withRouter,
    withFirebase,
    connect(null, null),
)(SignUpPage);

export {connectedPage as SignUpPage, SignUpLink};
