import { Alignments, Directions } from "../../constants/style-enums";

export const FieldTypes = {
  SLIDER: "SLIDER",
  SELECT: "SELECT",
  TEXT: "TEXT",
  COLOR: "COLOR"
};

export class SliderDescription {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        key: "",
        type: "SLIDER",
        bounds: [0, 100, 1], // [start, end, increment]
        realBounds: [0, 100],
        units: "px"
      },
      options
    );
  }
}

export class SelectDescription {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        key: "",
        type: "SELECT",
        options: [],
        enums: []
      },
      options
    );
  }
}

export class TextDescription {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        key: "",
        type: "TEXT"
      },
      options
    );
  }
}

export class ColorDescription {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        key: "",
        type: "COLOR"
      },
      options
    );
  }
}

export const backgroundColorDescriptor = new ColorDescription({
    key: "backgroundColor"
  }),
  widthDescriptor = new SliderDescription({
    key: "width",
    bounds: [0, 30, 1],
    realBounds: [5, 100],
    units: "%"
  }),
  heightDescriptor = new SliderDescription({
    key: "height",
    bounds: [0, 30, 1],
    realBounds: [30, 500]
  }),
  paddingVerticalDescriptor = new SliderDescription({
    key: "paddingVertical",
    bounds: [0, 12, 1],
    realBounds: [0, 250]
  }),
  paddingHorizontalDescriptor = new SliderDescription({
    key: "paddingHorizontal",
    bounds: [0, 12, 1],
    realBounds: [0, 600]
  }),
  marginTopDescriptor = new SliderDescription({
    key: "marginTop",
    bounds: [0, 12, 1],
    realBounds: [0, 100]
  }),
  marginBottomDescriptor = new SliderDescription({
    key: "marginBottom",
    bounds: [0, 12, 1],
    realBounds: [0, 100]
  }),
  orientationDescriptor = new SelectDescription({
    key: "direction",
    options: ["Column", "Row", "Grid"],
    enums: [Directions.Columns, Directions.Rows, Directions.Grid]
  }),
  alignmentDescriptor = new SelectDescription({
    key: "alignment",
    options: ["Left", "Center", "Right", "Spaced"],
    enums: [
      Alignments.Left,
      Alignments.Center,
      Alignments.Right,
      Alignments.SpaceBetween
    ]
  });