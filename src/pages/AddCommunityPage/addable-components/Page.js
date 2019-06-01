import React from 'react';
import styled from 'styled-components';

import {componentTypes} from '../constants/component-types';
import {GenericComponent} from './Generic';
import {
  Alignments, alignmentStyle,
  Directions, directionStyle,
  Margins, marginStyle,
  Paddings, paddingStyle,
  Widths, widthStyle,
} from '../constants/style-enums';
import PropTypes from 'prop-types';
import {StyledClass} from './StyledClass';

import {DropTarget} from 'react-dnd';
import {
  connectAsTarget,
  connectAsTargetAndSource,
} from '../draggable-droppable';
import {BackgroundClass} from './Background';

export class PageClass extends StyledClass {
  constructor(options = {}) {
    super(options);
    Object.assign(this, {
      type: componentTypes.PAGE,
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

  static propTypes = {
    page: PropTypes.oneOfType(
        PropTypes.instanceOf(PageClass),
        PropTypes.object,
    ),
    connectDropTarget: PropTypes.func.isRequired,
    move: PropTypes.func,
    updateState: PropTypes.func,
  };

  render() {
    const {childComponents, type, ...otherProps} = this.props.page;
    const {connectDropTarget, updateState} = this.props;

    return (
        <PageWrapper {...otherProps}
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
                                  updateState={updateState}/>
            );
          })}
        </PageWrapper>
    );
  }
}

const connectedComponent = connectAsTarget(PageComponent);
export {connectedComponent as PageComponent};

const PageWrapper = styled.div`
  background-color: ${props => props.backgroundColor};
  
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  
  // TODO: Implement style later
  
  // Alignment
  ${props => alignmentStyle(props.alignment)}
  
  // Width
  ${props => widthStyle(props.width)}
  
  // Padding
  ${props => paddingStyle(props.paddingVertical, props.paddingHorizontal)}
    
  // Margin
  ${props => marginStyle(props.marginTop, props.marginBottom)}
`;
