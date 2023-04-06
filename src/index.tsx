import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
        <div className="text-center mb-4">
            <a target="_blank" href="https://vionakaleb.github.io/me" rel="noreferrer">
                &nbsp;&#169; https://vionakaleb.github.io/me
            </a>
        </div>
    </React.StrictMode>,
);

reportWebVitals();
