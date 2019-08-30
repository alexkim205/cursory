import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {findDOMNode} from 'react-dom';
import {BorderHighlight} from '../constants/style-constants';
import {componentTypes} from '../constants/component-types';
import {connectMoveHandler, withBuilderState} from '../BuilderLayout/HOC';
import {compose} from 'redux';
import {idToPath} from '../helpers';

/**
 export const targetSpec = {
  canDrop(props, monitor) {
    if (props.isDragging) {
      return false;
    } // can't drop on self
    // if (monitor.isOver({shallow: false})) {return false;} // can't drop parent on children

    return true;
  },
  drop(props, monitor, component) {
    if (!component) {
      return;
    }
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    } // not greedy

    const { id: draggedId, type: draggedType } = monitor.getItem();
    const { id: overId, type: overType } = props[Object.keys(props)[0]];

    const HOVER_AREA = 15; //px

    // Get mouse and target area positions
    //console.log('items', monitor.getItem(), props[Object.keys(props)[0]]);
    const targetOffset = findDOMNode(component).getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();
    const draggingOffsetX = clientOffset.x,
      draggingOffsetY = clientOffset.y;

    let targetSide = null;

    if (
      draggingOffsetY >= targetOffset.top &&
      draggingOffsetY < targetOffset.top + HOVER_AREA
    ) {
      console.log(
        `add ${draggedId},${draggedType} above ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Top; //top
    } else if (
      draggingOffsetX <= targetOffset.right &&
      draggingOffsetX > targetOffset.right - HOVER_AREA
    ) {
      console.log(
        `add ${draggedId},${draggedType} to the right of ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Right; //right
    } else if (
      draggingOffsetY <= targetOffset.bottom &&
      draggingOffsetY > targetOffset.bottom - HOVER_AREA
    ) {
      console.log(
        `add ${draggedId},${draggedType} under ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Bottom; //bottom
    } else if (
      draggingOffsetX >= targetOffset.left &&
      draggingOffsetX < targetOffset.left + HOVER_AREA
    ) {
      console.log(
        `add ${draggedId},${draggedType} to the left of ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Left; //left
    } else if (
      draggingOffsetX >= targetOffset.left &&
      draggingOffsetX <= targetOffset.right &&
      draggingOffsetY <= targetOffset.bottom &&
      draggingOffsetY >= targetOffset.top
    ) {
      console.log(
        `add ${draggedId},${draggedType} inside ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Center; //inside
    } else {
      console.log(
        `Default action: add ${draggedId},${draggedType} after ${overId},${overType}`,
      );
      targetSide = BorderHighlight.Right; //top
    }

    props.onMove(draggedId, draggedType, overId, overType, targetSide);
  },

  hover(props, monitor, component) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props[Object.keys(props)[0]];

    if (draggedId === overId || draggedId === props.parent) return;
    if (!monitor.isOver({ shallow: true })) return;

    // const targetOffset = component.node.current.getBoundingClientRect();
    const clientOffset = monitor.getClientOffset();

    // const draggingOffsetX = clientOffset.x,
    //     draggingOffsetY = clientOffset.y;

    // console.log('HoverXY:', hoverMiddleX, hoverMiddleY);
    // console.log('MouseXY: ', hoverClientX, hoverClientY);

    // change border highlight
    component.changeBorder(clientOffset);
  },
};

 export const connectAsTarget = Component =>
 DropTarget(
 componentTypes.PAGE,
 {
      drop() {},

      hover(props, monitor) {
        const { id: draggedId } = monitor.getItem();
        console.log("dragging: ", draggedId);
      },
    },
 (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
    }),
 )(Component);
 */

export const withDroppable = Component => {

  class WithDroppable extends React.Component {

    handleDrop = (e) => {
      const {
        builderState,
        container, containerItem, page, genericComponent,
        onMove,
      } = this.props;

      const idDragged = e.dataTransfer.getData('text');
      const componentDroppedOn =
          container || genericComponent || containerItem || page;
      const componentDragged = builderState.getIn(idToPath(idDragged));

      // move elements in builderState
      onMove(componentDragged, componentDroppedOn, BorderHighlight.Bottom)
    };

    render() {
      return (
          <Component
              {...this.props}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => this.handleDrop(e)}
          />
      );
    }
  }

  return compose(
      withBuilderState,
      connectMoveHandler
  )(WithDroppable);
};
