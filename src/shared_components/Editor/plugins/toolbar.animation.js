import React, {useState} from 'react';
import {Transition} from 'react-transition-group';
import {Toolbar} from './toolbar.style';

export const AnimateToolBar = ({toolbarRef, children}) => {
  const [inProp, setInProp] = useState(true);

  return (
      <React.Fragment>
        <Transition in={inProp} timeout={300}>
          {(state) => (
              <Toolbar ref={toolbarRef} state={state}>
                {children}
              </Toolbar>
          )}
        </Transition>
      </React.Fragment>
  );
};
