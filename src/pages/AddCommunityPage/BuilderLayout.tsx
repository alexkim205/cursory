import React from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {
  BackgroundComponent,
  BackgroundInterface,
  GenericComponent,
  GenericComponentInterface,
} from './components';
import {componentTypes} from './constants/component-types';

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
    width: 12,
    padding: 3,
  },
};

interface BuilderLayoutProps {
  builderState: BackgroundInterface
}

const ContentBuildComponent = React.memo <BuilderLayoutProps>(
    ({builderState}) =>
        <BackgroundComponent {...builderState}/>,
);

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
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <ContentBuildComponent builderState={builderState}/>
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
    );
  }

  private onDragEnd(result: object) {
    console.log(result);
  }

  private generateComponentInterface(
      name: string, type: string): GenericComponentInterface {
    let newComponent: GenericComponentInterface = {
      name, type,
    };

    return newComponent;
  }

}
