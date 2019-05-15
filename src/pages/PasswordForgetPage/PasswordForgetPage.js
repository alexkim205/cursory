import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Link} from 'react-router-dom';
import {withFirebase} from '../../components/Firebase';

import {ROUTES} from '../../_constants';

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetBase extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {passwordOne} = this.state;

    this.props.firebase.doPasswordUpdate(passwordOne).then(() => {
      this.setState({...INITIAL_STATE});
    }).catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {email, error} = this.state;
    return email.length === 0;
  };

  render() {
    const {email, error} = this.state;

    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>

            {error && <p>{error.message}</p>}
          </form>
        </React.Fragment>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetBase);

const PasswordForgetLink = () => (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
);

const PasswordForgetPage = () => (
    <React.Fragment>
      <h1>Password Forget Page</h1>
      <PasswordForgetForm/>
    </React.Fragment>
);

export {PasswordForgetPage, PasswordForgetForm, PasswordForgetLink};
