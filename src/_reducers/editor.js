import { editorConstants } from "../_constants/editor";

function editor(state = {}, action) {
  switch (action.type) {
    case editorConstants.DISCARD_REQUEST:
      return {
        discarding: true
      };
    case editorConstants.DISCARD_SUCCESS:
      return {
        discarded: true
      };
    case editorConstants.DISCARD_FAILURE:
      return {
        discarded: false
      };
    case editorConstants.SAVE_REQUEST:
      return {
        saving: true
      };
    case editorConstants.SAVE_SUCCESS:
      return {
        saved: true
      };
    case editorConstants.SAVE_FAILURE:
      return {
        saved: false
      };

    default:
      return state;
  }
}

export {editor}