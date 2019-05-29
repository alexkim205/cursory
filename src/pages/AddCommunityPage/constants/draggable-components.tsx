import {GenericComponentInterface} from '../components/GenericComponent';
import {componentTypes} from './component-types';

export const DraggableComponents: GenericComponentInterface[] = [
  {
    name: 'Generic',
    type: componentTypes.GENERIC,
  },
  {
    name: 'Container',
    type: componentTypes.CONTAINER,
  },
];
