import React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import {componentTypes} from '../../constants/component-types';
import {PageClass, PageComponent, PageInterface} from './Page';
import {Positions} from '../../constants/style-constants';
import {BackgroundWrapper} from './styles';
import {withHoverStyle, connectSelectHandler} from '../../BuilderLayout/HOC';

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
    hover: PropTypes.bool.isRequired,
  };

  // // allows component to update independently from its children.
  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   const componentToCompare1 = this.props.background.delete('page');
  //   const componentToCompare2 = nextProps.background.delete('page');
  //   return !componentToCompare1.equals(componentToCompare2);
  // }

  render() {
    const {background, onSelect, hover} = this.props;

    if (!background) {
      return null;
    }

    const {id, page, type, ...otherStyleProps} = background.toJSON();
    const styleProps = {...otherStyleProps, hover}

    return (
        <BackgroundWrapper
            {...styleProps}
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
    withHoverStyle,
)(BackgroundComponent);

export {connectedComponent as BackgroundComponent};
