import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

class TrendingPage extends React.Component {
  static propTypes = {
    // aProp: PropTypes.object.isRequired,
  };
  state = {};

  render() {
    return (
      <React.Fragment>
        <h1>Trending</h1>
      </React.Fragment>
    );
  }
}

const connectedComponent = compose()(TrendingPage);

export { connectedComponent as TrendingPage };
