import {Alignments, Directions} from '../constants/style-enums';

export const FieldTypes = {
  SLIDER: 'SLIDER',
  SELECT: 'SELECT',
  TEXT: 'TEXT',
  COLOR: 'COLOR',
};

export class SliderDescription {
  constructor(options = {}) {
    Object.assign(this, {
      key: '',
      type: 'SLIDER',
      bounds: [0, 100, 1],// [start, end, increment]
      realBounds: [0, 100],
      units: 'px',
    }, options);
  }
}

export class SelectDescription {
  constructor(options = {}) {
    Object.assign(this, {
      key: '',
      type: 'SELECT',
      options: [],
      enums: [],
    }, options);
  }
}

export class TextDescription {
  constructor(options = {}) {
    Object.assign(this, {
      key: '',
      type: 'TEXT',
    }, options);
  }
}

export class ColorDescription {
  constructor(options = {}) {
    Object.assign(this, {
      key: '',
      type: 'COLOR',
    }, options);
  }
}

const
    backgroundColorDescriptor = new ColorDescription({key: 'backgroundColor'}),
    widthDescriptor = new SliderDescription(
        {key: 'width', bounds: [15, 100, 1], realBounds: [5, 100], units: '%'}),
    heightDescriptor = new SliderDescription(
        {key: 'height', bounds: [15, 100, 1], realBounds: [30, 500]}),
    paddingVerticalDescriptor = new SliderDescription(
        {key: 'paddingVertical', bounds: [0, 12, 1], realBounds: [0, 250]}),
    paddingHorizontalDescriptor = new SliderDescription(
        {key: 'paddingHorizontal', bounds: [0, 6, 1], realBounds: [0, 125]}),
    marginTopDescriptor = new SliderDescription(
        {key: 'marginTop', bounds: [0, 12, 1], realBounds: [0, 250]}),
    marginBottomDescriptor = new SliderDescription(
        {key: 'marginBottom', bounds: [0, 12, 1], realBounds: [0, 250]}),
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
        Alignments.SpaceBetween],
    });

export const bgMutableFields = [
  {
    name: 'Style', // section
    subsections: [
      { // subsection
        name: 'Background Color',
        descriptor: backgroundColorDescriptor,
      },
    ],
  },
];

export const mutableFields = [
  ...bgMutableFields,
  {
    name: 'Dimensions',
    subsections: [
      {
        name: 'Width',
        descriptor: widthDescriptor,
      },
      {
        name: 'Height',
        descriptor: heightDescriptor,
      },
      {
        name: 'Padding',
        subsubsections: [
          {
            name: 'Vertical',
            descriptor: paddingVerticalDescriptor,
          },
          {
            name: 'Horizontal',
            descriptor: paddingHorizontalDescriptor,
          },
        ],
      },
      {
        name: 'Margin',
        subsubsections: [
          {
            name: 'Top',
            descriptor: marginTopDescriptor,
          },
          {
            name: 'Bottom',
            descriptor: marginBottomDescriptor,
          },
        ],
      },
    ],
  },
  {
    name: 'Contents',
    subsections: [
      {
        name: 'Orientation',
        descriptor: orientationDescriptor,
      },
      {
        name: 'Alignment',
        descriptor: alignmentDescriptor,
      },
    ],
  },
];
