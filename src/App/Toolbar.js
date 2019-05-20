import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { compose } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToolbarWrapper, ToolbarItemWrapper } from "./styles";

import { ROUTES } from "../_constants/routes";

const toolbarIcons = [
  { to: ROUTES.FAVORITES, icon: "star" }, // Starred
  { to: ROUTES.TAGS, icon: "tags" }, // Tags
  { to: ROUTES.RECENT, icon: "hourglass-start" }, // Recent
  { to: ROUTES.TRENDING, icon: "fire" }, // Popular
  { to: ROUTES.PEOPLE, icon: "user-friends" } // People
];

class Toolbar extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };
  state = {};
  render() {
    const { path } = this.props.match;
    // Nested Tabs for sidebar
    return (
      <React.Fragment>
        <ToolbarWrapper onClick={this.onClick}>
          {toolbarIcons.map(({ to, icon }, i) => (
            <ToolbarItemWrapper key={i} to={to}>
              <FontAwesomeIcon key={i} icon={["fas", icon]} />
            </ToolbarItemWrapper>
          ))}
        </ToolbarWrapper>
      </React.Fragment>
    );
  }
}

class ToolbarItem extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  };
  state = { isActive: false };
  render() {
    return (
      <ToolbarItemWrapper
        to={this.props.to}
        pose={this.state.isActive ? "active" : "inactive"}
      >
        <FontAwesomeIcon icon={["fas", this.props.icon]} />
      </ToolbarItemWrapper>
    );
  }
}

const connectedComponent = compose()(Toolbar);

export { connectedComponent as Toolbar, toolbarIcons };
