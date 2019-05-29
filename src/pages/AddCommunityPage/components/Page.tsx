import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {GenericComponent, GenericComponentInterface} from './GenericComponent';

interface PageWrapperProps {
  backgroundColor?: string;
  alignment?: 'center' | 'left' | 'right';
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface PageInterface extends PageWrapperProps {
  type?: string;
  childComponents?: GenericComponentInterface[];
}

const PageWrapper = styled.div<PageWrapperProps>`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  flex-direction: column;
  
  // TODO: Implement style later
  
  ${props => {
  switch (props.alignment) {
    case 'center':
      return 'align-items: center;';
    case 'left':
      return 'align-items: flex-start;';
    case 'right':
      return 'align-items: flex-end;';
  }
}}
  
  width: ${props => (props.width ? props.width : 12) / 12 * 100}%;
  padding: ${props => (props.padding ? props.padding : 12) / 12 * 100}%;
`;

export class PageComponent extends React.Component<PageInterface> {

  static defaultProps: PageInterface = {
    type: componentTypes.PAGE,
    backgroundColor: '#FFFFFF',
    // style: 'full',
    alignment: 'center',
    width: 12,
    padding: 3,
    childComponents: [],
  };

  render() {
    const {childComponents, type, ...otherProps} = this.props;

    return (
        <PageWrapper {...otherProps}>
          {childComponents && childComponents.map((elementProps, key) => {

            return (
                <GenericComponent {...elementProps} key={key}/>
            );
          })}
        </PageWrapper>
    );
  }
}

