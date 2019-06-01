import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {GenericComponent} from './Generic';
import {componentTypes} from '../constants/component-types';
import {
  Alignments, alignmentStyle,
  BorderHighlight, borderHighlightStyle,
  Directions, directionStyle, draggingDisableStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';
import {Draggable} from 'react-beautiful-dnd';
import {StyledClass} from './StyledClass';
import {ContainerClass} from './Container';
import {
  connectAsTargetContainerItem,
} from '../draggable-droppable';
import {
  calcWhichBorder,
  renderOverlay,
} from '../draggable-droppable/withBorderHighlights';

/*
 * Container column where elements can be dropped into.
 */

export class ContainerItemClass extends StyledClass {

  constructor(options = {}) {
    super(options);
    Object.assign(this, {
      id: 'bg_page_0',
      index: 0,
      name: '',
      type: componentTypes.CONTAINER_ITEM,
      childComponents: [],
      direction: Directions.Rows,
      width: 30,
      paddingVertical: 10,
      paddingHorizontal: 10,
      marginTop: 20,
      marginBottom: 20,
    }, options);
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };

  isEmpty = () => {
    return this.childComponents.length === 0;
  };
}

const ContainerItemWrapper = styled.div`

  display: flex;
  box-sizing: border-box;
  
  background-color: ${props => props.backgroundColor};
  // background-color: green;
  border: 2px dotted gray;
  min-height: 150px;
  
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

class ContainerItemComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.props.updateState(this.props.containerItem.id);
  }

  state = {borderHighlight: null};

  static propTypes = {
    containerItem: PropTypes.oneOfType(
        PropTypes.instanceOf(ContainerItemClass),
        PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
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
    const {id, index, childComponents, name, type, ...otherProps} = this.props.containerItem;
    const {
      connectDropTarget,
      // connectDragSource,
      // connectDragPreview,
      // isDragging,
      isOver,
      canDrop,
      clientOffset,
      move,
      updateState,
    } = this.props;
    const {borderHighlight} = this.state;

    return (
        <ContainerItemWrapper {...otherProps}
                              borderHighlight={borderHighlight}
                              isOver={isOver}
            // isDragging={isDragging}
                              ref={instance => {
                                this.node.current = instance;
                                return connectDropTarget(instance);
                              }}>
          {id}
          {childComponents &&
          childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `${id}_${key}`;
            newComponent.index = key;

            return (
                <GenericComponent genericComponent={newComponent} key={key}
                                  move={move}
                                  updateState={updateState}
                />
            );
          })}
        </ContainerItemWrapper>
    );
  }

}

const connectedComponent = connectAsTargetContainerItem(ContainerItemComponent);
export {connectedComponent as ContainerItemComponent};
