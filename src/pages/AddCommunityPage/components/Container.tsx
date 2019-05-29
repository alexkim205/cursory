import React from 'react';
import styled from 'styled-components';

import {ContainerItemInterface, ContainerItemComponent} from './ContainerItem';
import {GenericComponentInterface} from './GenericComponent';
import {componentTypes} from '../constants/component-types';

interface ContainerWrapperProps {
  backgroundColor?: string;
  direction?: 'columns' | 'rows' | 'default';
  alignment?: 'center' | 'left' | 'right' | 'auto';
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface ContainerInterface extends ContainerWrapperProps {
  type: string;
  name: string;
  childComponents?: GenericComponentInterface[];
}

const ContainerWrapper = styled.div<ContainerWrapperProps>`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  ${props => {
  switch (props.direction) {
    case 'columns':
      return 'flex-direction: column;';
    case 'rows':
      return 'flex-direction: row;';
    case 'default':
      return 'flex-direction: auto;';
  }
}}
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
    case 'auto':
      return 'align-items: auto;';
  }
}}
  
  width: ${props => (props.width ? props.width : 12) / 12 * 100}%;
  padding: ${props => (props.padding ? props.padding : 12) / 12 * 100}%;
`;

export class ContainerComponent extends React.Component<ContainerInterface> {

  static defaultProps = {
    type: componentTypes.CONTAINER,
    name: '',
    backgroundColor: '#FFFFFF',
    direction: 'default',
    alignment: 'center',
    width: 12,
    padding: 3,
    childComponents: [
      {
        alignment: 'center',
        width: 6,
        padding: 1,
      }, {
        alignment: 'center',
        width: 6,
        padding: 1,
      }],
  };

  render() {
    const {childComponents, name, ...otherProps} = this.props;

    return (
        <ContainerWrapper {...otherProps}>
          {name}
          {childComponents && childComponents.map((elementProps, key) => {

            return (
                <ContainerItemComponent {...elementProps} key={key}/>
            );
          })}
        </ContainerWrapper>
    );
  }
}

