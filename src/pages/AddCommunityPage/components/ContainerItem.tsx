import React from 'react';
import styled from 'styled-components';

import {GenericComponentInterface, GenericComponent} from './GenericComponent';
import {componentTypes} from './component-types';

interface ContainerItemWrapperProps {
  alignment?: 'center' | 'left' | 'right' | 'auto';
  width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const ContainerItemWrapper = styled.div<ContainerItemWrapperProps>`

  display: flex;
  
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
  
  width: ${props => props.width / 12 * 100}%;
`;

/*
 * Container column where elements can be dropped into.
 */
export interface ContainerItemInterface {
  type: string;
  name: string;
  alignment?: 'center' | 'left' | 'right' | 'auto';
  width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  // padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  childComponents?: GenericComponentInterface[];
}

export class ContainerItemComponent extends React.Component<ContainerItemInterface> {

  static defaultProps = {
    type: componentTypes.CONTAINER_ITEM,
    name: '',
    alignment: 'center',
    width: 6,
    childComponents: null,
  };

  render() {
    const {childComponents, name, type, ...otherProps} = this.props;

    return (
        <ContainerItemWrapper {...otherProps}>
          {name}
          {childComponents && childComponents.map((elementProps, key) => {

            return (
                <GenericComponent {...elementProps} key={key}/>
            );
          })}
        </ContainerItemWrapper>
    );
  }

}
