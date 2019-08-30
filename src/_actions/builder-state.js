import {builderStateConstants} from '../_constants';
import {
  handleAddElement,
  handleMoveElement,
  handleSelectElement,
  handleUpdateElement,
} from '../pages/AddCommunityPage/BuilderLayout/actions';

export const builderStateActions = {
  add,
  move,
  select,
  update,
};

/**
 * Add an element to builder state. This can occur after clicking an item in
 * the floating widget.
 *
 * @param sidebarIsOpen
 * @param clickedItem
 * @returns {function(*, *): Promise<T | never>}
 */
export function add(clickedItem) {
  return (dispatch, getState) => {
    dispatch(request());

    const store = getState().builderState;
    const {builderState, activeComponent, selected} = store;

    if (!builderState || !activeComponent) return Promise.reject(
        'Builder state and/or active component are missing in store.');

    return handleAddElement(
        builderState, activeComponent, selected, clickedItem).then(
        (builderState) => {
          dispatch(success(builderState));
          console.log('Added element.');
        },
        error => {
          dispatch(failure());
          console.log('Error while adding element:', error);
        },
    );
  };

  function request() {
    return {type: builderStateConstants.ADD_ELEMENT_REQUEST};
  }

  function success(builderState) {
    return {type: builderStateConstants.ADD_ELEMENT_SUCCESS, builderState};
  }

  function failure() {
    return {type: builderStateConstants.ADD_ELEMENT_FAILURE};
  }
}

export function move(oldComponent, newComponent, targetSide) {
  return (dispatch, getState) => {
    dispatch(request());

    const store = getState().builderState;
    const {builderState} = store;

    if (!builderState || !oldComponent || !newComponent) return Promise.reject(
        'Builder state, old component, and/or new component are missing in store.');
console.log('MOVING', builderState, oldComponent, newComponent)
    return handleMoveElement(
        builderState, oldComponent, newComponent, targetSide,
    ).then(builderState => {
      dispatch(success(builderState));
      console.log('Moved element.');
    }, error => {
      dispatch(failure());
      console.log('Error while moving element:', error);
    });
  };

  function request() {
    return {type: builderStateConstants.MOVE_ELEMENT_REQUEST};
  }

  function success(builderState) {
    return {type: builderStateConstants.MOVE_ELEMENT_SUCCESS, builderState};
  }

  function failure() {
    return {type: builderStateConstants.MOVE_ELEMENT_FAILURE};
  }
}

export function select(selectedComponent) {
  return (dispatch, getState) => {
    dispatch(request());

    const store = getState().builderState;
    const {builderState} = store;

    if (!builderState) return Promise.reject(
        'Builder state is missing in store.');

    return handleSelectElement(
        builderState, selectedComponent,
    ).then(({selected, activeComponent, builderState: activeBuilderState}) => {
      dispatch(success(selected, activeComponent, activeBuilderState));
      console.log('Selected element.');
    }, error => {
      dispatch(failure());
      console.log('Error while selecting element:', error);
    });
  };

  function request() {
    return {type: builderStateConstants.SELECT_ACTIVE_ELEMENT_REQUEST};
  }

  function success(selected, activeComponent, builderState) {
    return {
      type: builderStateConstants.SELECT_ACTIVE_ELEMENT_SUCCESS,
      selected,
      activeComponent,
      builderState,
    };
  }

  function failure() {
    return {type: builderStateConstants.SELECT_ACTIVE_ELEMENT_FAILURE};
  }
}

export function update(attrName, attrValue) {
  return (dispatch, getState) => {

    dispatch(request());

    const store = getState().builderState;
    const {builderState, activeComponent} = store; // only activeComponent can be updated

    if (!builderState || !activeComponent) return Promise.reject(
        'Builder state and/or active component is missing in store.');

    return handleUpdateElement(
        builderState, activeComponent, attrName, attrValue,
    ).then(({newBuilderState, newActiveComponent}) => {
      dispatch(success(newBuilderState, newActiveComponent));
      console.log('Update element attributes');
    }, error => {
      dispatch(failure());
      console.log('Error while updating element attributes:', error);
    });
  };

  function request() {
    return {type: builderStateConstants.UPDATE_ACTIVE_ELEMENT_REQUEST};
  }

  function success(builderState, activeComponent) {
    return {
      type: builderStateConstants.UPDATE_ACTIVE_ELEMENT_SUCCESS,
      builderState,
      activeComponent,
    };
  }

  function failure() {
    return {type: builderStateConstants.UPDATE_ACTIVE_ELEMENT_FAILURE};
  }
}
