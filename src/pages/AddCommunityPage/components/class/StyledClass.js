import { componentTypes } from "../../constants/component-types";
import { Alignments, Directions } from "../../constants/style-constants";
import { SelectDescription, SliderDescription } from "../Fields";

export class StyledClass {
  constructor(options = {}) {
    Object.assign(
      this,
      {
        backgroundColor: "#FFFFFF",
        alignment: Alignments.Center,
        width: 100,
        height: 100,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginTop: 0,
        marginBottom: 0,
        active: false,
      },
      options,
    );
  }
}
