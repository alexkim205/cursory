import {connect} from 'react-redux';

export const withSidebarIsOpen = Component =>
    connect(
        state => {
          return {
            sidebarIsOpen: state.builderState.selected,
          };
        },
        null,
    )(Component);
