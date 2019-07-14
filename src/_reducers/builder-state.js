import {builderStateConstants} from '../_constants';

function builderState(state = {}, action) {
  switch (action.type) {
    case builderStateConstants.ADD_ELEMENT:
    case builderStateConstants.MOVE_ELEMENT:
      return {
        ...state,
        builderState: action.builderState,
      };
    case builderStateConstants.SELECT_ACTIVE_ELEMENT:
    case builderStateConstants.UPDATE_ACTIVE_ELEMENT:
      return {
        ...state,
        activeComponent: action.activeComponent,
      };
    default:
      return state;
  }
}

export {builderState};
