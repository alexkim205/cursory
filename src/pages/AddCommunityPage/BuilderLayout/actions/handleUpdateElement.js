import {idToPath} from '../../helpers';

// Update component attributes

export function handleUpdateElement(
    builderState, activeComponent, attrName, attrValue) {

  return new Promise((resolve, reject) => {
    let builderState = builderState;
    const componentId = activeComponent.get('id');

    const path = idToPath(componentId);

    builderState = builderState.setIn(path.concat(attrName), attrValue);
    resolve(builderState);
  });
}
