import React from 'react';
import styled from 'styled-components';

import {GenericComponent, GenericComponentInterface} from './GenericComponent';
import {componentTypes} from '../constants/component-types';
import {withDraggable} from '../draggable-droppable';
import {Alignments, Margins, Paddings, Widths} from '../constants/style-enums';

/*
 * Container column where elements can be dropped into.
 */

interface ContainerItemWrapperProps {
  alignment?: Alignments;
  width?: Widths;
  paddingVertical?: Paddings;
  paddingHorizontal?: Paddings;
  marginTop?: Margins;
  marginBottom?: Margins;
}

export interface ContainerItemInterface extends ContainerItemWrapperProps {
  id?: string; // keeps track of place in nested object
  type: string;
  name: string;
  childComponents?: GenericComponentInterface[];
}

const ContainerItemWrapper = styled.div<ContainerItemWrapperProps>`

  display: flex;
  box-sizing: border-box;
  background-color: blue;
  
  ${props => {
  switch (props.alignment) {
    case Alignments.Center:
      return 'align-items: center;';
    case Alignments.Left:
      return 'align-items: flex-start;';
    case Alignments.Right:
      return 'align-items: flex-end;';
    case Alignments.Auto:
      return 'align-items: auto;';
  }
}}
  
  width: ${props => typeof props.width !== 'undefined' ? props.width : 100}%;
  
  // Padding
  padding: ${props => typeof props.paddingVertical !== 'undefined'
    ? props.paddingVertical
    : 0}px 
    ${props => typeof props.paddingHorizontal !== 'undefined'
    ? props.paddingHorizontal
    : 0}px;
    
  // Margin
  margin: ${props => typeof props.marginTop !== 'undefined'
    ? props.marginTop
    : 0}px 0 
    ${props => typeof props.marginBottom !== 'undefined'
    ? props.marginBottom
    : 0}px 0;
`;

class ContainerItemComponent extends React.Component<ContainerItemInterface> {

  static defaultProps: ContainerItemInterface = {
    id: 'bg_page_0',
    type: componentTypes.CONTAINER_ITEM,
    name: '',
    alignment: Alignments.Center,
    width: 30,
    paddingVertical: (10 as Paddings),
    paddingHorizontal: (10 as Paddings),
    marginTop: (20 as Margins),
    marginBottom: (20 as Margins),
    childComponents: [],
  };

  render() {
    const {id, childComponents, name, type, ...otherProps} = this.props;

    return (
        <ContainerItemWrapper {...otherProps}>
          {childComponents && childComponents.map((elementProps, key) => {

            return (
                <GenericComponent {...elementProps} key={key} id={id}
                                  index={key}/>
            );
          })}
        </ContainerItemWrapper>
    );
  }

}

const connectedComponent = withDraggable(ContainerItemComponent);

export {connectedComponent as ContainerItemComponent};
