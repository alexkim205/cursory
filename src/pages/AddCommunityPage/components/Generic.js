import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {ContainerClass, ContainerComponent} from './Container';

import {DragSource, DropTarget} from 'react-dnd';

import {
  Alignments, alignmentStyle,
  Directions, directionStyle,
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

class GenericClass extends StyledClass {
  constructor(
      id = 'bg_page_0',
      index = 0,
      name = '',
      type = componentTypes.GENERIC,
      childComponents = [],
      ...arg
  ) {
    super(...arg);

    this.id = id;
    this.index = index;
    this.name = name;
    this.type = type;
    this.childComponents = childComponents;
  }
}

const GenericWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
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
`;

class GenericComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  static propTypes = {
    genericComponent: PropTypes.oneOfType([
      PropTypes.instanceOf(GenericClass),
      PropTypes.instanceOf(ContainerClass),
    ]),
    connectDropTarget: PropTypes.func.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    move: PropTypes.func,
  };

  render() {
    const {id, index, childComponents, type, name, ...otherProps} = this.props.genericComponent;
    const {connectDropTarget, connectDragSource, connectDragPreview, isDragging, move} = this.props;

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
                        ref={instance => {
                          this.node(instance);
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
