import React from 'react';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { BooksBlock } from '../../Components/BooksBlock/BooksBlock';
import { useGetGenresQuery, useLazyGetFilteredBooksBySearchQuery } from '../../Store/BooksLoader/BooksAPI';
import './MainPage.scss';


function MainPage() {
    const [ fetchBooks, books ] = useLazyGetFilteredBooksBySearchQuery();
    const {data: genres} = useGetGenresQuery();

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
