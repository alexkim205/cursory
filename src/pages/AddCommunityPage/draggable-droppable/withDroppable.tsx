import React from 'react';
import styled from 'styled-components';
import {Droppable} from 'react-beautiful-dnd';

const DroppableArea = styled.div`
  border: 5px solid green;
  box-sizing: border-box;
`

interface droppableProps {
  id: string;
}

const withDroppable = <P extends object>(Component: React.ComponentType<P>) => {

  class WithDroppable extends React.Component<P & droppableProps> {
    render() {
      const {id, ...otherProps} = this.props;

      return (
          <Droppable droppableId={id}>
            {provided => (
                <DroppableArea ref={provided.innerRef}
                     {...provided.droppableProps}>
                  <Component {...otherProps as P}/>
                  {provided.placeholder}
                </DroppableArea>
            )}
          </Droppable>
      );
    }
  }

  return WithDroppable;
};

export {withDroppable};
