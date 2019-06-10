export const returnScaled = (descriptor, value) => {
  // Map from bounds to real bounds
  const { bounds, realBounds, units } = descriptor;
  const realRange = realBounds[1] - realBounds[0];
  const range = bounds[1] - bounds[0];
  const scale = realRange / range;
  const boundedValue = getBoundedValue(bounds, value);
  // console.log("scale", scale);
  // console.log("value", value, "bounded value", getBoundedValue(bounds, value));
  // console.log("final value", boundedValue * scale + realBounds[0]);
  return `${boundedValue * scale + realBounds[0]}${units}`;
};

const getBoundedValue = (bounds, value) => {
  if (value > bounds[1]) return bounds[1];
  if (value < bounds[0]) return bounds[0];
  return value;
};

const getMinConstraint = value => {};
