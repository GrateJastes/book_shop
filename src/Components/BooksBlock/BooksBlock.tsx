import { Book } from '../Book/Book';
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../Store/BooksLoader/types';
import cfg from '../../config';
import './BooksBlock.scss';


export interface BooksBlockProps {
    books: Array<BookModel>;
}

export function BooksBlock({books}: BooksBlockProps) {
    const [currentBooks, setCurrentBooks] = useState<Array<BookModel>>();
    const [booksOffset, setBooksOffset] = useState(0);
    const [currentPageNum, setCurrentPageNum] = useState(0);

    const booksCount = books?.length || 0;
    const pageCount = Math.ceil((booksCount) / cfg.booksPerPage);

    useEffect(() => {
        const newOffset = (currentPageNum * cfg.booksPerPage) % (books.length || 1);
        setBooksOffset(newOffset);
    }, [currentPageNum])

    useEffect(() => {
        const endOffset = booksOffset + cfg.booksPerPage;

        setCurrentBooks(books.slice(booksOffset, endOffset) || []);
    }, [books, booksOffset]);

    const paginateFwd = () => setCurrentPageNum((prevNum) => prevNum < pageCount - 1 ? prevNum + 1 : prevNum);
    const paginateBck = () => setCurrentPageNum((prevNum) => prevNum === 0 ? prevNum : prevNum - 1);

    const handlePageClick = (ev: any) => {
        const newOffset = (ev.target.value * cfg.booksPerPage) % (books.length || 1);
        setCurrentPageNum(parseInt(ev.target.value));
        setBooksOffset(newOffset);
    };

    const pageButtons = new Array(pageCount, 0);

    return (
        <div className="books-block">
            <div className="paginator">
                <button onClick={paginateBck} className="paginator__button paginator__control-button">
                    Назад
                </button>
                <div className="paginator__page-buttons">{
                    pageButtons.map((_, idx) => (<button
                        key={idx}
                        value={idx}
                        onClick={handlePageClick}
                        className={`paginator__button ${idx === currentPageNum ? 'paginator__button_selected' : ''}`}>
                        {idx + 1}
                    </button>))
                }</div>
                <button onClick={paginateFwd} className="paginator__button paginator__control-button">
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

function BooksList({books}: BooksListProps) {
    if (books.length === 0) {
        return (
            <div className="books-block__list">
                <Book isCreator={true}/>
                <span>По текущему запросу не удалось найти книги</span>
            </div>
        );
    }

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
