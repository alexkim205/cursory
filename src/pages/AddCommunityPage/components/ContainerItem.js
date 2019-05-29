import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {GenericComponent} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  Directions, directionStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';
import {Draggable} from 'react-beautiful-dnd';
import {StyledClass} from './StyledClass';
import {ContainerClass} from './Container';
import {connectAsTargetAndSource} from '../draggable-droppable';

/*
 * Container column where elements can be dropped into.
 */

export class ContainerItemClass extends StyledClass {
  constructor(
      id = 'bg_page_0',
      index = 0,
      name = '',
      type = componentTypes.CONTAINER_ITEM,
      childComponents = [],
      direction = Directions.Columns,
      width = 30,
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

    this.width = width;
    this.direction = direction;
    this.paddingVertical = paddingVertical;
    this.paddingHorizontal = paddingHorizontal;
    this.marginTop = marginTop;
    this.marginBottom = marginBottom;
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const ContainerItemWrapper = styled.div`

  display: flex;
  box-sizing: border-box;
  
  background-color: ${props => props.backgroundColor};
  background-color: green;
  
  display: flex;
  box-sizing: border-box;

  // Alignment
  ${props => alignmentStyle(props.alignment)}
  
  // Width
  ${props => widthStyle(props.width)}
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
`;

class ContainerItemComponent extends React.Component {

  static propTypes = {
    containerItem: PropTypes.instanceOf(ContainerItemClass),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const {id, index, childComponents, name, type, ...otherProps} = this.props.containerItem;
    const {connectDropTarget, connectDragSource, connectDragPreview, isDragging} = this.props;

    return (
        <ContainerItemWrapper {...otherProps}
                              ref={instance => connectDropTarget(
                                  connectDragPreview(
                                      connectDragSource(instance)))}>
          {id}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `bg_page_${key}`;
            newComponent.index = key;

            return (
                <GenericComponent genericComponent={newComponent} key={key}/>
            );
          })}
        </ContainerItemWrapper>
    );
  }

}

const connectedComponent = connectAsTargetAndSource(ContainerItemComponent);
export {connectedComponent as ContainerItemComponent};
