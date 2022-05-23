import React from 'react';
import ReactDOM from 'react-dom/client';

import './Assets/Styles/Index.css';
import App from './Components/App/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
