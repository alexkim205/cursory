import React from 'react';
import PropTypes from 'prop-types';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {AuthUserContext, isAdmin, isUser} from '../Session/index';

// Components
import {Navbar, NavbarItem} from './Navigation.style';
import {ProfileBar} from './ProfileBar';
import {ROUTES} from '../../_constants/index';
import {SignOutButton} from '../SignOutButton';
import {DropdownMenu} from '../Dropdown';

const Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser => {
        if (isAdmin(authUser)) {
          return <NavigationAdmin/>;
        } else if (isUser(authUser)) {
          return <NavigationAuth authUser={authUser}/>;
        } else {
          return <NavigationNonAuth/>;
        }
      }}
    </AuthUserContext.Consumer>
);

export {Navigation};

class NavigationAuth extends React.Component {
  static propTypes = {
    authUser: PropTypes.object.isRequired,
  };

  render() {
    const {authUser} = this.props;
    return (
        <Navbar>
          {/*<NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>*/}
          <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
          <div className={'flex-grow'}/>
          Community
          <div className={'flex-grow'}/>
          <ProfileBar username={authUser.username}/>
          {/*<NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>*/}
          <SignOutButton/>
        </Navbar>
    );
  }
}

const NavigationNonAuth = () => (
    <Navbar>
      <NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>
      {/*<NavbarItem to={ROUTES.HOME}>Home</NavbarItem>*/}
      <div className={'flex-grow'}/>
      <NavbarItem to={ROUTES.SIGN_IN}>Sign In</NavbarItem>
    </Navbar>
);

const NavigationAdmin = () => (
    <Navbar>
      {/*<NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>*/}
      <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
      <div className={'flex-grow'}/>
      <NavbarItem to={ROUTES.ACCOUNT}>Account</NavbarItem>
      <NavbarItem to={ROUTES.ADMIN}>Admin</NavbarItem>
      {/*<NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>*/}
      <SignOutButton/>
    </Navbar>
);
