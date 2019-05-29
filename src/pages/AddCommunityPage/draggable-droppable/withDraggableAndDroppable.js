import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {componentTypes} from '../constants/component-types';

export const connectAsTargetAndSource = Component => DropTarget(
    componentTypes.GENERIC,
    {
      drop(props, monitor, component) {

        if (!component) {return;}
        const hasDroppedOnChild = monitor.didDrop();
        if (hasDroppedOnChild) {return;} // not greedy

        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props[Object.keys(props)[0]];

        props.move(draggedId, overId);
      },

      hover(props, monitor, component) {
        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props[Object.keys(props)[0]];

        if (draggedId === overId || draggedId === props.parent) return;
        if (!monitor.isOver({shallow: true})) return;

        const hoverBoundingRect = component.node.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom -
            hoverBoundingRect.top) / 2;
        const hoverMiddleX = (hoverBoundingRect.right -
            hoverBoundingRect.left) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // console.log('HoverXY:', hoverMiddleX, hoverMiddleY);
        // console.log('MouseXY: ', hoverClientX, hoverClientY);

        component.changeBorder(clientOffset);

        const HOVER_AREA = 10; //px
        // top

        // right

        // bottom

        // left

      },
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      clientOffset: monitor.getClientOffset(),
    }),
)(DragSource(
    componentTypes.GENERIC,
    {
      beginDrag(props) {
        console.log('begin drag', props[Object.keys(props)[0]].id);
        return {
          id: props[Object.keys(props)[0]].id,
        };
      },
      isDragging(props, monitor) {
        return props.id === monitor.getItem().id;
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),

    }),
    )(Component),
);
