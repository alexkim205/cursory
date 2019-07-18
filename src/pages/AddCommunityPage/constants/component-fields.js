import {
  bgMutableFields,
  containerMutableFields, containerWidthMutableFields,
  genericMutableFields, pageMutableFields,
} from '../components/Fields';
import {componentTypes} from './component-types';

export const componentFields = {
  [componentTypes.GENERIC]: genericMutableFields,
  [componentTypes.CONTAINER]: containerMutableFields,
  [componentTypes.CONTAINER_ITEM]: containerWidthMutableFields,
  [componentTypes.BACKGROUND]: bgMutableFields,
  [componentTypes.PAGE]: pageMutableFields,

  [componentTypes.FEED]: genericMutableFields,
  [componentTypes.STATISTICS]: genericMutableFields,
  [componentTypes.RULES]: genericMutableFields,
  [componentTypes.TEXT]: genericMutableFields,
  [componentTypes.FORMS]: genericMutableFields,
  [componentTypes.LINKS]: genericMutableFields,
  [componentTypes.ICONS]: genericMutableFields,
  [componentTypes.IMAGE]: genericMutableFields,
  [componentTypes.VIDEO]: genericMutableFields,
  [componentTypes.GALLERY]: genericMutableFields,
  [componentTypes.WIDGET]: genericMutableFields,
  [componentTypes.EMBED]: genericMutableFields,
  [componentTypes.SEARCH_BAR]: genericMutableFields,
  [componentTypes.DIVIDER]: genericMutableFields,
};
