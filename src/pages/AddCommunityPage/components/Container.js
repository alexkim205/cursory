import React from 'react';
import {compose} from 'redux';
import styled from 'styled-components';

import {ContainerItemInterface, ContainerItemComponent} from './ContainerItem';
import {GenericComponentInterface} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  BorderHighlight, borderHighlightStyle,
  Directions, directionStyle, draggingDisableStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';
import {Droppable} from 'react-beautiful-dnd';
import {DroppableArea} from './ContentBuildComponent';
import {StyledClass} from './StyledClass';
import PropTypes from 'prop-types';
import {DragSource, DropTarget} from 'react-dnd';
import {connectAsTargetAndSource} from '../draggable-droppable';
import {
  calcWhichBorder,
  renderOverlay,
} from '../draggable-droppable/withBorderHighlights';

export class ContainerClass extends StyledClass {
  constructor(
      id = 'bg_page_0',
      index = 0,
      name = '',
      type = componentTypes.CONTAINER,
      childComponents = [],
      direction = Directions.Columns,
      alignment = Alignments.SpaceBetween,
      paddingVertical = 40,
      paddingHorizontal = 10,
      marginTop = 20,
      marginBottom = 20,
      ...arg
  ) {
    super(...arg);

    this.id = id;
    this.index = index;
    this.name = name;
    this.type = type;
    this.childComponents = childComponents;

    this.direction = direction;
    this.alignment = alignment;
    this.paddingVertical = paddingVertical;
    this.paddingHorizontal = paddingHorizontal;
    this.marginTop = marginTop;
    this.marginBottom = marginBottom;
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

const ContainerWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  // background-color: red;
  height: 100%;
  border: 2px dotted gray;
  // min-height: 200px;
  
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

  componentDidMount() {
    this.props.updateState(this.props.container.id);
  }

  state = {borderHighlight: null};

  static propTypes = {
    container: PropTypes.oneOfType(
        PropTypes.instanceOf(ContainerClass),
        PropTypes.object
    ),
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
      updateState
    } = this.props;
    const {borderHighlight} = this.state;

    return (
        <ContainerWrapper {...otherProps}
                          borderHighlight={borderHighlight}
                          isOver={isOver}
                          isDragging={isDragging}
                          ref={instance => {
                            this.node.current = instance;
                            return connectDropTarget(
                                connectDragPreview(
                                    connectDragSource(instance)));
                          }}>
          {/*{id}*/}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;

            return (
                <ContainerItemComponent containerItem={newComponent}
                                        key={key}
                                        move={move}
                                        updateState={updateState}
                />
            );
          })}
        </ContainerWrapper>
    );
  }
}

const connectedComponent = connectAsTargetAndSource(ContainerComponent);
export {connectedComponent as ContainerComponent};
