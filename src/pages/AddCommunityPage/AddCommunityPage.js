import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import withAuthorization from "../../components/Session/withAuthorization";
import { isUser } from "../../components/Session";
import { withFirebase } from "../../components/Firebase";
import { ROUTES } from "../../_constants";
import { FullWrapper } from "../../components";

import { BuilderLayout } from "./BuilderLayout";
import {FloatingWidget} from './components/FloatingWidget';

const INITIAL_STATE = {
  name: "",
  description: "",
  code: "<React.Fragment></React.Fragment>",
  error: null,
};

class AddCommunityPage extends React.Component {
  static propTypes = {
    firebase: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = { ...INITIAL_STATE };

  render() {
    const { name, description, code } = this.state;

    return (
      <FullWrapper>
        <BuilderLayout />
        <FloatingWidget/>
      </FullWrapper>
    );
  }
}

const connectedPage = compose(
  // withAuthorization(isUser),
  withRouter,
  withFirebase,
)(AddCommunityPage);

export { connectedPage as AddCommunityPage };
