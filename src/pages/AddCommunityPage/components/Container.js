import React from 'react';
import {compose} from 'redux';
import styled from 'styled-components';

import {ContainerItemInterface, ContainerItemComponent} from './ContainerItem';
import {GenericComponentInterface} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  Directions, directionStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';
import {Droppable} from 'react-beautiful-dnd';
import {DroppableArea} from './ContentBuildComponent';
import {StyledClass} from './StyledClass';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import {connectAsTargetAndSource} from '../draggable-droppable';

export class ContainerClass extends StyledClass {
  constructor(
      id = 'bg_page_0',
      index = 0,
      name = '',
      type = componentTypes.CONTAINER,
      childComponents = [],
      direction = Directions.Columns,
      alignment = Alignments.SpaceBetween,
      paddingVertical = 10,
      paddingHorizontal = 10,
      marginTop = 20,
      marginBottom = 20,
      ...arg
  ) {
    super(...arg);

    this.id = id;
    this.index = index;
    this.name = name;
    this.type = type;
    this.childComponents = childComponents;

    this.direction = direction;
    this.alignment = alignment;
    this.paddingVertical = paddingVertical;
    this.paddingHorizontal = paddingHorizontal;
    this.marginTop = marginTop;
    this.marginBottom = marginBottom;
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const ContainerWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  background-color: red;
  height: 100%;
  // min-height: 200px;
  
  // Alignment
  ${props => alignmentStyle(props.alignment)}
  
  // Direction
  ${props => directionStyle(props.direction)}
  
  // Width
  ${props => widthStyle(props.width)}
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
`;

class ContainerComponent extends React.Component {

  static propTypes = {
    container: PropTypes.instanceOf(ContainerClass),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const {id, index, childComponents, name, type, ...otherProps} = this.props.container;
    const {connectDropTarget, connectDragSource, connectDragPreview, isDragging} = this.props;

    return (
        <ContainerWrapper {...otherProps}
                          ref={instance => connectDropTarget(
                              connectDragPreview(
                                  connectDragSource(instance)))}>
          {id}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;

            return (
                <ContainerItemComponent containerItem={newComponent}
                                        key={key}/>
            );
          })}
        </ContainerWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(ContainerComponent);
export {connectedComponent as ContainerComponent};
