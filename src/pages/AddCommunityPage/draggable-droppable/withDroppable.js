import React from 'react';
import {DropTarget} from 'react-dnd';
import {componentTypes} from '../constants/component-types';

export const connectAsTarget = Component => DropTarget(
    componentTypes.PAGE,
    {
      drop() {},

      hover(props, monitor) {
        const {id: draggedId} = monitor.getItem();
        console.log('dragging: ', draggedId);
      },
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
    }),
)(Component);
