import {Alignments, Directions} from '../../constants/style-constants';

export const FieldTypes = {
  SLIDER: 'SLIDER',
  SELECT: 'SELECT',
  TEXT: 'TEXT',
  COLOR: 'COLOR',
  COLLAPSIBLE: 'COLLAPSIBLE',
};

export class SliderDescription {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          key: '',
          type: 'SLIDER',
          bounds: [0, 100, 1], // [start, end, increment]
          realBounds: [0, 100],
          units: 'px',
        },
        options,
    );
  }
}

export class SelectDescription {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          key: '',
          type: 'SELECT',
          options: [],
          enums: [],
        },
        options,
    );
  }
}

export class TextDescription {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          key: '',
          type: 'TEXT',
        },
        options,
    );
  }
}

export class ColorDescription {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          key: '',
          type: 'COLOR',
        },
        options,
    );
  }
}

export class CollapsibleDescription {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          key: '',
          type: 'COLLAPSIBLE',
        },
        options,
    );
  }
}

export const backgroundColorDescriptor = new ColorDescription({
      key: 'backgroundColor',
    }),
    widthDescriptor = new SliderDescription({
      key: 'width',
      bounds: [25, 100, 5],
      realBounds: [25, 100],
      units: '%',
    }),
    columnWidthDescriptor = new SliderDescription({
      key: 'width',
      bounds: [25, 100, 1],
      realBounds: [25, 100],
      units: '%',
    }),
    heightDescriptor = new SliderDescription({
      key: 'height',
      bounds: [25, 100, 5],
      realBounds: [25, 500],
      units: 'px',
    }),
    paddingVerticalDescriptor = new SliderDescription({
      key: 'paddingVertical',
      bounds: [0, 12, 1],
      realBounds: [0, 250],
    }),
    paddingHorizontalDescriptor = new SliderDescription({
      key: 'paddingHorizontal',
      bounds: [0, 12, 1],
      realBounds: [0, 600],
    }),
    marginTopDescriptor = new SliderDescription({
      key: 'marginTop',
      bounds: [0, 12, 1],
      realBounds: [0, 100],
    }),
    marginBottomDescriptor = new SliderDescription({
      key: 'marginBottom',
      bounds: [0, 12, 1],
      realBounds: [0, 100],
    }),
    orientationDescriptor = new SelectDescription({
      key: 'direction',
      options: ['Column', 'Row', 'Grid'],
      enums: [Directions.Columns, Directions.Rows, Directions.Grid],
    }),
    alignmentDescriptor = new SelectDescription({
      key: 'alignment',
      options: ['Left', 'Center', 'Right', 'Spaced'],
      enums: [
        Alignments.Left,
        Alignments.Center,
        Alignments.Right,
        Alignments.SpaceBetween,
      ],
    }),
    columnsDescriptor = new CollapsibleDescription({
      key: 'childComponents',
      component: null, // container component
      bounds: [25, 100, 1],
      realBounds: [25, 100],
      units: '%',
    });
