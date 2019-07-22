// Set active component
import {idToPath, pathToId} from '../../helpers';

export function handleSelectElement(builderState, selectedComponent) {

  return new Promise((resolve, reject) => {
    let newBuilderState = builderState;
    const activeId = selectedComponent.get('id');

    const activePath = idToPath(activeId);
    let oldPath = null;

    // find active one and disable
    const traverseState = (
        o,
        conditionCheckCallback,
        actionCallback,
        oPath = [],
    ) => {
      if (conditionCheckCallback(o)) {
        actionCallback(o, oPath);
      }

      // if background base case
      if (oPath.length === 0) {
        return traverseState(
            o['page'],
            conditionCheckCallback,
            actionCallback,
            ['page'],
        );
      }

      o['childComponents'].forEach((child, i) => {
        return traverseState(
            child,
            conditionCheckCallback,
            actionCallback,
            oPath.concat(['childComponents', i]),
        );
      });
    };
    // traverse to find active element and return its path
    traverseState(
        builderState.toJS(),
        o => o.active === true,
        (o, oPath) => {
          newBuilderState = newBuilderState.setIn(oPath.concat('active'),
              false);
          // return old Path
          oldPath = oPath;
          return;
        },
    );

    if (!oldPath || JSON.stringify(oldPath) !== JSON.stringify(activePath)) {
      // if currently active isn't the same as selected, activate new one
      newBuilderState = newBuilderState.setIn(activePath.concat('active'),
          true);
      newBuilderState = newBuilderState.setIn(
          activePath.concat('id'),
          pathToId(activePath),
      );
      const activeComponent = newBuilderState.getIn(activePath);

      // set new active
      resolve({
        selected: true,
        activeComponent,
        builderState: newBuilderState,
      });
    }

    // close sidebar
    resolve({
      selected: false,
      activeComponent: null,
      builderState: newBuilderState,
    });
  });
}
