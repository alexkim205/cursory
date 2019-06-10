import styled from "styled-components";
import {
  alignmentStyle,
  borderHighlightStyle,
  directionStyle,
  marginStyle,
  paddingStyle,
  widthStyle,
  transitionStyle,
  draggingDisableStyle,
  hoverSelectStyle,
  heightStyle,
} from "../../constants/style-enums";

export const PageWrapper = styled.div`
    background-color: ${props => props.backgroundColor};
    background-color: pink;

    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    border: 2px solid transparent;

    // TODO: Implement style later

    // Transitions
    ${transitionStyle()}

    // Hover & Active
    ${props => hoverSelectStyle(props.active)}

    // Alignment
    ${props => alignmentStyle(props.alignment)}

    // Width
    ${props => widthStyle(props.width)}

    // Padding
    ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
    // Margin
    ${props => marginStyle(props.marginTop, props.marginBottom)}
`;
