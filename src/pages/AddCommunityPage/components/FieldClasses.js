import {Alignments, Directions} from '../constants/style-enums';

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

export const mutableFields = {
  dimensions: {
    width: new SliderDescription(
        {key: 'width', bounds: [15, 100, 1], realBounds: [5, 100], units: '%'}),
    height: new SliderDescription(
        {key: 'height', bounds: [15, 100, 1], realBounds: [30, 500]}),
    padding: {
      vertical: new SliderDescription(
          {key: 'paddingVertical', bounds: [0, 12, 1], realBounds: [0, 250]}),
      horizontal: new SliderDescription(
          {key: 'paddingHorizontal', bounds: [0, 6, 1], realBounds: [0, 125]}),
    },
    margins: {
      top: new SliderDescription(
          {key: 'marginTop', bounds: [0, 12, 1], realBounds: [0, 250]}),
      bottom: new SliderDescription(
          {key: 'marginBottom', bounds: [0, 12, 1], realBounds: [0, 250]}),
    },
  },
  contents: {
    orientation: new SelectDescription({
      key: 'direction',
      options: ['Column', 'Row', 'Grid'],
      enums: [Directions.Columns, Directions.Rows, Directions.Grid],
    }),
    alignment: new SelectDescription({
      key: 'alignment',
      options: ['Left', 'Center', 'Right', 'Spaced'],
      enums: [
        Alignments.Left,
        Alignments.Center,
        Alignments.Right,
        Alignments.SpaceBetween],
    }),
  },
};

export const bgMutableFields = {
  style: {
    backgroundColor: new ColorDescription({key: 'backgroundColor'}),
  },
};
