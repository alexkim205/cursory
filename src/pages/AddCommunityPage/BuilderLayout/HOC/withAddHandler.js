import {connect} from 'react-redux';
import {builderStateActions} from '../../../../_actions';

export const connectAddHandler = Component =>
    connect(null,
        dispatch => {
          return {
            onAdd: (sidebarIsOpen, clickedItem) => dispatch(
                builderStateActions.add(sidebarIsOpen, clickedItem)),
          };
        },
    )(Component);
