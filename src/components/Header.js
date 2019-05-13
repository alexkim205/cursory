import React, {Component} from 'react';
import {Navbar, NavbarItem} from './Header.style';

// import PropTypes from 'prop-types';

class Header extends Component {

  static propTypes = {};

  render() {

    return (
        <React.Fragment>
          <Navbar>
            <NavbarItem to='/home'>Home</NavbarItem>
            <div className={'flex-grow'}></div>
            <NavbarItem to='/test'>Test</NavbarItem>
            <NavbarItem to='/editor'>Editor</NavbarItem>
          </Navbar>
        </React.Fragment>
    );
  }

}

export {Header};
