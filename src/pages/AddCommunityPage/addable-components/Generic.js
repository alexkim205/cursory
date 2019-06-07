import React from "react";
import { GenericHOC } from "./GenericHOC";

const GenericComponent = props => <div>Test</div>;
const connectedComponent = GenericHOC(GenericComponent);
export { connectedComponent as GenericComponent };
