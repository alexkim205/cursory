import {
  Directions,
  Alignments,
  Positions,
  BorderHighlight,
} from '../../../constants/style-constants';
import {returnScaled} from '../../../helpers';
import {
  columnWidthDescriptor,
  heightDescriptor,
  marginBottomDescriptor,
  marginTopDescriptor,
  paddingHorizontalDescriptor,
  paddingVerticalDescriptor,
  widthDescriptor,
} from '../../Fields';

export const directionStyle = (direction) => {
  const dirnumber = typeof (direction) === 'number' ?
      direction :
      parseInt(direction);
  switch (dirnumber) {
    case Directions.Columns:
      // console.log("COLUMNS")
      return 'flex-direction: row;';
    case Directions.Rows:
      // console.log("ROWS")
      return 'flex-direction: column;';
    case Directions.Default:
      // console.log("DEFAULT")
      return 'flex-direction: auto;';
    default:
      // console.log("catch")
  }
};

export const alignmentStyle = (alignment) => {
  const alnumber = typeof (alignment) === 'number' ?
      alignment :
      parseInt(alignment);
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

export const positionStyle = (position) => {
  const posnumber = typeof (position) === 'number' ?
      position :
      parseInt(position);
  switch (posnumber) {
    case Positions.Center:
      return 'justify-content: center;';
    case Positions.Left:
      return 'justify-content: flex-start;';
    case Positions.Right:
      return 'justify-content: flex-end;';
  }
};

export const borderHighlightStyle = (position, isOver) => {

  const bw = 8;
  const base = `
    border: 2px solid transparent;
  `;
  if (!isOver) {
    return base;
  }
  const pseudoBorder = (css) => `
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
    // transition-property: box-shadow, background-color, border;
    // transition-property: auto;
    // transition-duration: .2s;
    transition: all 0.2s;
    `;

export const draggingDisableStyle = (isDragging) => {
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

export const hoverSelectStyle = (active) => {
  return `
  &:hover {
    cursor: pointer;
    border: 2px ${active ? `solid #000080` : `dotted lightgray`};
  }
  ${active ? `border: 2px solid #000080 !important;` : ``}
 `;
};

export const widthStyle = (width) => {
  return `width: ${width}${columnWidthDescriptor.units};`;
};

export const heightStyle = (height) => {
  return `height: ${returnScaled(heightDescriptor, height)};`;
};

export const paddingStyle = (paddingVertical, paddingHorizontal) => {
  return `padding: ${returnScaled(paddingVerticalDescriptor,
      paddingVertical)} ${returnScaled(paddingHorizontalDescriptor,
      paddingHorizontal)};`;
};

export const marginStyle = (marginTop, marginBottom) => {
  return `margin: ${returnScaled(marginTopDescriptor,
      marginTop)} 0 ${returnScaled(marginBottomDescriptor, marginBottom)} 0;`;
};
