export enum Directions {
  Columns,
  Rows,
  Grid,
  Default,
}

export const directionStyle = (direction: Directions) => {
  switch (direction) {
    case Directions.Columns:
      return 'flex-direction: row;';
    case Directions.Rows:
      return 'flex-direction: column;';
    case Directions.Default:
      return 'flex-direction: auto;';
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
  switch (alignment) {
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
  switch (position) {
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
    transition: 0.2s box-shadow linear;
    border: 2px dotted gray;
  `;
  if (!isOver) {return base;}
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
      return base + pseudoBorder(`0 0 0 ${bw}px`)
    case BorderHighlight.None:
      return base;
  }
};

export const draggingDisableStyle = (isDragging: boolean) => {
  if (isDragging) {
    return `
    background-color: gray;
    border: 2px dotted gray;
    & * {
      background-color: gray;
      visibility: hidden;
    }
    `;
  }
};

export const widthStyle = (width: number) => {
  return `width: ${width}%;`;
};

export const paddingStyle = (
    paddingVertical: number, paddingHorizontal: number) => {
  return `padding: ${paddingVertical}px ${paddingHorizontal}px;`;
};

export const marginStyle = (marginTop: number, marginBottom: number) => {
  return `margin: ${marginTop}px 0 ${marginBottom}px 0;`;
};
