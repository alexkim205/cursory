import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {ContainerComponent} from './Container';
import {withDraggable} from '../draggable-droppable';
import {
  Alignments,
  Directions, Margins,
  Paddings,
  Widths,
} from '../constants/style-enums';

interface GenericComponentWrapperProps {
  backgroundColor?: string;
  direction?: Directions;
  alignment?: Alignments;
  width?: Widths;
  paddingVertical?: Paddings;
  paddingHorizontal?: Paddings;
  marginTop?: Margins;
  marginBottom?: Margins;
}

export interface GenericComponentInterface extends GenericComponentWrapperProps {
  id?: string; // keeps track of place in nested object
  name: string;
  type: string;
  childComponents?: GenericComponentInterface[];
}

const GenericComponentWrapper = styled.div<GenericComponentWrapperProps>`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  ${props => {
  switch (props.direction) {
    case Directions.Columns:
      return 'flex-direction: column;';
    case Directions.Rows:
      return 'flex-direction: row;';
    case Directions.Default:
      return 'flex-direction: auto;';
  }
}}
  flex-direction: column;
  
  // TODO: Implement style later
  
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

class GenericComponent extends React.Component<GenericComponentInterface> {

  static defaultProps: GenericComponentInterface = {
    id: 'bg_page_0',
    name: '',
    type: componentTypes.GENERIC,
    backgroundColor: '#FFFFFF',
    direction: Directions.Rows,
    alignment: Alignments.Center,
    width: 100,
    childComponents: [],
  };

  render() {
    const {id, childComponents, type, name, ...otherProps} = this.props;

    if (type === componentTypes.CONTAINER) {
      return (
          <ContainerComponent type={type} name={name} id={id}
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

const connectedComponent = withDraggable(GenericComponent);

export {connectedComponent as GenericComponent};
