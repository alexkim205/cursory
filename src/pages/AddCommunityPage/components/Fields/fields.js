import {
  alignmentDescriptor,
  backgroundColorDescriptor,
  heightDescriptor,
  marginBottomDescriptor,
  marginTopDescriptor,
  orientationDescriptor,
  paddingHorizontalDescriptor,
  paddingVerticalDescriptor,
  widthDescriptor,
} from "./descriptors";
import { fromJS } from "immutable";

export {
  bgMutableFields,
  genericMutableFields,
  containerWidthMutableFields,
  pageMutableFields,
};

const baseMutableFields = fromJS([
  {
    name: "Style", // section
    subsections: [
      {
        // subsection
        name: "Background Color",
        descriptor: backgroundColorDescriptor,
      },
    ],
  },
  {
    name: "Dimensions",
    subsections: [
      {
        name: "Width",
        descriptor: widthDescriptor,
      },
      {
        name: "Height",
        descriptor: heightDescriptor,
      },
      {
        name: "Padding",
        subsubsections: [
          {
            name: "Vertical",
            descriptor: paddingVerticalDescriptor,
          },
          {
            name: "Horizontal",
            descriptor: paddingHorizontalDescriptor,
          },
        ],
      },
      {
        name: "Margin",
        subsubsections: [
          {
            name: "Top",
            descriptor: marginTopDescriptor,
          },
          {
            name: "Bottom",
            descriptor: marginBottomDescriptor,
          },
        ],
      },
    ],
  },
  {
    name: "Contents",
    subsections: [
      {
        name: "Orientation",
        descriptor: orientationDescriptor,
      },
      {
        name: "Alignment",
        descriptor: alignmentDescriptor,
      },
    ],
  },
]);

const bgMutableFields = baseMutableFields.slice(0, 1).toJS();
const genericMutableFields = baseMutableFields.toJS();

// remove width
const containerWidthMutableFields = baseMutableFields
  .updateIn([1, "subsections"], subsection => subsection.shift())
  .toJS();

// remove height
const pageMutableFields = baseMutableFields
  .updateIn([1, "subsections"], subsection => subsection.splice(1, 1))
  .toJS();
