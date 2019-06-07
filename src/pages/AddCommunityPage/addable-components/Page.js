import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {GenericComponent} from './Generic';
import {Positions} from '../constants/style-enums';
import PropTypes from 'prop-types';
import {StyledClass} from '../components/StyledClass';

import {
  connectAsTarget,
  connectAsTargetAndSource,
} from '../draggable-droppable';
import {BackgroundClass} from './Background';
import {PageWrapper} from './styles'

export class PageClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(this, {
      id: 'bg_page',
      type: componentTypes.PAGE,
      position: Positions.Center,
      childComponents: [],
      paddingHorizontal: 30,
    }, options);
  }

  addChild = (e) => {
    this.childComponents.push(e);
  };
}

class PageComponent extends React.Component {

  constructor(props) {
    super(props);
    this.node = React.createRef();
  }

  componentDidMount() {
    this.props.updateBgStyle({position: this.props.page.position});
  }

  static propTypes = {
    page: PropTypes.oneOfType(
        PropTypes.instanceOf(PageClass),
        PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
    move: PropTypes.func,
    updateActive: PropTypes.func,
    updateBgStyle: PropTypes.func,
  };

  render() {
    const {childComponents, id, type, position, ...otherProps} = this.props.page;
    const {connectDropTarget, updateActive, updateBgStyle} = this.props;

    return (
        <PageWrapper {...otherProps}
                     onClick={(e) => updateActive(e, id)}
                     ref={instance => {
                       this.node.current = instance;
                       return connectDropTarget(instance);
                     }}>
          {childComponents && childComponents.map((e, key) => {
            const newComponent = Object.assign(
                Object.create(Object.getPrototypeOf(e)), e);
            newComponent.id = `bg_page_${key}`;
            newComponent.index = key;

            return (
                <GenericComponent key={key} genericComponent={newComponent}
                                  move={this.props.move}
                                  updateActive={updateActive}/>
            );
          })}
        </PageWrapper>
    );
  }
}

const connectedComponent = connectAsTarget(PageComponent);
export {connectedComponent as PageComponent};


