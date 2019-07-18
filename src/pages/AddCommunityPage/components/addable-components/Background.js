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

  render() {
    const {background, onSelect} = this.props;
    if (!background) {
      return null;
    }

    const {id, page, type, ...backgroundProps} = background.toJSON();
    console.log("background", id, page, type, backgroundProps)
    // console.log(page)

    return (
        <BackgroundWrapper
            {...backgroundProps}
            {...this.state.style}
            onClick={e => onSelect(background)}
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
