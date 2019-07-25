import {idToPath} from '../../helpers';

// Update component attributes

export function handleUpdateElement(
    builderState, activeComponent, attrName, attrValue) {

  return new Promise((resolve, reject) => {
    let newBuilderState = builderState,
        newActiveComponent = activeComponent;
    const componentId = activeComponent.get('id');

    const path = idToPath(componentId);

    newBuilderState = newBuilderState.setIn(path.concat(attrName), attrValue);
    newActiveComponent = newActiveComponent.set(attrName, attrValue);
    resolve(
        {newBuilderState, newActiveComponent});
  });
}
