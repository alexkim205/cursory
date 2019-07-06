import {
  bgMutableFields,
  containerWidthMutableFields,
  genericMutableFields,
  pageMutableFields,
  containerMutableFields,
} from '../components';

export const componentTypes = {
  GENERIC: 'GENERIC',
  CONTAINER: 'CONTAINER',
  CONTAINER_ITEM: 'CONTAINER ITEM',
  BACKGROUND: 'BACKGROUND',
  PAGE: 'PAGE',

  // ADDABLES
  FEED: 'FEED',
  STATISTICS: 'STATISTICS',
  RULES: 'RULES',
  TEXT: 'TEXT',
  FORMS: 'FORMS',
  LINKS: 'LINKS',
  ICONS: 'ICONS',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  GALLERY: 'GALLERY',
  WIDGET: 'WIDGET',
  EMBED: 'EMBED',
  SEARCH_BAR: 'SEARCH_BAR',
  DIVIDER: 'DIVIDER',
};

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
