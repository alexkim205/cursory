import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

class FavoritesPage extends React.Component {
  static propTypes = {
    // aProp: PropTypes.object.isRequired,
  };
  state = {};

  render() {
    return (
      <React.Fragment>
        <h1>Favorites</h1>
      </React.Fragment>
    );
  }
}

const connectedComponent = compose()(FavoritesPage);

export { connectedComponent as FavoritesPage };
