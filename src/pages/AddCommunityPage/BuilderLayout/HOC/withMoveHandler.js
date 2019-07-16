import {connect} from 'react-redux';
import {builderStateActions} from '../../../../_actions';

export const connectMoveHandler = Component =>
    connect(null,
        dispatch => {
          return {
            onMove: (oldComponent, newComponent, targetSide) => dispatch(
                builderStateActions.move(
                    oldComponent, newComponent, targetSide)),
          };
        },
    )(Component);
