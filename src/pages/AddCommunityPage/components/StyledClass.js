import {componentTypes} from '../constants/component-types';
import {Alignments} from '../constants/style-enums';

export class StyledClass {
  constructor(
      backgroundColor = '#FFFFFF',
      alignment = Alignments.Center,
      width = 100,
      paddingVertical = 0,
      paddingHorizontal = 0,
      marginTop = 0,
      marginBottom = 0,
  ) {
    this.backgroundColor = backgroundColor;
    this.alignment = alignment;
    this.width = width;
    this.paddingVertical = paddingVertical;
    this.paddingHorizontal = paddingHorizontal;
    this.marginTop = marginTop;
    this.marginBottom = marginBottom;
  }
}
