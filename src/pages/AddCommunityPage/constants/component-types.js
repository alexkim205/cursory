import {bgMutableFields, mutableFields} from '../components';

export const componentTypes = {
  GENERIC: 'GENERIC',
  CONTAINER: 'CONTAINER',
  CONTAINER_ITEM: 'CONTAINER-ITEM',
  BACKGROUND: 'BACKGROUND',
  PAGE: 'PAGE',
};

export const componentFields = {
  [componentTypes.GENERIC]: mutableFields,
  [componentTypes.CONTAINER]: mutableFields,
  [componentTypes.CONTAINER_ITEM]: mutableFields,
  [componentTypes.BACKGROUND]: bgMutableFields,
  [componentTypes.PAGE]: mutableFields,
};
