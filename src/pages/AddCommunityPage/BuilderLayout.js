import React from 'react';
import {fromJS} from 'immutable';
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
  ContainerItemClass, GenericClass,
} from './components/index';
import {componentTypes} from './constants/component-types';
import {withDroppable} from './draggable-droppable/index';
import HTML5Backend from 'react-dnd-html5-backend';

import {DragDropContext} from 'react-dnd';
import {BorderHighlight, borderHighlightStyle} from './constants/style-enums';

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
initialState.page.childComponents[0].childComponents[0].addChild(
    new GenericClass());
initialState.page.childComponents[0].childComponents[0].addChild(
    new GenericClass());
initialState.page.childComponents[0].childComponents[1].addChild(
    new GenericClass());
initialState.page.childComponents[0].childComponents[2].addChild(
    new GenericClass());

class BuilderLayout extends React.Component {

  state = {
    builderState: initialState,
  };

  render() {
    const {builderState} = this.state;

    return (
        <React.Fragment>
          <ContentBuildComponent builderState={builderState} move={this.move} updateState={this.updateState}/>
          <pre>
            {JSON.stringify(builderState, null, 2)}
          </pre>
        </React.Fragment>
    );
  }

  updateState = (newId) => {
    let componentState = fromJS(
        JSON.parse(JSON.stringify(this.state.builderState)));
    let path = ['page'];
    let indices = newId.split('_');
    indices.splice(0, 2);
    indices.forEach((index) => {
      path.push('childComponents');
      path.push(parseInt(index));
    });

    // update id of current element
    console.log(path.concat(["id"]), newId);
    const newComponentState = componentState.setIn(path.concat(["id"]), newId);
    console.log(newComponentState.toJS())
    this.setState({builderState: newComponentState.toJS()});
  };

  move = (oldId, oldType, newId, newType, targetSide) => {
    console.log(oldId, oldType, newId, newType, targetSide);

    // Find index arrays to get to source
    // page -> 0 -> 0 -> 1 -> ...
    let componentState = fromJS(
        JSON.parse(JSON.stringify(this.state.builderState)));
    let sourcePath = ['page'];
    let targetPath = ['page'];
    const sourceIndices = oldId.split('_');
    const targetIndices = newId.split('_');
    sourceIndices.splice(0, 2);
    targetIndices.splice(0, 2);
    sourceIndices.forEach((index) => {
      sourcePath.push('childComponents');
      sourcePath.push(parseInt(index));
    });
    targetIndices.forEach((index) => {
      targetPath.push('childComponents');
      targetPath.push(parseInt(index));
    });
    console.log(sourcePath, targetPath);

    // Current, child, parent paths
    const targetChildPath = targetPath.concat(['childComponents']);
    const targetParentPath = targetPath.slice(0, targetPath.length - 1);
    console.log(targetChildPath, targetParentPath);

    const sourceEl = componentState.getIn(sourcePath);
    let targetEl = componentState.getIn(targetPath);
    let targetElChild = componentState.getIn(targetChildPath);
    let targetElParent = componentState.getIn(targetParentPath);
    console.log(sourceEl, targetEl, targetElChild, targetElParent);
    /*
     For each pair, consider addition to top (t), right (r), bottom (b), left (l), inside (i) of target
     */
    const oldisGeneric = oldType === componentTypes.GENERIC;
    const oldisContainer = oldType === componentTypes.CONTAINER;
    const oldisContainerI = oldType === componentTypes.CONTAINER_ITEM;
    const newisGeneric = newType === componentTypes.GENERIC;
    const newisContainer = newType === componentTypes.CONTAINER;
    const newisContainerI = newType === componentTypes.CONTAINER_ITEM;

    /* GENERIC to GENERIC */
    // t: remove then insert before target
    // r: remove then insert after target
    // b: remove then insert after target
    // l: remove then insert before target
    // i: undefined
    if (oldisGeneric && newisGeneric) {
      // first delete
      componentState = componentState.deleteIn(sourcePath);

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          componentState = componentState.setIn(targetParentPath,
              targetElParent.splice(targetPath[-1], 0, sourceEl));
          this.setState({builderState: componentState.toJS()});
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Bottom:
          componentState = componentState.setIn(targetParentPath,
              targetElParent.splice(targetPath[-1] + 1, 0, sourceEl));
          this.setState({builderState: componentState.toJS()});
          break;
        case BorderHighlight.Center:
          break;
      }
    }

    /* GENERIC to CONTAINER-ITEM */
    // t: remove then insert at beginning of target list
    // r: remove then insert new container-item after target, add source to new item
    // b: remove then insert at end of target list
    // l: remove then insert new container-item before target, add source to new item
    // i: remove then insert at end of target list
    if (oldisGeneric && newisContainerI) {
      // first delete
      componentState = componentState.deleteIn(sourcePath);
      const newContainerItem = new ContainerItemClass();
      newContainerItem.addChild(sourceEl); // add source to new container item

      switch (targetSide) {
        case BorderHighlight.Top:
          targetElChild.unshift(sourceEl); // add to beginning of list
          componentState = componentState.setIn(targetChildPath, targetElChild);
          this.setState({builderState: componentState.toJS()});
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Left:
          componentState = componentState.setIn(targetParentPath,
              targetElParent.splice(targetPath[-1] + 1, 0, newContainerItem)); // insert new container-item after target
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Center:
          targetElChild.push(sourceEl); // add to end of list
          componentState = componentState.setIn(targetPath, targetElChild);
          this.setState({builderState: componentState.toJS()});
          break;
      }
    }

    /* GENERIC to CONTAINER */
    // t: remove then insert before target
    // r: remove then insert new container-item after target, add source to new item
    // b: remove then insert after target
    // l: remove then insert new container-item before target, add source to new item
    // i: undefined
    if (oldisGeneric && newisContainer) {
      switch (targetSide) {
        case BorderHighlight.Top:
          break;
        case BorderHighlight.Right:
          break;
        case BorderHighlight.Bottom:
          break;
        case BorderHighlight.Left:
          break;
        case BorderHighlight.Center:
          break;
      }
    }

    /* CONTAINER to GENERIC */ // Undefined Behavior

    /* CONTAINER to CONTAINER-ITEM */
    // t: remove, get all children, then insert before target's children
    // r: remove, get all children, then insert new container-item after target, add source children to new item
    // b: remove, get all children, then insert after target's children
    // l: remove, get all children, then insert new container-item before target, add source children to new item
    // i: remove, get all children, then insert after target's children
    if (oldisContainer && newisContainerI) {
      switch (targetSide) {
        case BorderHighlight.Top:
          break;
        case BorderHighlight.Right:
          break;
        case BorderHighlight.Bottom:
          break;
        case BorderHighlight.Left:
          break;
        case BorderHighlight.Center:
          break;
      }
    }

    /* CONTAINER to CONTAINER */
    // t: remove then insert before target
    // r: undefined
    // b: remove then insert after target
    // l: undefined
    // i: undefined
    if (oldisContainer && newisContainer) {
      switch (targetSide) {
        case BorderHighlight.Top:
          break;
        case BorderHighlight.Right:
          break;
        case BorderHighlight.Bottom:
          break;
        case BorderHighlight.Left:
          break;
        case BorderHighlight.Center:
          break;
      }
    }

    /* CONTAINER-ITEM to Anything */ // Cannot drag Container-item

  };

}

const connectedComponent = DragDropContext(HTML5Backend)(BuilderLayout);
export {connectedComponent as BuilderLayout};
