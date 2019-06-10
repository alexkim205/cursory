import {
  backgroundColorDescriptor,
  widthDescriptor,
  heightDescriptor,
  paddingHorizontalDescriptor,
  paddingVerticalDescriptor,
  marginBottomDescriptor,
  marginTopDescriptor,
  orientationDescriptor,
  alignmentDescriptor
} from '../components'
import { returnScaled } from '../helpers'

export enum Directions {
  Columns,
  Rows,
  Grid,
  Default,
}

export const directionStyle = (direction: any) => {
  const dirnumber: number = typeof (direction) === 'number' ? direction : parseInt(direction)
  switch (dirnumber) {
    case Directions.Columns:
      console.log("COLUMNS")
      return 'flex-direction: row;';
    case Directions.Rows:
      console.log("ROWS")
      return 'flex-direction: column;';
    case Directions.Default:
      console.log("DEFAULT")
      return 'flex-direction: auto;';
    default:
      console.log("catch")
  }
};

export enum Alignments {
  Center,
  Left,
  Right,
  SpaceBetween,
  Auto,
}

export const alignmentStyle = (alignment: Alignments) => {
  const alnumber: number = typeof (alignment) === 'number' ? alignment : parseInt(alignment)
  switch (alnumber) {
    case Alignments.Center:
      return 'align-items: center; justify-content: center;';
    case Alignments.Left:
      return 'align-items: flex-start; justify-content: flex-start;';
    case Alignments.Right:
      return 'align-items: flex-end; justify-content: flex-end;';
    case Alignments.SpaceBetween:
      return 'align-items: space-between; justify-content: space-between;';
    case Alignments.Auto:
      return 'align-items: auto; justify-content: auto;';
  }
};

export enum Positions {
  Center,
  Left,
  Right,
}

export const positionStyle = (position: Positions) => {
  const posnumber: number = typeof (position) === 'number' ? position : parseInt(position)
  switch (posnumber) {
    case Positions.Center:
      return 'justify-content: center;';
    case Positions.Left:
      return 'justify-content: flex-start;';
    case Positions.Right:
      return 'justify-content: flex-end;';
  }
};

export enum BorderHighlight {
  Top,
  Right,
  Bottom,
  Left,
  Center,
  None,
}

// using overlays instead of box shadows; although box shadows kind of look dope
// export const borderHighlightStyle = (
//     position: BorderHighlight, isOver: boolean) => {
//
//   const borderWidth = 5;
//   const base = `
//     // transition: 0.1s box-shadow;
//     border: 2px dotted gray;
//
//     .overlay-border {
//       opacity: 0;
//       position: absolute;
//       background-color: orange;
//       // transition: 0.2s opacity;
//       // z-index: 10;
//     }
//
//   `;
//   if (!isOver) {return base;}
//   const pseudoBorder = (css: string) => `
//     .overlay-border {
//       ${css}
//       opacity: 1;
//     }
//   `;
//   switch (position) {
//     case BorderHighlight.Top:
//       return base + pseudoBorder(`width:100%;height:${borderWidth}px;top:0;left:0;`);
//     case BorderHighlight.Right:
//       return base + pseudoBorder(`height:100%;width:${borderWidth}px;top:0;right:0;`);
//     case BorderHighlight.Bottom:
//       return base + pseudoBorder(`width:100%;height:${borderWidth}px;bottom:0;left:0;`);
//     case BorderHighlight.Left:
//       return base + pseudoBorder(`height:100%;width:${borderWidth}px;top:0;left:0;`);
//     case BorderHighlight.Center:
//       return base + pseudoBorder(``)
//     case BorderHighlight.None:
//       return base;
//   }
// };

export const borderHighlightStyle = (
  position: BorderHighlight, isOver: boolean) => {

  const bw = 8;
  const base = `
    border: 2px solid transparent;
  `;
  if (!isOver) { return base; }
  const pseudoBorder = (css: string) => `
    box-shadow: inset ${css} lightblue;
  `;
  switch (position) {
    case BorderHighlight.Top:
      return base + pseudoBorder(`0 ${bw}px 0 0`);
    case BorderHighlight.Right:
      return base + pseudoBorder(`-${bw}px 0 0 0`);
    case BorderHighlight.Bottom:
      return base + pseudoBorder(`0 -${bw}px 0 0`);
    case BorderHighlight.Left:
      return base + pseudoBorder(`${bw}px 0 0 0`);
    case BorderHighlight.Center:
      return base + pseudoBorder(`0 0 0 ${bw}px`);
    case BorderHighlight.None:
      return base;
  }
};

export const transitionStyle = () =>
  `
    transition-property: box-shadow, background-color, border;
    transition-duration: .2s;
    `;

export const draggingDisableStyle = (isDragging: boolean) => {
  if (isDragging) {
    return `
    background-color: gray;
    & * {
      background-color: gray;
      visibility: hidden;
    }
    `;
  }
};

export const hoverSelectStyle = (active: boolean) => {
  return `
  &:hover {
    cursor: pointer;
    border: 2px ${active ? `solid #000080` : `dotted lightgray`};
  }
  ${active ? `border: 2px solid #000080 !important;` : ``}
 `;
};

export const widthStyle = (width: number) => {
  return `width: ${returnScaled(widthDescriptor, width)};`;
};

export const heightStyle = (height: number) => {
  return `height: ${returnScaled(heightDescriptor, height)};`;
};

export const paddingStyle = (
  paddingVertical: number, paddingHorizontal: number) => {
  return `padding: ${returnScaled(paddingVerticalDescriptor, paddingVertical)} ${returnScaled(paddingHorizontalDescriptor, paddingHorizontal)};`;
};

export const marginStyle = (marginTop: number, marginBottom: number) => {
  return `margin: ${returnScaled(marginTopDescriptor, marginTop)} 0 ${returnScaled(marginBottomDescriptor, marginBottom)} 0;`;
};
