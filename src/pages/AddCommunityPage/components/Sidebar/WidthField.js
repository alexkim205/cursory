import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {compose} from 'redux';
import {
  connectUpdateHandler,
  withActiveComponent,
} from '../../BuilderLayout/HOC';

const WidthFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  .row {
    display: flex;
    flex-direction: row;
    
    &.add {
      
    }
  }
`;

class WidthField extends React.Component {

  static propTypes = {
    activeComponent: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  onChangeMultipleRows = (e) => {
    const {onUpdate, activeComponent} = this.props;
    const {name: key, value} = e.target;

    // If value is empty, set value to zero.
    const intValue = !!value.trim() ? parseInt(value) : 0;

    const newChildComponents = activeComponent.get('childComponents').
        setIn([key, 'width'], intValue);
    onUpdate('childComponents', newChildComponents);
    this.forceUpdate();
  };

  render() {
    const childComponents = this.props.activeComponent.get('childComponents');

    return (
        <WidthFieldWrapper>
          {childComponents &&
          childComponents.entrySeq().map(([key, column]) => {
            return (
                <div key={key} className={'row'}>
                  <input
                      type={'text'}
                      name={key}
                      value={column.get('width')}
                      onChange={this.onChangeMultipleRows}
                  />
                </div>
            );
          })}
        </WidthFieldWrapper>
    );
  }

}

const connectedField = compose(
    withActiveComponent,
    connectUpdateHandler,
)(WidthField);

export {connectedField as WidthField};
