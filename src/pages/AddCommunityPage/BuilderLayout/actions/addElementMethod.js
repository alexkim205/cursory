/*
 * Different contexts:
 * 1. Generic Component is selected
 * 2. Container Item is selected
 * 3. Container is selected
 * 4. Page is selected
 * 5. Background is selected
 * 6. Nothing is selected
 *
 * Actions:
 * 1. Add after Generic Component
 * 2. Add after last element inside of Container Item
 * 3. Try to add new item inside new Container Item. If max no. of CI's exceeded, raise error.
 * 4-6. Append as the last object in the page.
 *
 */

import {componentTypes} from '../../constants/component-types';
import {fromJS} from 'immutable';
import {idToPath, pathToId} from '../../helpers';
import {Log} from '../../../../_helpers';
import {ContainerItemClass, GenericClass} from '../../addable-components';

// https://stackoverflow.com/questions/45517254/react-binding-this-to-an-imported-function
export function handleItemAddClick(e, clickedItem) {
  e.stopPropagation();
  const {activeComponent, sidebarIsOpen} = this.state;
  let builderState = this.state.builderState;

  const selectedType = sidebarIsOpen ? activeComponent.getIn(['type']) : null;
  const selectedId = sidebarIsOpen ? activeComponent.getIn(['id']) : 'bg_path';

  // Create new item to add
  const itemToAdd = fromJS(
      JSON.parse(JSON.stringify(new GenericClass({type: clickedItem.type}))));
  const itemToAddWrappedInContainerItem = fromJS(
      JSON.parse(JSON.stringify(new ContainerItemClass())),
  ).updateIn(['childComponents'], list => list.push(itemToAdd));

  console.log('clicked item', clickedItem, 'with selected component',
      selectedType, selectedId);

  /* Copied from moveElement.js */
  let targetPath = idToPath(selectedId);

  // Current, child, parent paths
  const targetChildPath = targetPath.concat(['childComponents']);
  const targetParentPath = targetPath.slice(0, targetPath.length - 1);

  let targetEl = builderState.getIn(targetPath);
  let targetElChild = builderState.getIn(targetChildPath);
  let targetElParent = builderState.getIn(targetParentPath);

  // update
  const update = newState => {
    this.state.history.traverse();
    if (
        JSON.stringify(this.state.history.getCurrent()) ===
        JSON.stringify(newState)
    )
      return;
    this.state.history.add(newState);
    this.setState({builderState: newState});
  };
  /* Copied from moveElement.js */

  switch (selectedType) {
    case componentTypes.GENERIC:
      Log.info('Add->G');
      builderState = builderState.updateIn(
          targetParentPath,
          parentContainerItem => parentContainerItem.push(itemToAdd),
      );
      break;
    case componentTypes.CONTAINER_ITEM:
      Log.info('Add->CI');
      builderState = builderState.updateIn(
          targetChildPath,
          containerItem => containerItem.push(itemToAdd),
      );
      break;
    case componentTypes.CONTAINER:
      Log.info('Add->C');
      builderState = builderState.updateIn(
          targetChildPath,
          containerChildComponents => containerChildComponents.push(
              itemToAddWrappedInContainerItem),
      );
      break;
    case componentTypes.PAGE:
    case componentTypes.BACKGROUND:
    default: // null
      Log.info('Add->P/B/null');
      builderState = builderState.updateIn(
          targetChildPath,
          pageChildComponents => pageChildComponents.push(itemToAdd),
      );
      break;
  }
  update(builderState);
}
