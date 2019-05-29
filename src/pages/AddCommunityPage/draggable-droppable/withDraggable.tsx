import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import styled from 'styled-components';

const DraggableArea = styled.div`
  border: 5px solid purple;
  box-sizing: border-box;
  width: 100%;
`

interface draggableProps {
  id?: string;
  index: number;
}

const withDraggable = <P extends object>(Component: React.ComponentType<P>) => {

  class WithDraggable extends React.Component<P & draggableProps> {
    static defaultProps = {
      index: 0,
    };

    render() {
      const {id, index, ...otherProps} = this.props;

      return (
          <Draggable draggableId={`${id}_${index}`} index={index}>
            {provided => (
                <DraggableArea
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                  <Component
                      id={`${id}_${index}`}
                      {...otherProps as P}
                  />
                </DraggableArea>
            )}
          </Draggable>
      );
    }
  }

  return WithDraggable;
};

export {withDraggable};
