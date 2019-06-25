import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PoseGroup } from "react-pose";
import onClickOutside from "react-onclickoutside";

import {
  FloatingWidgetWrapper,
  FloatingWidgetDropdownWrapper,
  FloatingWidgetDropdownItemWrapper,
  FloatingWidgetItemWrapper,
} from "./styles/FloatingWidgetStyle";
import { elements } from "./addable-elements";
import { Spacer } from "../../components/Navigation/styles/ProfileBar.style";
import {
  DropdownMenuWrapper,
  DropdownMenuItemWrapper,
} from "../../components/Navigation/Dropdown";

/*
 * Add
 * Background/Page
 * Settings
 */

const connectedItemWrapper = onClickOutside(FloatingWidgetItemWrapper);
connectedItemWrapper.handleClickOutside = () => {
  this.setState({
    dropdownIsActive: false,
  });
};

class FloatingWidget extends React.Component {
  state = { dropdownIsActive: false };
  toggleDropdown = e => {
    // console.log("toggle!");
    this.setState(prevState => ({
      dropdownIsActive: !prevState.dropdownIsActive,
    }));
  };

  render() {
    const { dropdownIsActive } = this.state;

    return (
      <FloatingWidgetWrapper>
        <connectedItemWrapper onClick={this.toggleDropdown}>
          <FontAwesomeIcon icon={["fal", "plus"]} />
        </connectedItemWrapper>
        <PoseGroup>
          {dropdownIsActive && (
            <FloatingWidgetDropdownWrapper key={"dropdown"}>
              <Spacer />
              {elements.map((item, key) => (
                <FloatingWidgetDropdownItemWrapper key={key}>
                  {item.type}
                  <FontAwesomeIcon icon={["fal", item.icon]} />
                </FloatingWidgetDropdownItemWrapper>
              ))}
            </FloatingWidgetDropdownWrapper>
          )}
        </PoseGroup>
        <FloatingWidgetItemWrapper>
          <FontAwesomeIcon icon={["fal", "file-alt"]} />
        </FloatingWidgetItemWrapper>
        <FloatingWidgetItemWrapper>
          <FontAwesomeIcon icon={["fal", "bars"]} />
        </FloatingWidgetItemWrapper>
      </FloatingWidgetWrapper>
    );
  }
}

export { FloatingWidget };
