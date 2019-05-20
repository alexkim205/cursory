import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../_constants";

// import PropTypes from 'prop-types';

class Footer extends Component {
  static propTypes = {};

  render() {
    return (
      <React.Fragment>
        <Link to={ROUTES.LEGAL}>Legal</Link>
      </React.Fragment>
    );
  }
}

export { Footer };
