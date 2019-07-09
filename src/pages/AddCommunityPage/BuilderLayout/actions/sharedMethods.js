import {fromJS} from 'immutable';

export function jsonify(builderState) {
  return fromJS(JSON.parse(JSON.stringify(builderState)));
}

export function findInState(builderState, conditionCallback) {

  const root = builderState;

  // Handles base case (background -> page)
  if (conditionCallback(root)) {
    return root;
  }

  // Iterative traversal of nested Map Object (ImmutableJS)
  let toVisit = [root.get('page')];
  while (toVisit.length !== 0) {
    const current = toVisit.pop();

    if (current) {
      if (conditionCallback(current)) {
        return current.get('id');
      }

      // add all childComponents to visit queue
      current.get('childComponents').valueSeq().forEach(v =>
          toVisit.push(v),
      );
    }
  }

  return null;
}
