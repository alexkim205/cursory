import React from 'react';
import {fromJS} from 'immutable';
import {
  BackgroundClass,
  ContainerClass,
  ContainerItemClass,
  GenericClass, PageClass,
} from './addable-components';
import {ContentBuildComponent, History} from './components';
import {componentTypes} from './constants/component-types';
import HTML5Backend from 'react-dnd-html5-backend';

import {DragDropContext} from 'react-dnd';
import {BorderHighlight} from './constants/style-enums';
import {Log} from '../../_helpers';
import {isKeyHotkey} from 'is-hotkey';

/*
 * Every state will have a `background {page { ... } }`

 state =
 ....Background
 ........Page
 ............Generic Component (Container | Generic Component)

 ............Container
 ................Generic Component

 */

const initialState = new BackgroundClass({page: new PageClass({width: 80})});
initialState.page.addChild(new ContainerClass({id: 'bg_page_0'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_1'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_2'}));
initialState.page.addChild(new ContainerClass({id: 'bg_page_3'}));
initialState.page.childComponents[1].addChild(
    new ContainerItemClass({id: 'bg_page_0_0'}));
initialState.page.childComponents[1].addChild(
    new ContainerItemClass({id: 'bg_page_0_1'}));
initialState.page.childComponents[1].addChild(
    new ContainerItemClass({id: 'bg_page_0_2'}));
initialState.page.childComponents[1].childComponents[0].addChild(
    new GenericClass({id: 'bg_page_0_0_0', backgroundColor: 'blue'}));
initialState.page.childComponents[1].childComponents[0].addChild(
    new GenericClass({id: 'bg_page_0_0_1', backgroundColor: 'red'}));
initialState.page.childComponents[1].childComponents[1].addChild(
    new GenericClass({id: 'bg_page_0_1_0', backgroundColor: 'green'}));
initialState.page.childComponents[1].childComponents[2].addChild(
    new GenericClass({id: 'bg_page_0_2_0', backgroundColor: 'yellow'}));

class BuilderLayout extends React.Component {

  constructor(props) {
    super(props);
    this.isUndoKey = isKeyHotkey('mod+z');
    this.isRedoKey = isKeyHotkey('mod+shift+z');
  }

  initSession = () => {

  };

