import {connect} from 'react-redux';
import {builderStateActions} from '../../../../_actions';

export const connectSelectHandler = Component =>
    connect(null,
        dispatch => {
          return {
            onSelect: selectedComponent => dispatch(
                builderStateActions.select(selectedComponent)),
          };
        },
    )(Component);
