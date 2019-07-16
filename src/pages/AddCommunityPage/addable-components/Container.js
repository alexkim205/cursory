import React from 'react';
import {compose} from 'redux';

import {
  ContainerItemInterface,
  ContainerItemComponent,
} from './ContainerItem';
import {GenericComponentInterface} from './Generic';
import {componentTypes} from '../constants/component-types';
import {Alignments, Directions} from '../constants/style-enums';
import {StyledClass} from '../components/StyledClass';
import PropTypes from 'prop-types';
import {connectAsTargetAndSource} from '../draggable-droppable';
import {
  calcWhichBorder,
  renderOverlay,
} from '../draggable-droppable/withBorderHighlights';
import {widthDescriptor, heightDescriptor} from '../components/';
import {ContainerWrapper} from './styles';
import {connectMoveHandler, connectSelectHandler} from '../BuilderLayout/HOC';
import Immutable from 'immutable';

export class ContainerClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
        this,
        {
          id: 'bg_page_0',
          index: 0,
          name: '',
          type: componentTypes.CONTAINER,
          childComponents: [],
          direction: Directions.Columns,
          alignment: Alignments.SpaceBetween,
          width: widthDescriptor.bounds[1],
          height: heightDescriptor.bounds[1],
          paddingVertical: 1,
          paddingHorizontal: 1,
          marginTop: 1,
          marginBottom: 1,
        },
        options,
    );
  }

  addChild = e => {
    this.childComponents.push(e);
  };
}

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {borderHighlight: null};

  static propTypes = {
    container: PropTypes.instanceOf(Immutable.Map),
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
        !this.props.container.equals(nextProps.container) ||
        this.props.isDragging !== nextProps.isDragging
    );
  }

  render() {
    const {
      container,
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
    const {id, index, childComponents, type, name, ...otherStyleProps} = container.toJSON();
    console.log('container', id, index, childComponents, type, name,
        otherStyleProps);
    const {borderHighlight} = this.state;

    return (
        <ContainerWrapper
            {...otherProps}
            borderHighlight={borderHighlight}
            isOver={isOver}
            isDragging={isDragging}
            onClick={e => onSelect(container)}
            ref={instance => {
              this.node.current = instance;
              return connectDropTarget(
                  connectDragPreview(connectDragSource(instance)),
              );
            }}
        >
          {/* {id} */}
          {childComponents &&
          childComponents.entrySeq().map(([key, value]) => {
            let updatedComponent = value.set('id', `${id}_${key}`);
            updatedComponent = updatedComponent.set('index', key);

            return (
                <ContainerItemComponent
                    containerItem={updatedComponent}
                    key={key}
                />
            );
          })}
        </ContainerWrapper>
    );
  }
}

const connectedComponent = compose(
    connectMoveHandler,
    connectSelectHandler,
    connectAsTargetAndSource,
)(ContainerComponent);
export {connectedComponent as ContainerComponent};
