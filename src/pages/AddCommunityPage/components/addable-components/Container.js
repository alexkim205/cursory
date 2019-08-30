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
import {withDraggable, withDroppable} from '../../draggable-droppable';

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
    hover: PropTypes.bool.isRequired,
  };

  render() {
    const {
      container,
      onSelect,
      hover,
      ...otherProps
    } = this.props;
    if (!container) {
      return null;
    }
    const {id, index, childComponents, type, name, ...otherStyleProps} = container.toJSON();
    const styleProps = {...otherStyleProps, hover};
    const {borderHighlight} = this.state;

    return (
        <ContainerWrapper
            {...otherProps}
            {...styleProps}
            borderHighlight={borderHighlight}
            // isOver={isOver}
            // isDragging={isDragging}
            onClick={e => onSelect(e, container)}
            ref={instance => {this.node.current = instance}}
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
    withDraggable,
    // connectMoveHandler,
    connectSelectHandler,
    withDroppable,
    withDraggable,
    withHoverStyle
)(ContainerComponent);
export {connectedComponent as ContainerComponent};
