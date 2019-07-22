import React from 'react';
import {GenericHOC, GenericClass} from './GenericHOC';
import {componentTypes} from '../../constants/component-types';
import {ImageComponent} from './Image';

const GenericBaseComponent = props => <div></div>;

const GenericComponent = props => {
  const type = props.genericComponent.get('type');
  // console.log("generic component", props.genericComponent)

  if (type === componentTypes.GENERIC || type === componentTypes.CONTAINER) {
    const ConnectedComponent = GenericHOC(GenericBaseComponent);
    // console.log("generic base component", props.genericComponent.toJSON())
    return (
        <ConnectedComponent {...props}/>
    );
  } else if (type === componentTypes.IMAGE) {
    // console.log("generic image component", props.genericComponent.toJSON())
    return (
        <ImageComponent {...props}/>
    );
  } else {
    return (
        <div></div>
    )
  }
};
// const connectedComponent = GenericHOC(GenericComponent);
// export { connectedComponent as GenericComponent };

export {GenericComponent};
