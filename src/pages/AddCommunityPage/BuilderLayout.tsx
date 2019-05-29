import React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {
  BackgroundComponent,
  BackgroundInterface,
  GenericComponent,
  GenericComponentInterface,
  ContentBuildComponent, DroppableCanvasArea,
  BackgroundWrapper,
} from './components';
import {componentTypes} from './constants/component-types';
import {withDroppable} from './draggable-droppable';

/*
 * Every state will have a `background {page { ... } }`

 state =
 ....Background
 ........Page
 ............Generic Component (Container | Generic Component)

 ............Container
 ................Generic Component

 */
const initialState: BackgroundInterface = {
  type: componentTypes.BACKGROUND,
  page: {
    type: componentTypes.PAGE,
    width: 100,
    childComponents: [
      {
        name: 'Container 1',
        type: componentTypes.CONTAINER,
        childComponents: [
          {
            name: 'Container 1.a',
            type: componentTypes.CONTAINER_ITEM,
          },
          {
            name: 'Container 1.b',
            type: componentTypes.CONTAINER_ITEM,
          },
        ],
      },
      {
        name: 'Container 2',
        type: componentTypes.CONTAINER,
      },
      {
        name: 'Container 2',
        type: componentTypes.CONTAINER,
      },
      {
        name: 'Container 2',
        type: componentTypes.CONTAINER,
      },
    ],
  },
};

export class BuilderLayout extends React.Component {

  public state = {
    builderState: initialState,
  };

  public render() {
    const {builderState} = this.state;
    console.log('BuilderState', builderState);

    return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={'canvas'}>
            {provided => (
                <DroppableCanvasArea ref={provided.innerRef}
                                     {...provided.droppableProps}>
                  <ContentBuildComponent builderState={builderState}/>
                  {provided.placeholder}
                </DroppableCanvasArea>
            )}
          </Droppable>
        </DragDropContext>
    );
  }

  private onDragEnd(result: object) {
    console.log(result);
  }

  // private generateComponentInterface(
  //     name: string, type: string): GenericComponentInterface {
  //   let newComponent: GenericComponentInterface = {
  //     name, type,
  //   };
  //
  //   return newComponent;
  // }

}
