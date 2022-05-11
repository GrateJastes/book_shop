import './BooksBlock.scss';
import { Book } from '../Book/Book';
import React from 'react';
import { useGetAllBooksQuery } from '../../Features/BooksLoader/BooksAPI';

export function BooksBlock() {
    const {data: books} = useGetAllBooksQuery();

    return (
        <div className="books-block">
            <div className="books-block__list">
                {books?.map((book) => <Book
                    author={book.author}
                    genres={book.genres}
                    year={book.year}
                    title={book.name}
                />)}
            </div>
            <div className="bookshelf__paginator">
                1 2 3 4 5 6 7 8 9 10 11 ... Dalee &gt;&gt;
            </div>
        </div>
    );
}
