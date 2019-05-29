import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {ContainerComponent} from './Container';

interface GenericComponentWrapperProps {
  backgroundColor?: string;
  direction?: 'columns' | 'rows' | 'default';
  alignment?: 'center' | 'left' | 'right' | 'auto';
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface GenericComponentInterface extends GenericComponentWrapperProps {
  name: string;
  type: string;
  childComponents?: GenericComponentInterface[];
}

const GenericComponentWrapper = styled.div<GenericComponentWrapperProps>`
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

export class GenericComponent extends React.Component<GenericComponentInterface> {

  static defaultProps: GenericComponentInterface = {
    name: '',
    type: componentTypes.GENERIC,
    backgroundColor: '#FFFFFF',
    direction: 'default',
    alignment: 'center',
    width: 12,
    padding: 1,
    childComponents: [],
  };

  render() {
    const {childComponents, type, name, ...otherProps} = this.props;

    if (type === componentTypes.CONTAINER) {
      return (
          <ContainerComponent type={type} name={name}
                              childComponents={childComponents}
                              {...otherProps}/>
      );
    }

    // Else, assume generic component with one element
    // Use switch statement when I add more element types
    return (
        <GenericComponentWrapper {...otherProps}/>
    );
  }
}

