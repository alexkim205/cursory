import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';

import withAuthorization from '../../components/Session/withAuthorization';
import {isUser} from '../../components/Session';
import {withFirebase} from '../../components/Firebase';
import {ROUTES} from '../../_constants';

const INITIAL_STATE = {
  name: '',
  description: '',
  error: null,
};

class AddCommunityPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {...INITIAL_STATE};

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  onSubmit = event => {
    const {error, ...newCommunity} = this.state;

    this.props.firebase.doAddCommunity(newCommunity).then(() => {
      this.setState({...INITIAL_STATE});
      this.props.history.push(ROUTES.HOME);
    }).catch(error => {
      this.setState({error});
    });

    event.preventDefault();
  };

  checkRules = () => {
    const {name, description} = this.state;
    return name.length === 0 || description.length === 0;
  };

  render() {
    const {name, description, error} = this.state;
    const isInvalid = this.checkRules();

    return (
        <React.Fragment>
          <h1>Create a Community</h1>
          <form onSubmit={this.onSubmit}>
            <input
                name="name"
                value={name}
                onChange={this.onChange}
                type="text"
                placeholder="Name your community"
            />
            <input
                name="description"
                value={description}
                onChange={this.onChange}
                type="text"
                placeholder="Who's it for?"
            />
            <button disabled={isInvalid} type="submit">
              Create this community!
            </button>
            {error && <p>{error.message}</p>}
          </form>
        </React.Fragment>
    );
  }
}

const connectedPage = compose(
    withAuthorization(isUser),
    withRouter,
    withFirebase,
)(AddCommunityPage);

export {connectedPage as AddCommunityPage};
