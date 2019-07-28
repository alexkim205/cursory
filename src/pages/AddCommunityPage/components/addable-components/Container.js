import React from 'react';
import {compose} from 'redux';
import Immutable from 'immutable';

import {ContainerItemComponent} from './ContainerItem';
import {componentTypes} from '../../constants/component-types';
import {Alignments, Directions} from '../../constants/style-constants';
import {StyledClass} from '../class/StyledClass';
import PropTypes from 'prop-types';
import {connectAsTargetAndSource} from '../../draggable-droppable';
import {
  calcWhichBorder,
} from '../../draggable-droppable/withBorderHighlights';
import {
  heightDescriptor,
  columnWidthDescriptor,
} from '../index';
import {ContainerWrapper} from './styles';
import {
  withHoverStyle,
  connectSelectHandler,
  connectMoveHandler,
} from '../../BuilderLayout/HOC';

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
          width: columnWidthDescriptor.bounds[1],
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
    hover: PropTypes.bool.isRequired,
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

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return (
  //       this.state.borderHighlight !== nextState.borderHighlight ||
  //       this.props.isOver !== nextProps.isOver ||
  //       !this.props.container.equals(nextProps.container) ||
  //       this.props.isDragging !== nextProps.isDragging
  //   );
  // }

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
        hover,
      ...otherProps
    } = this.props;
    if (!container) {
      return null;
    }
    const {id, index, childComponents, type, name, ...otherStyleProps} = container.toJSON();
    const styleProps = {...otherStyleProps, hover}
    const {borderHighlight} = this.state;

    return (
        <ContainerWrapper
            {...styleProps}
            borderHighlight={borderHighlight}
            isOver={isOver}
            isDragging={isDragging}
            onClick={e => onSelect(e, container)}
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
                    {...otherProps}
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
    withHoverStyle
)(ContainerComponent);
export {connectedComponent as ContainerComponent};
