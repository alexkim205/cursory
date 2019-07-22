import React from 'react';
import {compose} from 'redux';

import {componentTypes} from '../../constants/component-types';
import {ContainerClass, ContainerComponent} from './Container';

import {StyledClass} from '../class/StyledClass';
import PropTypes from 'prop-types';
import {
  connectAsTarget,
  connectAsTargetAndSource,
} from '../../draggable-droppable';
import {calcWhichBorder} from '../../draggable-droppable/withBorderHighlights';

import {GenericWrapper} from './styles';
import {withBuilderState} from '../../BuilderLayout/HOC/withBuilderState';
import {withActiveComponent} from '../../BuilderLayout/HOC/withActiveComponent';
import {connectMoveHandler} from '../../BuilderLayout/HOC/withMoveHandler';
import {connectSelectHandler} from '../../BuilderLayout/HOC/withSelectHandler';
import Immutable from 'immutable';

export class GenericClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
        this,
        {
          id: 'bg_page_0',
          key: 0,
          index: 0,
          name: '',
          type: componentTypes.GENERIC,
          childComponents: [],
          height: 10,
          width: 10,
          paddingVertical: 1,
          paddingHorizontal: 1,
          marginBottom: 1,
        },
        options,
    );
  }

  addChild = e => {
    this.childComponents.push(e);
  };
}

export const GenericHOC = Component => {
  class GenericHOCWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.node = React.createRef;
    }

    state = {borderHighlight: null};

    static propTypes = {
      genericComponent: PropTypes.instanceOf(Immutable.Map),
      onSelect: PropTypes.func.isRequired,
      onMove: PropTypes.func.isRequired,
      connectDropTarget: PropTypes.func.isRequired,
      connectDragSource: PropTypes.func.isRequired,
      connectDragPreview: PropTypes.func.isRequired,
      isDragging: PropTypes.bool.isRequired,
      isOver: PropTypes.bool.isRequired,
      canDrop: PropTypes.bool.isRequired,
      clientOffset: PropTypes.object,
    };

    changeBorder = clientOffset => {
      const {isOver, canDrop} = this.props;
      this.setState({
        borderHighlight: calcWhichBorder(
            clientOffset,
            this.node,
            isOver,
            canDrop,
        ),
      });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      return (
          this.state.borderHighlight !== nextState.borderHighlight ||
          this.props.isOver !== nextProps.isOver ||
          !this.props.genericComponent.equals(nextProps.genericComponent) ||
          this.props.isDragging !== nextProps.isDragging
      );
    }

    render() {
      const {
        genericComponent,
        onSelect,
        onMove,
        connectDropTarget,
        connectDragSource,
        connectDragPreview,
        isDragging,
        isOver,
        canDrop,
        clientOffset,
        ...otherProps
      } = this.props;
      if (!genericComponent) {
        return null;
      }
      const {id, index, childComponents, type, name, ...otherStyleProps} = genericComponent.toJSON();
      // console.log('genericComponent', id, index, childComponents, type, name,
      //     otherStyleProps);

      const {borderHighlight} = this.state;

      if (type === componentTypes.CONTAINER) {
        // console.log(this.props.genericComponent)

        return (
            <ContainerComponent
                container={this.props.genericComponent}
            />
        );
      }

      // Else, assume generic component with one element
      // Use switch statement when I add more element types
      return (
          <GenericWrapper
              {...otherStyleProps}
              borderHighlight={borderHighlight}
              isOver={isOver}
              isDragging={isDragging}
              onClick={e => onSelect(e, genericComponent)}
              ref={instance => {
                this.node.current = instance;
                return connectDropTarget(
                    connectDragPreview(connectDragSource(instance)),
                );
              }}
          >
            {/* {id} */}
            <Component {...otherProps} />
          </GenericWrapper>
      );
    }
  }

  return compose(
      connectMoveHandler,
      connectSelectHandler,
      connectAsTargetAndSource,
  )(GenericHOCWrapper);
};
