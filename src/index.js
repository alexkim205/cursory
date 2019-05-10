import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './_helpers';

import './_styles/main.scss';
import './_styles/typography.scss';
import './_styles/editor.scss';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root'),
);
