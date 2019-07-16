import {connect} from 'react-redux';

export const withBuilderState = Component =>
    connect(
        state => {
          return {
            builderState: state.builderState.builderState,
          };
        },
        null,
    )(Component);
