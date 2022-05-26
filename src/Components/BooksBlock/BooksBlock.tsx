import { Book } from '../Book/Book';
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../Store/BooksLoader/types';
import cfg from '../../config';
import './BooksBlock.scss';


export interface BooksBlockProps {
    books: Array<BookModel>;
}

export function BooksBlock({ books }: BooksBlockProps) {
    const [ currentBooks, setCurrentBooks ] = useState<Array<BookModel>>();
    const [ booksOffset, setBooksOffset ] = useState(0);
    const [ currentPageNum, setCurrentPageNum ] = useState(0);

    const booksCount = books?.length || 0;
    const pageCount = Math.ceil((booksCount) / cfg.booksPerPage);

    useEffect(() => {
        const newOffset = (currentPageNum * cfg.booksPerPage) % (books.length || 1);
        setBooksOffset(newOffset);
    }, [ currentPageNum ])

    useEffect(() => {
        const endOffset = booksOffset + cfg.booksPerPage;

        setCurrentBooks(books.slice(booksOffset, endOffset) || []);
    }, [ books, booksOffset ]);

    const paginateFwd = () => setCurrentPageNum((prevNum) => prevNum < pageCount - 1 ? prevNum + 1 : prevNum);
    const paginateBck = () => setCurrentPageNum((prevNum) => prevNum === 0 ? prevNum : prevNum - 1);

    const handlePageClick = (ev: any) => {
        const newOffset = (ev.target.value * cfg.booksPerPage) % (books.length || 1);
        setCurrentPageNum(parseInt(ev.target.value));
        setBooksOffset(newOffset);
    };

    let pageButtons = [];
    for (let idx = 0; idx < pageCount; idx++) {
        pageButtons.push(
            <button
                key={idx}
                value={idx}
                onClick={handlePageClick}
                className={`paginator__button ${idx === currentPageNum ? 'paginator__button_selected' : ''}`}>
                {idx + 1}
            </button>
        )
    }

    if (books.length === 0) {
        return (
            <div className="books-block">
                <span className="books-block__found-number">
                По вашему запросу не найдено ни одной книги.
            </span>
                <div className="books-block__list">
                    <Book isCreator={true}/>
                </div>
            </div>
        );
    }

    return (
        <div className="books-block">
            <span className="books-block__found-number">
                Найдено книг: {books.length}
            </span>
            <div className="paginator">
                <button onClick={paginateBck} className="paginator__button paginator__button_control">
                    Назад
                </button>
                <div className="paginator__page-buttons">{pageButtons}</div>
                <button onClick={paginateFwd} className="paginator__button paginator__button_control">
                    Далее
                </button>
            </div>
            <BooksList books={currentBooks || []}/>
        </div>
    );
}

interface BooksListProps {
    books: Array<BookModel>;
}

function BooksList({ books }: BooksListProps) {
    return (
        <div className="books-block__list">
            {books?.map((book, idx) => <Book
                isCreator={false}
                book={book}
                key={idx}
            />)}
            <Book isCreator={true}/>
        </div>
    );
}
