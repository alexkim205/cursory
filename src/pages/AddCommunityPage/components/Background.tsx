import React from 'react';
import styled from 'styled-components';

import {componentTypes} from './component-types';
import {PageComponent, PageInterface} from './Page';

interface BackgroundWrapperProps {
  backgroundColor?: string;
}

const BackgroundWrapper = styled.div<BackgroundWrapperProps>`
  background-color: ${props => props.color};
`;

export interface BackgroundInterface {
  type: string;
  backgroundColor?: string;
  page: PageInterface;
}

export class BackgroundComponent extends React.Component<BackgroundInterface> {

  static defaultProps = {
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

