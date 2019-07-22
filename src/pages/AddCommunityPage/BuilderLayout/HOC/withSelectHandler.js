import {connect} from 'react-redux';
import {builderStateActions} from '../../../../_actions';

export const connectSelectHandler = Component =>
    connect(null,
        dispatch => {
          return {
            onSelect: (e, selectedComponent) => {
              console.log("select", e, selectedComponent)
              e.stopPropagation();
              return dispatch(builderStateActions.select(selectedComponent));
            },
          };
        },
    )(Component);
