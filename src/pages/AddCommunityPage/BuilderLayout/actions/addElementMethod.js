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
 * 4-6. Append to the last object in the page.
 *
 */

import {componentTypes} from '../../constants/component-types';
import {fromJS} from 'immutable';
import {idToPath} from '../../helpers/index';

// https://stackoverflow.com/questions/45517254/react-binding-this-to-an-imported-function
export function handleItemAddClick(e, clickedItem) {
  e.stopPropagation();
  const {activeComponent, sidebarIsOpen, builderState} = this.state;
  const selectedType = sidebarIsOpen ? activeComponent.type : null;

  let componentState = fromJS(JSON.parse(JSON.stringify(builderState)));

  console.log('clicked item', clickedItem, 'with selected component',
      selectedType);

  switch (selectedType) {
    case componentTypes.GENERIC:
    case componentTypes.CONTAINER_ITEM:
    case componentTypes.CONTAINER:

    case componentTypes.PAGE:
    case componentTypes.BACKGROUND:
    default: // null
      console.log('Append to the last object in the page.');
  }
}
