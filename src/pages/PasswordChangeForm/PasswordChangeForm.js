import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {Link} from 'react-router-dom';
import {withFirebase} from '../../components/Firebase';

import {ROUTES} from '../../_constants';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {email} = this.state;

    this.props.firebase.doPasswordReset(email).then(() => {
      this.setState({...INITIAL_STATE});
    }).catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {passwordOne, passwordTwo, error} = this.state;
    return passwordOne !== passwordTwo || passwordOne === '';
  };

  render() {
    const {passwordOne, passwordTwo, error} = this.state;

    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <form onSubmit={this.onSubmit}>
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="New Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm New Password"
            />
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>

            {error && <p>{error.message}</p>}
          </form>
          <p>
            <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
          </p>
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

const connectedComponent = compose(
    withFirebase,
    connect(null, null),
)(PasswordChangeForm);

export {connectedComponent as PasswordChangeForm};
