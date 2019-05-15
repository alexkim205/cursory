import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../../components/Firebase';

import * as ROUTES from '../../_constants/routes';
import {PasswordForgetLink} from '../PasswordForgetPage';
import {SignUpLink} from '../SignUpPage';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {email, password} = this.state;

    this.props.firebase.doSignInWithEmailAndPassword(email, password).then(() => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {email, password} = this.state;
    return password.length === 0 ||
        email.length === 0;
  };

  render() {
    const {email, password, error} = this.state;

    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <h1>Sign Up Page</h1>
          <form onSubmit={this.onSubmit}>
            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="password"
                value={password}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
              Sign In
            </button>

            {error && <p>{error.message}</p>}
          </form>
          <PasswordForgetLink/>
          <SignUpLink/>
        </React.Fragment>
    );
  }
}

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
)(SignInPage);

export {connectedPage as SignInPage};
