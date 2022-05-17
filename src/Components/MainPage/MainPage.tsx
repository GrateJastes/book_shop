import React from 'react';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { BooksBlock } from '../BooksBlock/BooksBlock';
import { useLazyGetFilteredBooksBySearchQuery } from '../../Features/BooksLoader/BooksAPI';
import './MainPage.scss';


function MainPage() {
    const [ fetchBooks, books ] = useLazyGetFilteredBooksBySearchQuery();

    return (
        <div className="page">
            <h1 className="page__app-name">Bookshelf</h1>
            <div className="page__main-container">
                <FiltersBlock onApply={(sample) => fetchBooks(sample)}/>
                <BooksBlock books={books.data} onUpdate={() => fetchBooks({})}/>
            </div>
        </div>
    );
}

export default MainPage;
