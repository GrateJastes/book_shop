import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from '../../Store/store'
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../../Pages/MainPage/MainPage';


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
