import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {PageClass, PageComponent, PageInterface} from './Page';
import {Positions, positionStyle} from '../constants/style-enums';

export const BackgroundWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width:100%;
  height: 100%;
  
  // Position of Page
  ${props => positionStyle(props.position)}
`;

export class BackgroundClass {
  constructor(options = {}) {
    Object.assign(this, {
      backgroundColor: '#FFFFFF',
      type: componentTypes.BACKGROUND,
      page: new PageClass(),
    }, options);
  }
}

export class BackgroundComponent extends React.Component {

  state = {style: {position: Positions.Center}}; // position is a state bc can be controlled by page component (child)

  static propTypes = {
    background: PropTypes.oneOfType(
        PropTypes.instanceOf(BackgroundClass),
        PropTypes.object,
    ),
    move: PropTypes.func,
    updateState: PropTypes.func,
  };

  changeBackgroundStyle = (style) => {
    this.setState({style});
  };

  render() {
    const {page, type, ...backgroundProps} = this.props.background;

    return (
        <BackgroundWrapper {...backgroundProps} {...this.state.style}>
          <PageComponent page={page} move={this.props.move}
                         updateState={this.props.updateState}
                         updateBgStyle={this.changeBackgroundStyle}
          />
        </BackgroundWrapper>
    );
  }
}

