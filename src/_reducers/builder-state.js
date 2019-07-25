import {builderStateConstants} from '../_constants';
import {initialState} from '../_services';

function builderState(state = {builderState: initialState}, action) {
  const stateWithBuilderState = {builderState: state.builderState};
  const stateWithActiveComponent = {activeComponent: state.activeComponent};

  switch (action.type) {
    case builderStateConstants.ADD_ELEMENT_REQUEST:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        adding: true,
      };
    case builderStateConstants.ADD_ELEMENT_SUCCESS:
      return {
        builderState: action.builderState,
        added: true,
      };
    case builderStateConstants.ADD_ELEMENT_FAILURE:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        added: false,
      };

    case builderStateConstants.MOVE_ELEMENT_REQUEST:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        moving: true,
        selected: state.selected,
      };
    case builderStateConstants.MOVE_ELEMENT_SUCCESS:
      return {
        activeComponent: state.activeComponent,
        builderState: action.builderState,
        moved: true,
        selected: state.selected,
      };
    case builderStateConstants.MOVE_ELEMENT_FAILURE:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        moved: false,
        selected: state.selected,
      };

    case builderStateConstants.SELECT_ACTIVE_ELEMENT_REQUEST:
      return {
        builderState: state.builderState,
        selecting: true,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT_SUCCESS:
      return {
        selected: action.selected,
        activeComponent: action.activeComponent,
        builderState: action.builderState,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT_FAILURE:
      return {
        builderState: state.builderState,
        selected: false,
      };

    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_REQUEST:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        updating: true,
        selected: true,
      };
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_SUCCESS:
      return {
        updated: true,
        selected: true,
        builderState: action.builderState,
        activeComponent: action.activeComponent,
      };
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT_FAILURE:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
        updated: false,
        selected: true,
      };
    default:
      return {
        builderState: state.builderState,
        activeComponent: state.activeComponent,
      };
  }
}

export {builderState};
