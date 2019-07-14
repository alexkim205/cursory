import { builderStateConstants } from "../_constants";

export const builderStateActions = {
  add,
  move,
  select,
  update,
};

export function add(builderState) {
  return function(dispatch) {
    return new Promise(resolve => {
      dispatch({type: builderStateConstants.ADD_ELEMENT, builderState: builderState});
      resolve();
    }).then(
        () => {
          console.log("added element")
        },
        error => {
          dispatch(failure());
          toast.error(`Entry couldn't be discarded: ${error}`);
        },
    );
  };
}

export function save(entry_id, payload) {
  return function(dispatch) {
    dispatch(request());

    return new Promise((resolve, reject) => {
      // console.log(`Trying to save Entry #${entry_id}`);
      setTimeout(() => {
        // writingRef.push().set(payload) // firebase
        dispatch(success());
        resolve();
      }, 1000);
    }).then(
        () => {
          toast.success("Entry successfully saved");
        },
        error => {
          dispatch(failure());
          toast.error(`Entry couldn't be saved: ${error}`);
        },
    );
  };

  function request() {
    return { type: editorConstants.SAVE_REQUEST };
  }
  function success() {
    return { type: editorConstants.SAVE_SUCCESS };
  }
  function failure() {
    return { type: editorConstants.SAVE_FAILURE };
  }
}

export function fetch(entry_id) {
  return function(dispatch) {
    dispatch(request());

    return new Promise((resolve, reject) => {
      // console.log(`Trying to save Entry #${entry_id}`);
      setTimeout(() => {
        dispatch(success());
        resolve();
      }, 1000);
    }).then(
        () => {
          toast.success("Entry successfully saved");
        },
        error => {
          dispatch(failure());
          toast.error(`Entry couldn't be saved: ${error}`);
        },
    );
  };

  function request() {
    return { type: editorConstants.SAVE_REQUEST };
  }
  function success() {
    return { type: editorConstants.SAVE_SUCCESS };
  }
  function failure() {
    return { type: editorConstants.SAVE_FAILURE };
  }
}
