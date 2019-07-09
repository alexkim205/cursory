import React from "react";
import { findDOMNode } from "react-dom";
import { DragSource, DropTarget } from "react-dnd";
import { componentTypes } from "../constants/component-types";
import { BorderHighlight } from "../constants/style-enums";
import { targetSpec } from "./withDroppable";

export const connectAsTargetAndSource = Component =>
  DropTarget(componentTypes.GENERIC, targetSpec, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    clientOffset: monitor.getClientOffset(),
  }))(
    DragSource(
      componentTypes.GENERIC,
      {
        beginDrag(props) {
          // console.log("begin drag", props);
          return {
            id: props[Object.keys(props)[0]].id,
            type: props[Object.keys(props)[0]].type,
          };
        },
        // isDragging(props, monitor) {
        //   const {id: draggedId} = monitor.getItem();
        //   const {id: overId} = props[Object.keys(props)[0]];
        //
        //   return overId === draggedId;
        // },
      },
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
      }),
    )(Component),
  );
