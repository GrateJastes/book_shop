import React from 'react';
import './MainPage.scss';
import { BookShelf } from '../BookShelf/BookShelf';


function MainPage() {
    return (
        <div className="page">
            <h1 className="page__app-name">Bookshelf</h1>
            <BookShelf/>
        </div>
    );
}

export default MainPage;
