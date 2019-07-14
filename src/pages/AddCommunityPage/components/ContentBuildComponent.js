import {
  BackgroundComponent,
  BackgroundInterface,
} from "../addable-components/Background";
import React from "react";
import { withDroppable } from "../draggable-droppable/index";

export const ContentBuildComponent = React.memo(
  ({ builderState, move, handleSelectElement }) => {
    return (
      <BackgroundComponent
        background={builderState}
        move={move}
        updateActive={updateActive}
      />
    );
  },
);
