import {
  BackgroundClass,
  BackgroundComponent,
  BackgroundInterface,
} from "../addable-components/Background";
import React from "react";
import styled from "styled-components";
import { withDroppable } from "../draggable-droppable/index";

export const ContentBuildComponent = React.memo(
  ({ builderState, move, updateActive }) => {
    return (
      <BackgroundComponent
        background={builderState}
        move={move}
        updateActive={updateActive}
      />
    );
  },
);

export const DroppableCanvasArea = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  border: 5px solid green;
`;

export const DroppableArea = styled.div`
  border: 5px solid green;
`;

export const DraggableArea = styled.div`
  border: 5px solid purple;
  box-sizing: border-box;
  width: 100%;
`;

// const connectedComponent = withDroppable(ContentBuildComponent);

// export {connectedComponent as ContentBuildComponent};
