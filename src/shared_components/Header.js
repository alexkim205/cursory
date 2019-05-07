import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

// import PropTypes from 'prop-types';

class Header extends Component {

  static propTypes = {};

  render() {

    return (
        <React.Fragment>
          <nav>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/test'>Test</NavLink>
            <NavLink to='/editor'>Editor</NavLink>
          </nav>
        </React.Fragment>
    );
  }

}

export {Header};
