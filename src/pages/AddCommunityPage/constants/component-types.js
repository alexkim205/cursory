import {
  bgMutableFields,
  containerWidthMutableFields,
  genericMutableFields,
  pageMutableFields,
  containerMutableFields,
} from "../components";

export const componentTypes = {
  GENERIC: "GENERIC",
  CONTAINER: "CONTAINER",
  CONTAINER_ITEM: "CONTAINER ITEM",
  BACKGROUND: "BACKGROUND",
  PAGE: "PAGE",
};
// swaps keys and values of componentTypes
const objectFlip = obj => {
  const ret = {};
  Object.keys(obj).forEach(key => {
    ret[obj[key]] = key;
  });
  return ret;
};
export const componentNames = objectFlip(componentTypes);

export const componentFields = {
  [componentTypes.GENERIC]: genericMutableFields,
  [componentTypes.CONTAINER]: containerMutableFields,
  [componentTypes.CONTAINER_ITEM]: containerWidthMutableFields,
  [componentTypes.BACKGROUND]: bgMutableFields,
  [componentTypes.PAGE]: pageMutableFields,
};
