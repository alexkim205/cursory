import React from 'react';
import {compose} from 'redux';
import styled from 'styled-components';

import {ContainerItemInterface, ContainerItemComponent} from './ContainerItem';
import {GenericComponentInterface} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  BorderHighlight, borderHighlightStyle,
  Directions, directionStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
  transitionStyle, draggingDisableStyle, hoverSelectStyle,
} from '../constants/style-enums';
import {Droppable} from 'react-beautiful-dnd';
import {DroppableArea} from '../components/ContentBuildComponent';
import {StyledClass} from '../components/StyledClass';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import {connectAsTargetAndSource} from '../draggable-droppable';
import {
  calcWhichBorder,
  renderOverlay,
} from '../draggable-droppable/withBorderHighlights';

export class ContainerClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(this, {
      id: 'bg_page_0',
      index: 0,
      name: '',
      type: componentTypes.CONTAINER,
      childComponents: [],
      direction: Directions.Columns,
      alignment: Alignments.SpaceBetween,
      paddingVertical: 40,
      paddingHorizontal: 10,
      marginTop: 20,
      marginBottom: 20,
    }, options);
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const ContainerWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  position: relative;
  height: 100%;
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
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
  
  // Border Highlight
  ${props => borderHighlightStyle(props.borderHighlight, props.isOver)}
  
  // If Dragging disable
  ${props => draggingDisableStyle(props.isDragging)}
`;

class ContainerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {borderHighlight: null};

  static propTypes = {
    container: PropTypes.oneOfType(
        PropTypes.instanceOf(ContainerClass),
        PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    clientOffset: PropTypes.object,
    move: PropTypes.func,
    updateActive: PropTypes.func,
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
        JSON.stringify(this.props.container) !==
        JSON.stringify(nextProps.container) ||
        this.props.isDragging !== nextProps.isDragging;
  }

  render() {
    const {id, index, childComponents, name, type, ...otherProps} = this.props.container;
    const {
      connectDropTarget,
      connectDragSource,
      connectDragPreview,
      isDragging,
      isOver,
      canDrop,
      clientOffset,
      move,
      updateActive,
    } = this.props;
    const {borderHighlight} = this.state;
    const numberOfColumns = childComponents.length;

    return (
        <ContainerWrapper {...otherProps}
                          borderHighlight={borderHighlight}
                          // active={active}
                          isOver={isOver}
                          isDragging={isDragging}
                          onClick={(e)=>updateActive(e, id)}
                          ref={instance => {
                            this.node.current = instance;
                            return connectDropTarget(
                                connectDragPreview(
                                    connectDragSource(instance)));
                          }}>
          {id}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;
            // if direction is columns, divide columns to fit full width, otherwise keep at 100
            newComponent.width = this.props.container.direction ===
            Directions.Columns ? 100 / numberOfColumns : 100;

            return (
                <ContainerItemComponent containerItem={newComponent}
                                        key={key}
                                        move={move}
                                        updateActive={updateActive}
                />
            );
          })}
        </ContainerWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(ContainerComponent);
export {connectedComponent as ContainerComponent};
