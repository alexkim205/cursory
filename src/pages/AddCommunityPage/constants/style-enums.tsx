export enum Directions {
  Columns,
  Rows,
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

export enum BorderHighlight {
  Top,
  Right,
  Bottom,
  Left,
  Center,
  None,
}

export const borderHighlightStyle = (
    position: BorderHighlight, isOver: boolean) => {

  const borderWidth = 10;
  const base = `border: 2px dotted gray;`;
  if (!isOver) {return base;}
  const pseudoBorder = (dir: string) => `
    box-shadow: inset ${dir} 0 -5px orange; // 4th parameter is spread(perspective)
  `;
  switch (position) {
    case BorderHighlight.Top:
      return base + pseudoBorder(`0 ${borderWidth}px`);
    case BorderHighlight.Right:
      return base + pseudoBorder(`-${borderWidth}px 0`);
    case BorderHighlight.Bottom:
      return base + pseudoBorder(`0 -${borderWidth}px`);
    case BorderHighlight.Left:
      return base + pseudoBorder(`${borderWidth}px 0`);
    case BorderHighlight.Center:
      return base + `
        box-shadow: 
          inset  ${borderWidth}px 0 0 -5px orange,
          inset -${borderWidth}px 0 0 -5px orange,
          inset 0  ${borderWidth}px 0 -5px orange,
          inset 0 -${borderWidth}px 0 -5px orange;
      `;
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
