import { Book } from '../Book/Book';
import React from 'react';
import { BookModel } from '../../Store/BooksLoader/types';
import './BooksBlock.scss';

interface BooksListProps {
    books: Array<BookModel>;
}

export function BooksList({books}: BooksListProps) {
    if (books.length === 0) {
        return (
            <div className="books-list">
                <Book isCreator={true}/>
                <span>По текущему запросу не удалось найти книги</span>
            </div>
        );
    }

    return (
        <div className="books-list">
            {books?.map((book, idx) => <Book
                isCreator={false}
                book={book}
                key={idx}
            />)}
            <Book isCreator={true}/>
        </div>
    );
}
