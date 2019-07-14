import {combineReducers} from 'redux';
import {editor} from './editor';
import {builderState} from './builder-state';

export default combineReducers({
  builderState,
  editor,
});
