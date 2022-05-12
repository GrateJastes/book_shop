import React from 'react';
import { BooksBlock } from '../BooksBlock/BooksBlock';
import './BookShelf.scss';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';
import { useGetAllBooksQuery, useLazyGetFilteredBooksBySearchQuery } from '../../Features/BooksLoader/BooksAPI';


export function BookShelf() {
    const [fetchBooks, books] = useLazyGetFilteredBooksBySearchQuery();

    return (
        <div className="bookshelf">
            <FiltersBlock onApply={(sample) => fetchBooks(sample)}/>
            <BooksBlock books={books.data} onUpdate={() => fetchBooks({})}/>
        </div>
    );
}
