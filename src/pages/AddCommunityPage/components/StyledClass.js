import {componentTypes} from '../constants/component-types';
import {Alignments} from '../constants/style-enums';

export class StyledClass {
  constructor(options = {}) {
    Object.assign(this, {
      backgroundColor: '#FFFFFF',
      alignment: Alignments.Center,
      width: 100,
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginTop: 0,
      marginBottom: 0,
    }, options);
  }
}
