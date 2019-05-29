import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {componentTypes} from '../constants/component-types';

export const connectAsTargetAndSource = Component => DropTarget(
    componentTypes.GENERIC,
    {
      canDrop() {
        return false;
      },

      hover(props, monitor) {
        const {id: draggedId} = monitor.getItem();
        const {id: overId} = props;

        if (draggedId === overId || draggedId === props.parent) return;
        if (!monitor.isOver({shallow: true})) return;

        // move/rearrange
      },
    },
    connect => ({
      connectDropTarget: connect.dropTarget(),
    }),
)(DragSource(
    componentTypes.GENERIC,
    {
      beginDrag(props) {
        return {
          id: props.id,
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
