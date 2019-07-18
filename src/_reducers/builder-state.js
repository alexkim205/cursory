import {builderStateConstants} from '../_constants';

function builderState(state = {}, action) {
  const stateWithBuilderState = {builderState: state.builderState};

  switch (action.type) {
    case builderStateConstants.ADD_ELEMENT_REQUEST:
      return {
        ...stateWithBuilderState,
        adding: true,
      };
    case builderStateConstants.MOVE_ELEMENT_REQUEST:
      return {
        ...stateWithBuilderState,
        moving: true,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT_REQUEST:
      return {
        ...stateWithBuilderState,
        selecting: true,
      };
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_REQUEST:
      return {
        ...stateWithBuilderState,
        updating: true,
      };
    case builderStateConstants.ADD_ELEMENT_SUCCESS:
      return {
        ...stateWithBuilderState,
        added: true,
        // activeComponent: state.activeComponent,
        builderState: action.builderState,
      };
    case builderStateConstants.MOVE_ELEMENT_SUCCESS:
      return {
        ...stateWithBuilderState,
        moved: true,
        builderState: action.builderState,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT_SUCCESS:
      return {
        ...stateWithBuilderState,
        selected: action.selected,
        activeComponent: action.activeComponent,
        builderState: action.builderState
      };
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_SUCCESS:
      return {
        ...stateWithBuilderState,
        updated: true,
        activeComponent: action.activeComponent,
      };
    case builderStateConstants.ADD_ELEMENT_FAILURE:
      return {
        ...stateWithBuilderState,
        added: false,
      };
    case builderStateConstants.MOVE_ELEMENT_FAILURE:
      return {
        ...stateWithBuilderState,
        moved: false,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT_FAILURE:
      return {
        ...stateWithBuilderState,
        selected: false,
      };
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_FAILURE:
      return {
        ...stateWithBuilderState,
        updated: false,
      };
    default:
      return stateWithBuilderState;
  }
}

export {builderState};
