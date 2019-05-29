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

const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  background-color: ${props => props.backgroundColor};
`;

export class BackgroundComponent extends React.Component<BackgroundInterface> {

  static defaultProps: BackgroundInterface = {
    type: componentTypes.BACKGROUND,
    backgroundColor: '#FFFFFF',
    page: {
      type: componentTypes.PAGE,
      width: 12,
      padding: 3,
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

