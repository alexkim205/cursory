import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {PageClass, PageComponent, PageInterface} from './Page';
import {Positions} from '../constants/style-enums';
import {BackgroundWrapper} from './styles'

export class BackgroundClass {
  constructor(options = {}) {
    Object.assign(this, {
      active: false,
      backgroundColor: '#FFFFFF',
      type: componentTypes.BACKGROUND,
      id: 'bg',
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
    updateActive: PropTypes.func,
  };

  changeBackgroundStyle = (style) => {
    this.setState({style});
  };

  render() {
    const {id, page, type, ...backgroundProps} = this.props.background;

    return (
        <BackgroundWrapper {...backgroundProps}
                           {...this.state.style}
                           onClick={(e) => this.props.updateActive(e, id)}>
          <PageComponent page={page} move={this.props.move}
                         updateActive={this.props.updateActive}
                         updateBgStyle={this.changeBackgroundStyle}
          />
        </BackgroundWrapper>
    );
  }
}

