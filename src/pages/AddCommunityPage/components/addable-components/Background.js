import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Immutable from 'immutable';

import {componentTypes} from '../../constants/component-types';
import {PageClass, PageComponent, PageInterface} from './Page';
import {Positions} from '../../constants/style-constants';
import {BackgroundWrapper} from './styles';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {connectSelectHandler} from '../../BuilderLayout/HOC/withSelectHandler';

export class BackgroundClass {
  constructor(options = {}) {
    Object.assign(
        this,
        {
          active: false,
          backgroundColor: '#FFFFFF',
          type: componentTypes.BACKGROUND,
          id: 'bg',
          page: new PageClass(),
        },
        options,
    );
  }
}

class BackgroundComponent extends React.Component {
  state = {style: {position: Positions.Center}}; // position is a state bc can be controlled by page component (child)

  static propTypes = {
    background: PropTypes.instanceOf(Immutable.Map),
    onSelect: PropTypes.func.isRequired,
  };

  // // allows component to update independently from its children.
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const componentToCompare1 = this.props.background.delete('page');
  //   const componentToCompare2 = nextProps.background.delete('page');
  //   return !componentToCompare1.equals(componentToCompare2);
  // }

  render() {
    const {background, onSelect} = this.props;

    if (!background) {
      return null;
    }

    const {id, page, type, ...backgroundProps} = background.toJSON();

    return (
        <BackgroundWrapper
            {...backgroundProps}
            {...this.state.style}
            onClick={e => onSelect(e, background)}
        >
          <PageComponent
              page={page}
          />
        </BackgroundWrapper>
    );
  }
}

const connectedComponent = compose(
    connectSelectHandler,
)(BackgroundComponent);

export {connectedComponent as BackgroundComponent};
