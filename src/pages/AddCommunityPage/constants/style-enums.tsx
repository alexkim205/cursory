export enum Directions {
  Columns,
  Rows,
  Default,
}

export enum Alignments {
  Center,
  Left,
  Right,
  SpaceBetween,
  Auto,
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
