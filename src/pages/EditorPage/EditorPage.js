import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";

import { editorActions } from "../../_actions/index";
import { CustomEditor } from "../../components/Editor/index";

import {
  isUser,
  withAuthorization,
  withEmailVerification
} from "../../components/Session";

class EditorPage extends React.Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    discard: PropTypes.func.isRequired
  };

  state = {
    text: ""
  };

  handleChange = text => {
    this.setState({ text });
  };

  render() {
    // const {save, discard} = this.props;

    return (
      <React.Fragment>
        <CustomEditor />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  save: entry_id => editorActions.save(entry_id),
  discard: entry_id => editorActions.discard(entry_id)
};

const connectedPage = compose(
  withEmailVerification,
  withAuthorization(isUser),
  connect(
    null,
    mapDispatchToProps
  )
)(EditorPage);

export { connectedPage as EditorPage };
