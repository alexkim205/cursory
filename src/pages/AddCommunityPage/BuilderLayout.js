import React from 'react';
import {
  BackgroundComponent,
  BackgroundInterface,
  GenericComponent,
  GenericComponentInterface,
  ContentBuildComponent,
  DroppableCanvasArea,
  BackgroundWrapper,
  BackgroundClass,
  PageClass,
  ContainerClass,
  ContainerItemClass,
} from './components/index';
import {componentTypes} from './constants/component-types';
import {withDroppable} from './draggable-droppable/index';
import HTML5Backend from 'react-dnd-html5-backend';

import {DragDropContext} from 'react-dnd';

/*
 * Every state will have a `background {page { ... } }`

 state =
 ....Background
 ........Page
 ............Generic Component (Container | Generic Component)

 ............Container
 ................Generic Component

 */

const initialState = new BackgroundClass();
initialState.page.addChild(new ContainerClass());
initialState.page.addChild(new ContainerClass());
initialState.page.addChild(new ContainerClass());
initialState.page.addChild(new ContainerClass());
initialState.page.childComponents[0].addChild(new ContainerItemClass());
initialState.page.childComponents[0].addChild(new ContainerItemClass());
initialState.page.childComponents[0].addChild(new ContainerItemClass());

class BuilderLayout extends React.Component {

  state = {
    builderState: initialState,
  };

  render() {
    const {builderState} = this.state;
    console.log('BuilderState', builderState);

    return (
        <ContentBuildComponent builderState={builderState}/>
    );
  }

  onDragStart() {

  }

  onDragEnd = (result) => {
    console.log(result);
  };

  // private generateComponentInterface(
  //     name: string, type: string): GenericComponentInterface {
  //   let newComponent: GenericComponentInterface = {
  //     name, type,
  //   };
  //
  //   return newComponent;
  // }

}

const connectedComponent = DragDropContext(HTML5Backend)(BuilderLayout);
export {connectedComponent as BuilderLayout}
