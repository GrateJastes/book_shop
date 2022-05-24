import { Book } from '../Book/Book';
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../Store/BooksLoader/types';
import ReactPaginate from 'react-paginate';
import cfg from '../../config';
import './BooksBlock.scss';


export interface BooksBlockProps {
    books: Array<BookModel>;
}

export function BooksBlock({books}: BooksBlockProps) {
    const [currentBooks, setCurrentBooks] = useState<Array<BookModel>>();
    const [booksOffset, setBooksOffset] = useState(0);

    const booksCount = books?.length || 0;
    const pageCount = Math.ceil((booksCount) / cfg.booksPerPage);

    useEffect(() => {
        const endOffset = booksOffset + cfg.booksPerPage;
        setCurrentBooks(books.slice(booksOffset, endOffset) || []);
    }, [books, booksOffset]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * cfg.booksPerPage) % (books.length || 1);
        setBooksOffset(newOffset);
    };

    return (
        <div className="books-block">
            <ReactPaginate
                containerClassName="paginator"
                activeClassName="paginator__page-item_active"
                previousLabel="Назад"
                nextLabel="Далее"
                pageClassName="paginator__page-item"
                pageLinkClassName="paginator__page-link"
                previousClassName="paginator__page-item"
                previousLinkClassName="paginator__page-link paginator__page-link_nav"
                nextLinkClassName="paginator__page-link paginator__page-link_nav"
                nextClassName="paginator__page-item"
                breakLabel="..."
                breakClassName="paginator__page-item"
                breakLinkClassName="paginator__page-link"
                pageCount={pageCount}
                onPageChange={handlePageClick}
            />
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
                book={{
                    id: book.id,
                    name: book.name,
                    author: book.author,
                    year: book.year,
                    genres: book.genres,
                }}
                key={idx}
            />)}
            <Book isCreator={true}/>
        </div>
    );
}


