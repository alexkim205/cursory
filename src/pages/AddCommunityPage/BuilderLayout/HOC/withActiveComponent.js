import {connect} from 'react-redux';

export const withActiveComponent = Component =>
    connect(
        state => {
          return {
            activeComponent: state.builderState.activeComponent,
          };
        },
        null,
    )(Component);
