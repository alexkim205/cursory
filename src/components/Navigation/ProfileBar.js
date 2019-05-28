import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import jdenticon from 'jdenticon';
import PropTypes from 'prop-types';
import {PoseGroup} from 'react-pose';

import {ProfileBarWrapper, Spacer} from './styles/ProfileBar.style';
import {ROUTES} from '../../_constants';
import {DropdownMenuWrapper, DropdownMenuItemWrapper} from './Dropdown';
import {NavbarItem} from './styles/Navigation.style';
import {SignOutButton} from '../SignOutButton';

jdenticon.config = {
  // lightness: {color: [0.9,1.0]},
  backColor: '#F3F4F8',
};

const profileBarItems = [
  <NavLink to={ROUTES.ACCOUNT}>
    <b>My Account</b>
  </NavLink>,
  <NavLink to={ROUTES.ACCOUNT}>
    My Communities
  </NavLink>,
  <NavLink to={ROUTES.ACCOUNT}>
    Go Pro!
  </NavLink>,
  <SignOutButton/>,
];

class ProfileBar extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  state = {dropdownIsActive: false};
  handleHover = (e) => {
    this.setState({dropdownIsActive: true});
  };
  handleUnhover = (e) => {
    this.setState({dropdownIsActive: false});
  };

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const context = this.canvasRef.current.getContext('2d');
    jdenticon.drawIcon(context, this.props.username, 30);
  };

  render() {
    const {dropdownIsActive} = this.state;

    return (
        <React.Fragment>
          <ProfileBarWrapper onMouseEnter={this.handleHover}
                             onMouseLeave={this.handleUnhover}
                             pose={dropdownIsActive ? 'hover' : 'init'}
          >
            <div className={'icon'}>
              <canvas ref={this.canvasRef} width={30} height={30}/>
            </div>
            <div className={'name'}>{this.props.username}</div>
          </ProfileBarWrapper>
          <PoseGroup>
            {dropdownIsActive &&
            <DropdownMenuWrapper
                key={'dropdown'}
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleUnhover}>
              <Spacer/>
              {profileBarItems.map((item, key) =>
                  <DropdownMenuItemWrapper
                      key={key}>{item}</DropdownMenuItemWrapper>,
              )}
            </DropdownMenuWrapper>
            }
          </PoseGroup>
        </React.Fragment>
    );
  }

}

ProfileBar.propTypes = {};

export {ProfileBar};
