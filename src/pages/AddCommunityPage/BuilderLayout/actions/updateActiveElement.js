// Set active component
import {idToPath, pathToId} from '../../helpers';
import {componentFields} from '../../constants/component-types';
import {findInState} from './sharedMethods';

export function updateActive(e, activeId) {
  e.stopPropagation();
  let {builderState} = this.state;

  const activePath = idToPath(activeId);
  const oldId = findInState(builderState, o => o.get('active') === true)
  const oldPath = oldId ? idToPath(oldId) : null

  if (oldPath) {
    builderState = builderState.setIn(oldPath.concat('active'), false);
  }

  if (!oldPath || JSON.stringify(oldPath) !== JSON.stringify(activePath)) {
    // if currently active isn't the same as selected, activate new one
    builderState = builderState.setIn(activePath.concat('active'), true);
    builderState = builderState.setIn(activePath.concat('id'), pathToId(activePath));
    const activeComponent = builderState.getIn(activePath);

    // set new active
    this.setState({
      sidebarIsOpen: true,
      activeComponent: activeComponent,
      activeFields: componentFields[activeComponent.get('type')],
      builderState: builderState,
    });
  } else {
    // close sidebar
    this.setState({
      sidebarIsOpen: false,
      builderState: builderState,
    });
  }
};
