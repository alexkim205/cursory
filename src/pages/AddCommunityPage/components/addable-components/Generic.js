import React from 'react';
import {GenericHOC, GenericClass} from './GenericHOC';
import {componentTypes} from '../../constants/component-types';
import {ImageComponent} from './Image';
import {ContainerComponent} from './Container';

const GenericBaseComponent = props => <div></div>;

const GenericComponent = props => {
  const type = props.genericComponent.get('type');

  if (type === componentTypes.GENERIC) {
    const ConnectedGenericComponent = GenericHOC(GenericBaseComponent);
    return (
        <ConnectedGenericComponent {...props}/>
    );
  } else if (type === componentTypes.CONTAINER) {
    return (
        <ContainerComponent
            container={props.genericComponent}
        />
    );
  } else if (type === componentTypes.IMAGE) {
    const ConnectedImageComponent = GenericHOC(ImageComponent);
    return (
        <ConnectedImageComponent {...props}/>
    );
  } else {
    return (
        <div></div>
    );
  }
};
// const connectedComponent = GenericHOC(GenericComponent);
// export { connectedComponent as GenericComponent };

export {GenericComponent};
