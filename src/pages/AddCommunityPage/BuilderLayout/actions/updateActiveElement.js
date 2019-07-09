// Set active component
import {idToPath, pathToId} from '../../helpers';
import {componentFields} from '../../constants/component-types';

export function updateActive(e, activeId) {
  e.stopPropagation();
  let {builderState} = this.state;

  // let componentState = fromJS(
  //     JSON.parse(JSON.stringify(this.state.builderState)),
  // );
  const activePath = idToPath(activeId);
  console.log(activePath);
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
        builderState = builderState.setIn(oPath.concat('active'), false);
        // return old Path
        oldPath = oPath;
        return;
      },
  );

  if (!oldPath || JSON.stringify(oldPath) !== JSON.stringify(activePath)) {
    // if currently active isn't the same as selected, activate new one
    builderState = builderState.setIn(activePath.concat('active'), true);
    builderState = builderState.setIn(
        activePath.concat('id'),
        pathToId(activePath),
    );
    const activeComponent = builderState.getIn(activePath);

    // set new active
    this.setState({
      sidebarIsOpen: true,
      activeComponent: activeComponent,
      activeFields: componentFields[activeComponent.getIn(['type'])],
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
