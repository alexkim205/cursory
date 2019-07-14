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
export function handleAddElement(
    builderState, activeComponent, sidebarIsOpen, clickedItem) {

  return new Promise((resolve, reject) => {

    let builderState = builderState;

    const selectedType = sidebarIsOpen ? activeComponent.get('type') : null;
    const selectedId = sidebarIsOpen ? activeComponent.get('id') : 'bg_path';

    if (!selectedType) reject('Type of component to add is undefined.');

    // Create new item to add
    const itemToAdd = fromJS(
        JSON.parse(JSON.stringify(new GenericClass({type: clickedItem.get('type')}))));
    const itemToAddWrappedInContainerItem = fromJS(
        JSON.parse(JSON.stringify(new ContainerItemClass())),
    ).updateIn(['childComponents'], list => list.push(itemToAdd));

    console.log('clicked item', clickedItem, 'with selected component',
        selectedType, selectedId);

    let targetPath = idToPath(selectedId);

    // Current, child, parent paths
    const targetChildPath = targetPath.concat(['childComponents']);
    const targetParentPath = targetPath.slice(0, targetPath.length - 1);

    let targetEl = builderState.getIn(targetPath);
    let targetElChild = builderState.getIn(targetChildPath);
    let targetElParent = builderState.getIn(targetParentPath);

    console.log('newItem', itemToAdd.toJS());
    console.log('targetEl', targetEl.toJS());
    console.log('targetElChild', targetElChild.toJS());
    console.log('targetElParent', targetElParent.toJS());

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

    resolve(builderState);

  });
}
