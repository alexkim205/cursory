import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

class TagsPage extends React.Component {
  static propTypes = {
    // aProp: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Tags</h1>
      </React.Fragment>
    );
  }
}

const connectedComponent = compose()(TagsPage);

export { connectedComponent as TagsPage };
