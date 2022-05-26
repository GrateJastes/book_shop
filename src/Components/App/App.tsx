import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../Store/store'
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from '../../Pages/MainPage/MainPage';
import './App.scss';
import '../../Assets/Styles/common.scss';


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
