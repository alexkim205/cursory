import {connect} from 'react-redux';
import {builderStateActions} from '../../../../_actions';

export const connectUpdateHandler = Component =>
    connect(null,
        dispatch => {
          return {
            onUpdate: (attrName, attrValue) => dispatch(
                builderStateActions.update(attrName, attrValue)),
          };
        },
    )(Component);
