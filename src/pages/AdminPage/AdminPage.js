import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { Log } from "../../_helpers";

import {
  withAuthorization,
  withEmailVerification,
  isAdmin
} from "../../components/Session";
import { withFirebase } from "../../components/Firebase";

import { ROUTES, ROLES } from "../../_constants";

class AdminPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired
  };

  state = {
    loading: false,
    users: []
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase
      .users()
      .get()
      .then(querySnapshot => {
        Log.info(querySnapshot.docs, "AdminPage");
        const usersList = querySnapshot.docs.map((doc, i) => ({
          ...doc.data(),
          uid: i
        }));
        Log.info(usersList, "AdminPage");
        this.setState({
          users: usersList,
          loading: false
        });
      });
  }

  render() {
    const { loading, users } = this.state;

    return (
      <React.Fragment>
        <h1>Admin Page</h1>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </React.Fragment>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
      </li>
    ))}
  </ul>
);

const connectedPage = compose(
  withEmailVerification,
  withAuthorization(isAdmin),
  // withNavbar(),
  withFirebase
)(AdminPage);

export { connectedPage as AdminPage };
