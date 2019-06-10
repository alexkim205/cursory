import React from "react";
import PropTypes from "prop-types";

import { AuthUserContext, isAdmin, isUser } from "../Session/index";

// Components
import {
  Navbar,
  NavbarItem,
  OutlinedNavbarItem,
} from "./styles/Navigation.style";
import { ProfileBar } from "./ProfileBar";
import { ROUTES } from "../../_constants/index";
import { SignOutButton } from "../SignOutButton";
import { DropdownMenu } from "./Dropdown";
import { ProfileBarWrapper } from "./styles/ProfileBar.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => {
      if (isAdmin(authUser)) {
        return <NavigationAdmin />;
      } else if (isUser(authUser)) {
        return <NavigationAuth authUser={authUser} />;
      } else {
        return <NavigationNonAuth />;
      }
    }}
  </AuthUserContext.Consumer>
);

export { Navigation };

class NavigationAuth extends React.Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  };

  render() {
    const { authUser } = this.props;
    return (
      <Navbar>
        {/*<NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>*/}
        <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
        <div className={"flex-grow"} />
        {/*<OutlinedNavbarItem to={'/hello'}>*/}
        {/*Community*/}
        {/*</OutlinedNavbarItem>*/}
        <OutlinedNavbarItem to={"/create"} solid={1}>
          <div className={"icon"}>
            <FontAwesomeIcon icon={["fal", "plus-hexagon"]} size={"2x"} />
          </div>
          <div className={"main"}>Create a Community</div>
        </OutlinedNavbarItem>
        <div className={"flex-grow"} />
        <ProfileBar username={authUser.username} />
        {/*<NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>*/}
      </Navbar>
    );
  }
}

const NavigationNonAuth = () => (
  <Navbar>
    <NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>
    {/*<NavbarItem to={ROUTES.HOME}>Home</NavbarItem>*/}
    <div className={"flex-grow"} />
    <NavbarItem to={ROUTES.SIGN_IN}>Sign In</NavbarItem>
  </Navbar>
);

const NavigationAdmin = () => (
  <Navbar>
    {/*<NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>*/}
    <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
    <div className={"flex-grow"} />
    <NavbarItem to={ROUTES.ACCOUNT}>Account</NavbarItem>
    <NavbarItem to={ROUTES.ADMIN}>Admin</NavbarItem>
    {/*<NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>*/}
    <SignOutButton />
  </Navbar>
);