  state = {
    builderState: initialState,
    history: new History(15, initialState),
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  render() {
    const {builderState} = this.state;

    return (
        <React.Fragment>
          <ContentBuildComponent builderState={builderState} move={this.move}
                                 updateState={this.updateState}/>
          {/*<pre>*/}
          {/*{JSON.stringify(builderState, null, 2)}*/}
          {/*</pre>*/}
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
    // console.log(path.concat(['id']), newId);
    const newComponentState = componentState.setIn(path.concat(['id']), newId);
    // this.setState({builderState: newComponentState.toJS()});
  };

  handleKeyDown = (event) => {
    // this.state.history.traverse()
    if (this.isUndoKey(event)) {
      this.setState({builderState: this.state.history.undo()});
    } else if (this.isRedoKey(event)) {
      this.setState({builderState: this.state.history.redo()});
    }
  };

  move = (oldId, oldType, newId, newType, targetSide) => {
    // console.log(oldId, oldType, newId, newType, targetSide);

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
    // console.log(sourcePath, targetPath);

    // Current, child, parent paths
    const sourceChildPath = sourcePath.concat(['childComponents']);
    const sourceParentPath = sourcePath.slice(0, sourcePath.length - 1);
    const targetChildPath = targetPath.concat(['childComponents']);
    const targetParentPath = targetPath.slice(0, targetPath.length - 1);

    let sourceEl = componentState.getIn(sourcePath);
    let sourceElChild = componentState.getIn(sourceChildPath);
    let sourceElParent = componentState.getIn(sourceParentPath);
    let targetEl = componentState.getIn(targetPath);
    let targetElChild = componentState.getIn(targetChildPath);
    let targetElParent = componentState.getIn(targetParentPath);

    /*
     For each pair, consider addition to top (t), right (r), bottom (b), left (l), inside (i) of target
     */
    const oldisGeneric = oldType === componentTypes.GENERIC;
    const oldisContainer = oldType === componentTypes.CONTAINER;
    const oldisContainerI = oldType === componentTypes.CONTAINER_ITEM;
    const newisGeneric = newType === componentTypes.GENERIC;
    const newisContainer = newType === componentTypes.CONTAINER;
    const newisContainerI = newType === componentTypes.CONTAINER_ITEM;

    // delete
    const deleteCurrent = () =>
        componentState = componentState.deleteIn(sourcePath);
    const smartDeleteCurrent = () => {
      // If source container is before target, delete current as normal. However
      // if source is after target, there is a +1 offset where the old source
      // must be deleted. This phenomena only happens when moving around
      // that are in the same level.
      let pathToErase = sourcePath.slice();
      if (sourcePath.length === targetPath.length &&
          sourcePath[sourcePath.length - 1] >
          targetPath[sourcePath.length - 1]) {
        pathToErase[sourcePath.length - 1] += 1;
      }

      componentState = componentState.deleteIn(pathToErase);
    };

    // update
    const update = (newState) => {
      this.state.history.traverse();
      if (JSON.stringify(this.state.history.getCurrent()) ===
          JSON.stringify(newState)) return;
      this.state.history.add(newState);
      this.setState({builderState: newState});
    };

    /* GENERIC to GENERIC */
    // t: insert before target
    // r: insert after target
    // b: insert after target
    // l: insert before target
    // i: undefined
    if (oldisGeneric && newisGeneric) {
      // parent: wrapper's childComponents (container-Item's children)
      // current: generic
      // child: childComponents (null)

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('G->G.Top/Left');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent => targetElParent.splice(
                  targetPath[targetPath.length - 1], 0,
                  sourceEl));
          smartDeleteCurrent();
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Bottom:
          Log.info('G->G.Right/Bottom');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent => targetElParent.splice(
                  targetPath[targetPath.length - 1] + 1, 0,
                  sourceEl));
          smartDeleteCurrent();
          break;
        case BorderHighlight.Center:
          Log.info('G->G.Center');
          break;
      }
      update(componentState.toJS());
    }

