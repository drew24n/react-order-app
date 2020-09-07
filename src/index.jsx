import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import {App} from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./redux/store";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

serviceWorker.register()
