import styled from "styled-components";
import {
  hoverSelectStyle,
  positionStyle,
  transitionStyle,
} from "../../constants/style-enums";

export const BackgroundWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width:100%;
  height: 100%;
  border: 2px solid transparent;
  
  // Transitions
  ${transitionStyle()}
  
  // Hover & Active
  ${props => hoverSelectStyle(props.active)}
  
  // Position of Page
  ${props => positionStyle(props.position)}
`;