    /* GENERIC to CONTAINER-ITEM */
    // t: insert at beginning of target list
    // r: insert new container-item after target, add source to new item
    // b: insert at end of target list
    // l: insert new container-item before target, add source to new item
    // i: insert at end of target list
    if (oldisGeneric && newisContainerI) {
      // parent: wrapper (container's childComponents)
      // current: generic
      // child: childComponents (container-Item's childComponents)

      const newContainerItemMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerItemClass()))).
          updateIn(['childComponents'], list => list.push(sourceEl));

      deleteCurrent();

      switch (targetSide) {
        case BorderHighlight.Top:
          Log.info('G->CI.Top');
          componentState = componentState.updateIn(targetChildPath,
              targetElChild => targetElChild.unshift(sourceEl));
          break;
        case BorderHighlight.Right:
          Log.info('G->CI.Right');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent =>
                  targetElParent.splice(targetPath[targetPath.length - 1] + 1,
                      0, newContainerItemMap)); // insert new container-item after target
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Center:
          Log.info('G->CI.Bottom/Center');
          componentState = componentState.updateIn(targetChildPath,
              targetElChild => targetElChild.push(sourceEl));
          break;
        case BorderHighlight.Left:
          Log.info('G->CI.Left');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent =>
                  targetElParent.splice(targetPath[targetPath.length - 1], 0,
                      newContainerItemMap)); // insert new container-item after target
          break;
      }
      update(componentState.toJS());
    }

    /* GENERIC to CONTAINER */
    // t: insert new container before target, add source to new container
    // r: insert new container-item at end of target, add source to new item
    // b: insert new container after target, add source to new container
    // l: insert new container-item at beginning of target, add source to new item
    // i: insert new container-item at end of target, add source to new item
    if (oldisGeneric && newisContainer) {
      // parent: container wrapper (wrapper's childComponents)
      // current: container
      // child: container's childComponents (list of container-Items)

      // create new container-item
      const newContainerItemMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerItemClass()))).
          updateIn(['childComponents'], list => list.push(sourceEl));
      // create new container from container-item
      const newContainerMap = fromJS(
          JSON.parse(JSON.stringify(new ContainerClass()))).
          updateIn(['childComponents'], list => list.push(newContainerItemMap));

      deleteCurrent();

      switch (targetSide) {
        case BorderHighlight.Top:
          Log.info('G->C.Top');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent =>
                  targetElParent.splice(targetPath[targetPath.length - 1], 0,
                      newContainerMap)); // insert new container before target
          break;
        case BorderHighlight.Right:
        case BorderHighlight.Center:
          Log.info('G->C.Right/Center');
          // if trying to drop into same container, behavior is undefined
          if (sourcePath[targetPath.length - 1] ===
              targetPath[targetPath.length - 1]) return;
          componentState = componentState.updateIn(targetChildPath,
              targetElChild =>
                  targetElChild.push(newContainerItemMap)); // insert new container-item at end
          break;
        case BorderHighlight.Bottom:
          Log.info('G->C.Bottom');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent =>
                  targetElParent.splice(targetPath[targetPath.length - 1] + 1,
                      0, newContainerMap)); // insert new container after target
          break;
        case BorderHighlight.Left:
          Log.info('G->C.Left');
          if (sourcePath[targetPath.length - 1] ===
              targetPath[targetPath.length - 1]) return;
          componentState = componentState.updateIn(targetChildPath,
              targetElChild =>
                  targetElChild.unshift(newContainerItemMap)); // insert new container-item at beginning
          break;
      }
      update(componentState.toJS());
    }

    /* CONTAINER to GENERIC */ // Undefined Behavior

    /* CONTAINER to CONTAINER-ITEM */
    // t: get all children, then insert children before target
    // r: get all children, then insert children after target
    // b: get all children, then insert children after target
    // l: get all children, then insert children before target
    // i: insert entire container to end of target's children
    if (oldisContainer && newisContainerI) {
      // parent: wrapper (container's childComponents)
      // current: container-item
      // child: childComponents (container-Item's childComponents)

      // if container is empty, don't do anything
      if (sourceElChild.size === 0) return;

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('C->CI.Top/Left');
          // basically merges lists before specific index
          componentState = componentState.setIn(targetParentPath,
              targetElParent.slice(0,
                  targetPath[targetPath.length - 1]).
                  concat(sourceElChild).
                  concat(targetElParent.slice(
                      targetPath[targetPath.length - 1])));
          deleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Right:
        case BorderHighlight.Center:
          Log.info('C->CI.Bottom/Right/Center');
          // basically merges lists after specific index
          componentState = componentState.setIn(targetParentPath,
              targetElParent.slice(0,
                  targetPath[targetPath.length - 1] + 1).
                  concat(sourceElChild).
                  concat(targetElParent.slice(
                      targetPath[targetPath.length - 1] + 1)));
          deleteCurrent(); // important to delete after combining containers
          break;
      }
      update(componentState.toJS());
    }

    /* CONTAINER to CONTAINER */
    // t: insert before target
    // r: insert after target
    // b: insert after target
    // l: insert before target
    // i: undefined
    if (oldisContainer && newisContainer) {
      // parent: wrapper (page's childComponents)
      // current: container
      // child: childComponents (container's childComponents)

      switch (targetSide) {
        case BorderHighlight.Top:
        case BorderHighlight.Left:
          Log.info('C->C.Top/Left');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent => targetElParent.splice(
                  targetPath[targetPath.length - 1], 0,
                  sourceEl));
          smartDeleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Bottom:
        case BorderHighlight.Right:
          Log.info('C->C.Bottom/Right');
          componentState = componentState.updateIn(targetParentPath,
              targetElParent => targetElParent.splice(
                  targetPath[targetPath.length - 1] + 1, 0,
                  sourceEl));
          smartDeleteCurrent(); // important to delete after combining containers
          break;
        case BorderHighlight.Center:
          Log.info('C->C.Center');
          break;
      }
      update(componentState.toJS());
    }

    /* CONTAINER-ITEM to Anything */ // Cannot drag Container-item
  };

}

const connectedComponent = DragDropContext(HTML5Backend)(BuilderLayout);
export {connectedComponent as BuilderLayout};
