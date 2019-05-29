import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {GenericComponent} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  BorderHighlight, borderHighlightStyle,
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
  
    // Border Highlight
  ${props => borderHighlightStyle(props.borderHighlight, props.isOver)}
`;

class ContainerItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {borderHighlight: null};

  static propTypes = {
    containerItem: PropTypes.instanceOf(ContainerItemClass),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    clientOffset: PropTypes.object,
    move: PropTypes.func,
  };

  changeBorder = (clientOffset) => {
    this.setState({borderHighlight: this.calcWhichBorder(clientOffset)});
  };

  calcWhichBorder = (clientOffset) => {
    const {isOver, canDrop} = this.props;

    if (!isOver || !canDrop) {
      return BorderHighlight.None; // None
    }

    const dragging = clientOffset; //this.props.clientOffset;
    const targetOffset = this.node.current.getBoundingClientRect();

    const draggingOffsetX = dragging.x,
        draggingOffsetY = dragging.y;

    // console.log('mouse', draggingOffsetX, draggingOffsetY);
    // console.log('target', targetOffset);

    const HOVER_AREA = 10; //px;

    if (draggingOffsetY >= targetOffset.top && draggingOffsetY <
        targetOffset.top + HOVER_AREA) {
      return BorderHighlight.Top; // Top
    } else if (draggingOffsetX <= targetOffset.right && draggingOffsetX >
        targetOffset.right - HOVER_AREA) {
      return BorderHighlight.Right; // right
    } else if (draggingOffsetY <= targetOffset.bottom && draggingOffsetY >
        targetOffset.bottom - HOVER_AREA) {
      return BorderHighlight.Bottom; // bottom
    } else if (draggingOffsetX >= targetOffset.left && draggingOffsetX <
        targetOffset.left + HOVER_AREA) {
      return BorderHighlight.Left; // left
    } else if (draggingOffsetX >= targetOffset.left && draggingOffsetX <=
        targetOffset.right && draggingOffsetY <= targetOffset.bottom &&
        draggingOffsetY >= targetOffset.top) {
      return BorderHighlight.Center; // center
    } else {
      return BorderHighlight.None; // none
    }

  };

  render() {
    const {id, index, childComponents, name, type, ...otherProps} = this.props.containerItem;
    const {
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      isDragging,
      isOver,
      canDrop,
      clientOffset,
      move,
    } = this.props;
    const {borderHighlight} = this.state;

    return (
        <ContainerItemWrapper {...otherProps}
                              borderHighlight={borderHighlight}
                              isOver={isOver}
                              ref={instance => {
                                this.node.current = instance;
                                return connectDropTarget(
                                    connectDragPreview(
                                        connectDragSource(instance)));
                              }}>
          {id}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `bg_page_${key}`;
            newComponent.index = key;

            return (
                <GenericComponent genericComponent={newComponent} key={key}
                                  move={move}
                />
            );
          })}
        </ContainerItemWrapper>
    );
  }

}

const connectedComponent = connectAsTargetAndSource(ContainerItemComponent);
export {connectedComponent as ContainerItemComponent};
