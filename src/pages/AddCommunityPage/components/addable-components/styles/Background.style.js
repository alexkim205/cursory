import styled from "styled-components";
import {hoverStyle, activeStyle, positionStyle, transitionStyle} from './base-styles';

export const BackgroundWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  
  // Transitions
  ${transitionStyle()}
  
  // Hover
  ${props => hoverStyle(props.hover)}
 
  // Active
  ${props => activeStyle(props.active)}
  
  // Position of Page
  ${props => positionStyle(props.position)}
`;
