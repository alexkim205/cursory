import {fromJS} from 'immutable';

export const jsonifyState = (builderState) => {
  return fromJS(JSON.parse(JSON.stringify(builderState)));
};
