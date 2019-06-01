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
  constructor(options = {}) {
    super(options);
    Object.assign(this, {
      id: 'bg_page_0',
      index: 0,
      name: '',
      type: componentTypes.GENERIC,
      childComponents: [],
      width: 30,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    }, options);
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const GenericWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  position: relative;
  border: 2px dotted gray;
  background-color: ${props => props.backgroundColor};
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

  componentDidMount() {
    this.props.updateState(this.props.genericComponent.id);
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
    updateState: PropTypes.func,
  };

  changeBorder = (clientOffset) => {
    const {isOver, canDrop} = this.props;
    this.setState({
      borderHighlight: calcWhichBorder(clientOffset, this.node, isOver,
          canDrop),
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.borderHighlight !== nextState.borderHighlight ||
        this.props.isOver !== nextProps.isOver ||
        this.props.genericComponent !== nextProps.genericComponent ||
        this.props.isDragging !== nextProps.isDragging;
  }

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
      updateState,
    } = this.props;
    const {borderHighlight} = this.state;

    if (type === componentTypes.CONTAINER) {
      return (
          <ContainerComponent container={this.props.genericComponent}
                              move={move} updateState={updateState}
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
          {id}
        </GenericWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(GenericComponent);
export {connectedComponent as GenericComponent};
