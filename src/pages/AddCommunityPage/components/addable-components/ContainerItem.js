import React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {GenericComponent} from './Generic';
import {componentTypes} from '../../constants/component-types';
import {Directions} from '../../constants/style-constants';
import {StyledClass} from '../class/StyledClass';
import {connectAsTargetContainerItem} from '../../draggable-droppable';
import {
  calcWhichBorder,
} from '../../draggable-droppable/withBorderHighlights';
import {ContainerItemWrapper} from './styles';
import {
  withHoverStyle,
  connectSelectHandler,
  connectMoveHandler,
} from '../../BuilderLayout/HOC';
import {columnWidthDescriptor} from '../Fields';

/*
 * Container column where elements can be dropped into.
 */

export class ContainerItemClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
        this,
        {
          id: 'bg_page_0',
          index: 0,
          name: '',
          type: componentTypes.CONTAINER_ITEM,
          childComponents: [],
          direction: Directions.Rows,
          width: columnWidthDescriptor.bounds[1],
          height: 10,
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginTop: 0,
          marginBottom: 0,
        },
        options,
    );
  }

  addChild = e => {
    this.childComponents.push(e);
  };

  isEmpty = () => {
    return this.childComponents.length === 0;
  };
}

class ContainerItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  state = {borderHighlight: null};

  static propTypes = {
    containerItem: PropTypes.instanceOf(Immutable.Map),
    onSelect: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
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
  //       !this.props.containerItem.equals(nextProps.containerItem)
  //   );
  // }

  render() {
    const {
      containerItem,
      onSelect,
      onMove,
      connectDropTarget,
      isOver,
      canDrop,
      clientOffset,
      hover,
      ...otherProps
    } = this.props;
    if (!containerItem) {
      return null;
    }
    const {id, index, childComponents, type, name, ...otherStyleProps} = containerItem.toJSON();
    const styleProps = {...otherStyleProps, hover}
    const {borderHighlight} = this.state;

    // console.log(this.props)

    return (
        <ContainerItemWrapper
            {...otherProps}
            {...styleProps}
            borderHighlight={borderHighlight}
            isOver={isOver}
            // isDragging={isDragging}
            onClick={e => onSelect(e, containerItem)}
            ref={instance => {
              this.node.current = instance;
              return connectDropTarget(instance);
            }}
        >
          {/* {id} */}
          {childComponents &&
          childComponents.entrySeq().map(([key, value]) => {
            let updatedComponent = value.set('id', `${id}_${key}`);
            updatedComponent = updatedComponent.set('index', key);

            return (
                <GenericComponent
                    genericComponent={updatedComponent}
                    key={key}
                />
            );
          })}
        </ContainerItemWrapper>
    );
  }
}

const connectedComponent = compose(
    connectMoveHandler,
    connectSelectHandler,
    connectAsTargetContainerItem,
    withHoverStyle,
)(ContainerItemComponent);
export {connectedComponent as ContainerItemComponent};
