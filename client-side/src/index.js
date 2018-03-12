import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import reducer from './store/reducer'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

axios.defaults.baseURL = 'http://localhost:3005';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const store = createStore(reducer);

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)

ReactDOM.render(
<Provider store={store}>
    {app}
</Provider>, document.getElementById('root'));
registerServiceWorker();
