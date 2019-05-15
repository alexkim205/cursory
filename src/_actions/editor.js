import { editorConstants } from "../_constants";
// import {writingRef} from '../components/Firebase/firebase';
import { toast } from "react-toastify";

export const editorActions = {
  save,
  discard,
  fetch,
};

export function discard(entry_id, payload) {
  return function(dispatch) {
    dispatch(request());

    return new Promise((resolve) => {
      // console.log(`Trying to discard Entry #${entry_id}`);
      setTimeout(() => {
        // writingRef.child(entry_id).remove() // firebase
        dispatch(success());
        resolve();
      }, 1000);
    }).then(
      () => {
        toast.success("Entry successfully discarded");
      },
      error => {
        dispatch(failure());
        toast.error(`Entry couldn't be discarded: ${error}`);
      }
    );
  };

  function request() {
    return { type: editorConstants.DISCARD_REQUEST };
  }
  function success() {
    return { type: editorConstants.DISCARD_SUCCESS };
  }
  function failure() {
    return { type: editorConstants.DISCARD_FAILURE };
  }
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
      }
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
        }
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
