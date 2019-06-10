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
  hoverSelectStyle,
} from '../../constants/style-enums';

export const ContainerItemWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    position: relative;
    background-color: ${props => props.backgroundColor};
    // min-height: 150px;
    border: 2px solid transparent;

    // Transitions
    ${transitionStyle()}

    // Hover & Active
    ${props => hoverSelectStyle(props.active)}

    // Alignment
    ${props => alignmentStyle(props.alignment)}

    // Direction
    ${props => directionStyle(props.direction)}

    // Width
    ${props => widthStyle(props.width)}

    // Height
    ${props => heightStyle(props.height)}

    // Padding
    ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
    // Margin
    ${props => marginStyle(props.marginTop, props.marginBottom)}

    // Border Highlight
    ${props => borderHighlightStyle(props.borderHighlight, props.isOver)}

    // If Dragging disable
    // ${props => draggingDisableStyle(props.isDragging)}
`;