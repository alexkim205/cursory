// import {componentTypes} from '../../constants/component-types';
// weird bug that imports constants in wrong order
// ReferenceError: Cannot access 'componentTypes' before initialization

const componentTypes = {
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

export const addableElements = [
  {
    type: componentTypes.FEED,
    name: 'feed',
    icon: 'rss',
    description: 'Show selected list of posts',
  },
  {
    type: componentTypes.STATISTICS,
    name: 'statistics',
    icon: 'newspaper',
    description: 'Your community\'s statistics',
  },
  {
    type: componentTypes.RULES,
    name: 'rules',
    icon: 'ruler-horizontal',
    description: 'Your community\'s rules or guidelines',
  },
  {
    type: componentTypes.TEXT,
    name: 'text',
    icon: 'font',
    description: 'Text box',
  },
  {
    type: componentTypes.FORMS,
    name: 'forms',
    icon: 'pencil-alt',
    description: 'Add a form',
  },
  {
    type: componentTypes.LINKS,
    name: 'links',
    icon: 'link',
    description: 'Add a link',
  },
  {
    type: componentTypes.ICONS,
    name: 'icons',
    icon: 'apple-alt',
    description: 'Add icon(s)',
  },
  {
    type: componentTypes.CONTAINER,
    name: 'container',
    icon: 'th',
    description: 'Add a container with custom columns or rows',
  },
  {
    type: componentTypes.IMAGE,
    name: 'image',
    icon: 'image',
    description: 'Add an image',
  },
  {
    type: componentTypes.VIDEO,
    name: 'video',
    icon: 'video',
    description: 'Add a video',
  },
  {
    type: componentTypes.GALLERY,
    name: 'gallery',
    icon: 'camera-retro',
    description: 'Gallery of photos',
  },
  {
    type: componentTypes.WIDGET,
    name: 'widget',
    icon: 'pepper-hot',
    description: 'Embed a widget',
  },
  {
    type: componentTypes.EMBED,
    name: 'embed',
    icon: 'code',
    description: 'Embed an HTML element',
  },
  {
    type: componentTypes.SEARCH_BAR,
    name: 'search bar',
    icon: 'search',
    description: 'Search bar',
  },
  {
    type: componentTypes.DIVIDER,
    name: 'divider',
    icon: 'grip-lines',
    description: 'Add a horizontal divider',
  },
];
