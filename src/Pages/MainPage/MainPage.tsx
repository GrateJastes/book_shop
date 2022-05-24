import React from 'react';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { BooksBlock } from '../../Components/BooksBlock/BooksBlock';
import { useLazyGetFilteredBooksBySearchQuery } from '../../Store/BooksLoader/BooksAPI';
import './MainPage.scss';


function MainPage() {
    const [fetchBooks, books] = useLazyGetFilteredBooksBySearchQuery();

    return (
        <div className="page">
            <h1 className="page__app-name">Книжная лавка</h1>
            <div className="page__main-container">
                <FiltersBlock onApply={(sample) => fetchBooks(sample)}/>
                <BooksBlock books={books.data || []}/>
            </div>
        </div>
    );
}

export default MainPage;
