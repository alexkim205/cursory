import React, {Component} from 'react';
import {Navbar, NavbarItem} from './Navigation.style';

// Routing
import * as ROUTES from '../../_constants/routes';

import {SignOutButton} from '../';

class Header extends Component {

  render() {

    return (
        <React.Fragment>
          <Navbar>
            <NavbarItem to={ROUTES.HOME}>Home</NavbarItem>
            <div className={'flex-grow'}></div>
            <NavbarItem to={ROUTES.SIGN_IN}>Sign In</NavbarItem>
          </Navbar>
        </React.Fragment>
    );
  }

}

export {Header as NavigationNonAuth};
