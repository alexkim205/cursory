import React from 'react';
import {GenericHOC, GenericClass} from './GenericHOC';
import {componentTypes} from '../../constants/component-types';
import {ImageComponent} from './Image';

const GenericBaseComponent = props => <div></div>;

const GenericComponent = props => {
  const type = props.genericComponent.type;

  if (type === componentTypes.GENERIC || type === componentTypes.CONTAINER) {
    const ConnectedComponent = GenericHOC(GenericBaseComponent);
    return (
        <ConnectedComponent {...props}/>
    );
  } else if (type === componentTypes.IMAGE) {
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
