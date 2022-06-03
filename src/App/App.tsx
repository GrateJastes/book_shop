import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../Store/store'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import '../Assets/Styles/common.scss';
import MainPage from '../Pages/MainPage/MainPage';


function App() {
    return (
        <Provider store={store}>
            <Router>
                <MainPage/>
            </Router>
        </Provider>
    );
}

export default App;
