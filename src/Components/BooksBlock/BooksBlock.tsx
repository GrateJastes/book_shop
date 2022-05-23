import { Book } from '../Book/Book';
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../Store/BooksLoader/types';
import ReactPaginate from 'react-paginate';
import cfg from '../../config';
import './BooksBlock.scss';


export interface BooksBlockProps {
    books: Array<BookModel>;
}

export function BooksBlock(props: BooksBlockProps) {
    const [currentBooks, setCurrentBooks] = useState<Array<BookModel>>();
    const [booksOffset, setBooksOffset] = useState(0);

    const booksCount = props.books?.length || 0;
    const pageCount = Math.ceil((booksCount) / cfg.booksPerPage);

    useEffect(() => {
        const endOffset = booksOffset + cfg.booksPerPage;
        setCurrentBooks(props.books.slice(booksOffset, endOffset) || []);
    }, [props.books, booksOffset]);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * cfg.booksPerPage) % (props.books.length || 1);
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


function BooksList(props: BooksListProps) {
    if (props.books.length === 0) {
        return (<span>No results</span>)
    }

    return (
        <div className="books-block__list">
            <Book
                id={0}
                isCreator={true}
                author={''}
                genres={[]}
                year={0}
                name={''}
            />
            {props.books?.map((book, idx) => <Book
                id={book.id}
                isCreator={false}
                key={idx}
                author={book.author}
                genres={book.genres}
                year={book.year}
                name={book.name}
            />)}
        </div>
    );
}


