import {idToPath} from '../../helpers';

// Update component attributes

export const updateAttributes = (e, componentId, attrName, attrValue) => {
  e.stopPropagation();
  let {builderState} = this.state;

  // let componentState = fromJS(
  //     JSON.parse(JSON.stringify(this.state.builderState)),
  // );
  const path = idToPath(componentId);

  builderState = builderState.setIn(path.concat(attrName), attrValue);
  this.setState({builderState});
};
