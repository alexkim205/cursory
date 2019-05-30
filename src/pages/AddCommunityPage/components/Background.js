import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {PageClass, PageComponent, PageInterface} from './Page';
import {ContainerClass} from './Container';

export const BackgroundWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  width:100%;
  height: 100%;
`;

export class BackgroundClass {
  constructor(
      type = componentTypes.BACKGROUND,
      backgroundColor = '#FFFFFF',
      page = new PageClass(),
  ) {
    this.type = type;
    this.backgroundColor = backgroundColor;
    this.page = page;
  }
}

export class BackgroundComponent extends React.Component {

  static propTypes = {
    background: PropTypes.oneOfType(
        PropTypes.instanceOf(BackgroundClass),
        PropTypes.object
    ),
    move: PropTypes.func
  };

  render() {
    console.log(this.props.background);
    const {page, type, ...backgroundProps} = this.props.background;

    return (
        <BackgroundWrapper {...backgroundProps}>
          <PageComponent page={page} move={this.props.move}/>
        </BackgroundWrapper>
    );
  }
}

