import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

class PeoplePage extends React.Component {
  static propTypes = {
    // aProp: PropTypes.object.isRequired,
  };
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>People</h1>
      </React.Fragment>
    );
  }
}

const connectedComponent = compose()(PeoplePage);

export { connectedComponent as PeoplePage };
