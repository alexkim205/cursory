import {BackgroundComponent, BackgroundInterface} from './Background';
import React from 'react';
import styled from 'styled-components';
import {withDroppable} from '../draggable-droppable';

interface BuilderLayoutProps {
  builderState: BackgroundInterface
}

export const ContentBuildComponent = React.memo <BuilderLayoutProps>(
    ({builderState}) =>
        <BackgroundComponent {...builderState}/>,
);

export const DroppableCanvasArea = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  border: 5px solid green;
`;

export const DroppableArea = styled.div`
  box-sizing: border-box;
  border: 5px solid green;
`;

// const connectedComponent = withDroppable(ContentBuildComponent);

// export {connectedComponent as ContentBuildComponent};
