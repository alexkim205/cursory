import React from "react";
import styled from "styled-components";
import { BorderHighlight } from "../constants/style-enums";

export const calcWhichBorder = (clientOffset, ref, isOver, canDrop) => {
  if (!canDrop) {
    return BorderHighlight.None; // None
  }

  const dragging = clientOffset; //this.props.clientOffset;
  const targetOffset = ref.current.getBoundingClientRect();

  const draggingOffsetX = dragging.x,
    draggingOffsetY = dragging.y;

  // console.log('mouse', draggingOffsetX, draggingOffsetY);
  // console.log('target', targetOffset);

  const HOVER_AREA = 15; //px;

  if (
    draggingOffsetY > targetOffset.top &&
    draggingOffsetY < targetOffset.top + HOVER_AREA
  ) {
    return BorderHighlight.Top; // Top
  } else if (
    draggingOffsetX < targetOffset.right &&
    draggingOffsetX > targetOffset.right - HOVER_AREA
  ) {
    return BorderHighlight.Right; // right
  } else if (
    draggingOffsetY < targetOffset.bottom &&
    draggingOffsetY > targetOffset.bottom - HOVER_AREA
  ) {
    return BorderHighlight.Bottom; // bottom
  } else if (
    draggingOffsetX > targetOffset.left &&
    draggingOffsetX < targetOffset.left + HOVER_AREA
  ) {
    return BorderHighlight.Left; // left
  } else if (
    draggingOffsetX >= targetOffset.left &&
    draggingOffsetX <= targetOffset.right &&
    draggingOffsetY <= targetOffset.bottom &&
    draggingOffsetY >= targetOffset.top
  ) {
    return BorderHighlight.Center; // center
  } else {
    return BorderHighlight.None; // none
  }
};

export const renderOverlay = ref => {
  const elementToOverlay = ref.current.getBoundingClientRect();

  const Overlay = styled.div`
    position: absolute;
    top: ${elementToOverlay.top}px;
    left: ${elementToOverlay.left}px;
    height: ${elementToOverlay.height}px;
    width: ${elementToOverlay.width}px;
    z-index: 1;
    opacity: 1;
    background-color: gray;
  `;

  return <Overlay />;
};
