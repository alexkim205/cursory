import React, {Component} from 'react';
import jdenticon from 'jdenticon';
import PropTypes from 'prop-types';

import {ProfileBarWrapper} from './styles/ProfileBar.style';
import {ROUTES} from '../../_constants';
import {DropdownMenu} from '../Dropdown';
import {NavbarItem} from './Navigation.style';
import {SignOutButton} from '../SignOutButton';

jdenticon.config = {
  // lightness: {color: [0.9,1.0]},
  // backColor: "#1E90FF"
};

const profileBarItems = [
  <NavbarItem to={ROUTES.ACCOUNT}>
    Profile
  </NavbarItem>,
  'Settings',
  'Badges',
  <SignOutButton/>
]

class ProfileBar extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  state = {dropdownIsActive: false};
  handleHover = (e) => this.setState({dropdownIsActive: true});
  handleUnhover = (e) => this.setState({dropdownIsActive: false});

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const context = this.canvasRef.current.getContext('2d');
    jdenticon.drawIcon(context, this.props.username, 25);
  };

  render() {
    const {dropdownIsActive} = this.state;

    return (
        <ProfileBarWrapper onMouseEnter={this.handleHover}
                           onMouseLeave={this.handleUnhover}>
          <canvas ref={this.canvasRef} width={25} height={25}/>
          <DropdownMenu
              items={profileBarItems}
              isActive={dropdownIsActive}/>

        </ProfileBarWrapper>
    );
  }

}

ProfileBar.propTypes = {};

export {ProfileBar};
