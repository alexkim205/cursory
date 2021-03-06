import React from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import Immutable from 'immutable';

import {componentTypes} from '../../constants/component-types';
import {GenericComponent} from './Generic';
import {Positions} from '../../constants/style-constants';
import {StyledClass} from '../class/StyledClass';
import {
  columnWidthDescriptor,
} from '../index';

import {
  connectAsTarget,
} from '../../draggable-droppable';
import {PageWrapper} from './styles';
import {
  withHoverStyle,
  connectSelectHandler,
  connectMoveHandler,
} from '../../BuilderLayout/HOC';

export class PageClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(
        this,
        {
          id: 'bg_page',
          type: componentTypes.PAGE,
          position: Positions.Center,
          childComponents: [],
          width: columnWidthDescriptor.bounds[1],
          // height: heightDescriptor.bounds[1],
          paddingHorizontal: 1,
        },
        options,
    );
  }

  addChild = e => {
    this.childComponents.push(e);
  };
}

class PageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  static propTypes = {
    page: PropTypes.instanceOf(Immutable.Map),
    onSelect: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    hover: PropTypes.bool.isRequired,
  };

  // allows component to update independently from its children.
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const componentToCompare1 = this.props.page.delete('childComponents');
  //   const componentToCompare2 = nextProps.page.delete('childComponents');
  //   return !componentToCompare1.equals(componentToCompare2);
  // }

  render() {
    const {page, onSelect, connectDropTarget, hover, ...otherProps} = this.props;
    if (!page) {
      return null;
    }
    const {id, childComponents, type, position, ...otherStyleProps} = page.toJSON();
    const styleProps = {...otherStyleProps, hover};

    return (
        <PageWrapper
            {...otherProps}
            {...styleProps}
            onClick={e => onSelect(e, page)}
            ref={instance => {
              this.node.current = instance;
              return connectDropTarget(instance);
            }}
        >
          {childComponents &&
          childComponents.entrySeq().map(([key, value]) => {
            let updatedComponent = value.set('id', `bg_page_${key}`);
            updatedComponent = updatedComponent.set('index', key);
            return (
                <GenericComponent
                    key={key}
                    genericComponent={updatedComponent}
                />
            );
          })}
        </PageWrapper>
    );
  }
}

const connectedComponent = compose(
    connectAsTarget,
    connectMoveHandler,
    connectSelectHandler,
    withHoverStyle,
)(PageComponent);

export {connectedComponent as PageComponent};
