import {fromJS} from 'immutable';

export function jsonify(builderState) {
  return fromJS(JSON.parse(JSON.stringify(builderState)));
};
