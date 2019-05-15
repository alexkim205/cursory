import React from 'react';
import {AuthUserContext, isAdmin, isUser} from '../Session';

// Components
import {Navbar, NavbarItem} from './Navigation.style';
import {ROUTES} from '../../_constants';
import {SignOutButton} from '../SignOutButton';

const Navigation = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser => {
          if (isAdmin(authUser)) {
            return <NavigationAdmin/>;
          } else if (isUser(authUser)) {
            return <NavigationAuth/>;
          } else {
            return <NavigationNonAuth/>;
          }
        }}
      </AuthUserContext.Consumer>
    </div>
);

export {Navigation};

const NavigationAuth = () => (
    <Navbar>
      <NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>
      <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
      <div className={'flex-grow'}></div>
      <NavbarItem to={ROUTES.ACCOUNT}>Account</NavbarItem>
      <NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>
      <SignOutButton/>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar>
      <NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>
      <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
      <div className={'flex-grow'}></div>
      <NavbarItem to={ROUTES.SIGN_IN}>Sign In</NavbarItem>
    </Navbar>
);

const NavigationAdmin = () => (
    <Navbar>
      <NavbarItem to={ROUTES.LANDING}>Landing</NavbarItem>
      <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
      <div className={'flex-grow'}></div>
      <NavbarItem to={ROUTES.ACCOUNT}>Account</NavbarItem>
      <NavbarItem to={ROUTES.ADMIN}>Admin</NavbarItem>
      <NavbarItem to={ROUTES.EDITOR}>Editor</NavbarItem>
      <SignOutButton/>
    </Navbar>
);
