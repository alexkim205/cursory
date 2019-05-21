import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  ToolbarWrapper,
  ToolbarItemWrapper,
} from './styles';

const toolbarIcons = [
  {icon: 'star'}, // Starred
  {icon: 'tags'}, // Tags
  {icon: 'hourglass-start'}, // Recent
  {icon: 'fire'}, // Popular
  {icon: 'user-friends'}, // People
];

class Toolbar extends React.Component {
  // componentDidMount() {
  //   this.setState({isOpen: true});
  // }

  static propTypes = {
    whichActive: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired,
  };
  //
  // state = {
  //   isOpen: false,
  // };

  render() {

    // Nested Tabs for sidebar
    return (
        <ToolbarWrapper
            // pose={this.state.isOpen ? 'open' : 'closed'}
        >
          {toolbarIcons.map((e, i) => (
              <ToolbarItem
                  key={i}
                  icon={e.icon}
                  active={this.props.whichActive === i}
                  handleClick={(e) => this.props.handleClick(e, i)}
              />
          ))}
        </ToolbarWrapper>
    );
  }
}

class ToolbarItem extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
  };

  static defaultProps = {
    active: false,
  };

  render() {
    return (
        <ToolbarItemWrapper
            onClick={this.props.handleClick}
            pose={this.props.active ? 'active' : 'inactive'}
            i={this.props.key}
        >
          <FontAwesomeIcon icon={['fas', this.props.icon]}/>
        </ToolbarItemWrapper>
    );
  }
}

const connectedComponent = compose(
)(Toolbar);

export {connectedComponent as Toolbar};
