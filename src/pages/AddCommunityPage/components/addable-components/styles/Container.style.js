import styled from 'styled-components';
import {
  alignmentStyle,
  borderHighlightStyle,
  directionStyle,
  marginStyle,
  paddingStyle,
  widthStyle,
  heightStyle,
  transitionStyle,
  draggingDisableStyle,
hoverStyle,activeStyle,
  debugStyle
} from './base-styles';

export const ContainerWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  border: 2px solid transparent;
  
  // Transitions
  ${transitionStyle()}
  
  // Hover
  ${props => hoverStyle(props.hover)}
 
  // Active
  ${props => activeStyle(props.active)}
  
  // Alignment
  ${props => alignmentStyle(props.alignment)}
  
  // Direction
  ${props => directionStyle(props.direction)}
  
  // Width
  ${props => widthStyle(props.width)}
  
  // Height
  //${props => heightStyle(props.height)}
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
  
  // Border Highlight
  ${props => borderHighlightStyle(props.borderHighlight, props.isOver)}
  
  // If Dragging disable
  ${props => draggingDisableStyle(props.isDragging)}
  
  // DEBUG
  ${props => debugStyle()}
`;
