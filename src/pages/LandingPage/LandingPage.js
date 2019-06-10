import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

class LandingPage extends React.Component {
  static propTypes = {};

  render() {
    // const {save, discard} = this.props;

    return (
      <React.Fragment>
        <h1>Landing Page</h1>
      </React.Fragment>
    );
  }
}

const connectedPage = compose()(LandingPage);
// withNavbar(),

export { connectedPage as LandingPage };
