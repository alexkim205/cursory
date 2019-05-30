import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {ContainerClass, ContainerComponent} from './Container';

import {DragSource, DropTarget} from 'react-dnd';

import {
  Alignments, alignmentStyle, borderHighlightStyle,
  Directions, directionStyle, draggingDisableStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';

import {StyledClass} from './StyledClass';
import PropTypes from 'prop-types';
import {
  connectAsTarget,
  connectAsTargetAndSource,
} from '../draggable-droppable';
import {calcWhichBorder} from '../draggable-droppable/withBorderHighlights';

export class GenericClass extends StyledClass {
  constructor(
      id = 'bg_page_0',
      index = 0,
      name = '',
      type = componentTypes.GENERIC,
      childComponents = [],
      width = 30,
      paddingVertical = 10,
      paddingHorizontal = 10,
      marginBottom = 20,
      ...arg
  ) {
    super(...arg);

    this.id = id;
    this.index = index;
    this.name = name;
    this.type = type;
    this.childComponents = childComponents;

    this.width = width;
    this.paddingVertical = paddingVertical;
    this.paddingHorizontal = paddingHorizontal;
    this.marginBottom = marginBottom;
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const GenericWrapper = styled.div`
    display: flex;
  box-sizing: border-box;
  
  background-color: ${props => props.backgroundColor};
  // background-color: green;
  border: 2px dotted gray;
  min-height: 100px;  
  
  display: flex;
  box-sizing: border-box;

  // Alignment
  ${props => alignmentStyle(props.alignment)}
  
  // Direction
  ${props => directionStyle(props.direction)}
  
  // Width
  ${props => widthStyle(props.width)}
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
  
  // Border Highlight
  ${props => borderHighlightStyle(props.borderHighlight, props.isOver)}
  
  // If Dragging disable
  // ${props => draggingDisableStyle(props.isDragging)}
`;

class GenericComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {borderHighlight: null};

  static propTypes = {
    genericComponent: PropTypes.oneOfType([
      PropTypes.instanceOf(GenericClass),
      PropTypes.instanceOf(ContainerClass),
      PropTypes.object,
    ]),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    clientOffset: PropTypes.object,
    move: PropTypes.func,
  };

  changeBorder = (clientOffset) => {
    const {isOver, canDrop} = this.props;
    this.setState({
      borderHighlight: calcWhichBorder(clientOffset, this.node, isOver,
          canDrop),
    });
  };

  render() {
    const {id, index, childComponents, type, name, ...otherProps} = this.props.genericComponent;
    const {
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      isDragging,
      isOver,
      canDrop,
      clientOffset,
      move,
    } = this.props;
    const {borderHighlight} = this.state;

    if (type === componentTypes.CONTAINER) {
      return (
          <ContainerComponent container={this.props.genericComponent}
                              move={move}
          />
      );
    }

    // Else, assume generic component with one element
    // Use switch statement when I add more element types
    return (
        <GenericWrapper {...otherProps}
                        borderHighlight={borderHighlight}
                        isOver={isOver}
                        isDragging={isDragging}
                        ref={instance => {
                          this.node.current = instance;
                          return connectDropTarget(
                              connectDragPreview(
                                  connectDragSource(instance)));
                        }}
        >
          {/*{id}*/}
        </GenericWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(GenericComponent);
export {connectedComponent as GenericComponent};
