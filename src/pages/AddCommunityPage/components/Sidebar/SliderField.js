import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {compose} from 'redux';
import {
  connectUpdateHandler,
  withActiveComponent,
} from '../../BuilderLayout/HOC';

const SliderFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

class SliderField extends React.Component {

  static propTypes = {
    descriptor: PropTypes.object,
    activeComponent: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  render() {
    const {activeComponent, descriptor, onUpdate} = this.props;
    const value = activeComponent.get(descriptor.key);

    return (
        <SliderFieldWrapper>
          {value}
          <input
              name={descriptor.key}
              value={value}
              onChange={(e) => onUpdate(e.target.name, e.target.value)}
              min={descriptor.bounds[0]}
              max={descriptor.bounds[1]}
              step={descriptor.bounds[2]}
              type="range"
          />
        </SliderFieldWrapper>
    );
  }

}

const connectedField = compose(
    withActiveComponent,
    connectUpdateHandler,
)(SliderField);

export {connectedField as SliderField};
