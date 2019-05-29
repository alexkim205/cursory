import React from 'react';
import {compose} from 'redux';
import styled from 'styled-components';

import {ContainerItemInterface, ContainerItemComponent} from './ContainerItem';
import {GenericComponentInterface} from './GenericComponent';
import {componentTypes} from '../constants/component-types';
import {
  Alignments,
  Directions,
  Paddings,
  Widths,
  Margins,
} from '../constants/style-enums';
import {Droppable} from 'react-beautiful-dnd';
import {DroppableArea} from './ContentBuildComponent';

interface ContainerWrapperProps {
  backgroundColor?: string;
  direction?: Directions;
  alignment?: Alignments;
  width?: Widths;
  paddingVertical?: Paddings;
  paddingHorizontal?: Paddings;
  marginTop?: Margins;
  marginBottom?: Margins;
}

export interface ContainerInterface extends ContainerWrapperProps {
  id: string; // keeps track of place in nested object
  type: string;
  name: string;
  childComponents?: GenericComponentInterface[];
}

const ContainerWrapper = styled.div<ContainerWrapperProps>`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  background-color: red;
  min-height: 200px;
  
  ${props => {
  switch (props.direction) {
    case Directions.Columns:
      return 'flex-direction: row;';
    case Directions.Rows:
      return 'flex-direction: column;';
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

export class ContainerComponent extends React.Component<ContainerInterface> {

  static defaultProps = {
    id: 'bg_page_0',
    type: componentTypes.CONTAINER,
    name: '',
    backgroundColor: '#FFFFFF',
    direction: Directions.Columns,
    alignment: Alignments.Center,
    width: (100 as Widths),
    paddingVertical: (10 as Paddings),
    paddingHorizontal: (10 as Paddings),
    marginTop: (20 as Margins),
    marginBottom: (20 as Margins),
    childComponents: [
      {
        name: 'Column 1',
        type: componentTypes.CONTAINER_ITEM,
        alignment: Alignments.Center,
      }, {
        name: 'Column 2',
        type: componentTypes.CONTAINER_ITEM,
        alignment: Alignments.Center,
      }],
  };

  render() {
    const {id, childComponents, name, ...otherProps} = this.props;

    return (
        <Droppable droppableId={id}>
          {provided => (
              <DroppableArea ref={provided.innerRef}
                             {...provided.droppableProps}
                             {...otherProps}
              >
                <ContainerWrapper {...otherProps}>
                  {childComponents &&
                  childComponents.map((elementProps, key) => {

                    return (
                        <ContainerItemComponent {...elementProps}
                                                key={key}
                                                id={id}
                                                index={key}/>
                    );
                  })}
                </ContainerWrapper>
                {provided.placeholder}
              </DroppableArea>
          )}
        </Droppable>
    );
  }
}

// const connectedComponent = compose(
//     withDraggable,
// )(ContainerComponent);
//
// export {connectedComponent as ContainerComponent};
