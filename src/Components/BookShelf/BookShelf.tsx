import React from 'react';
import { BooksBlock } from '../BooksBlock/BooksBlock';
import './BookShelf.scss';
import { FiltersBlock } from '../FiltersBlock/FiltersBlock';

export function BookShelf() {
    return (
        <div className="bookshelf">
            <FiltersBlock/>
            <BooksBlock/>
        </div>
    );
}
