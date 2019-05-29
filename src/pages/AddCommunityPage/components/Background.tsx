import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {PageComponent, PageInterface} from './Page';

interface BackgroundWrapperProps {
  backgroundColor?: string;

}

export interface BackgroundInterface extends BackgroundWrapperProps{
  type: string;
  page: PageInterface;
}

export const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  width:100%;
  height: 100%;
`;

export class BackgroundComponent extends React.Component<BackgroundInterface> {

  static defaultProps: BackgroundInterface = {
    type: componentTypes.BACKGROUND,
    backgroundColor: '#FFFFFF',
    page: {
      type: componentTypes.PAGE,
    }
  };

  render() {
    const {page, type, ...backgroundProps} = this.props;

    return (
        <BackgroundWrapper {...backgroundProps}>
          <PageComponent {...page}/>
        </BackgroundWrapper>
    );
  }
}

