import React from "react";
import { GenericHOC, GenericClass } from "./GenericHOC";

const ImageComponent = props => <div>Image!</div>;
const connectedComponent = GenericHOC(ImageComponent);
export { connectedComponent as ImageComponent };
