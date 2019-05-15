import React from 'react';

import {withFirebase} from './Firebase';

const SignOutButton = ({firebase}) => (
    <button type="button" onClick={firebase.doSignOut}>
      Sign Out
    </button>
);

const connectedComponent = withFirebase(SignOutButton);

export {connectedComponent as SignOutButton};
