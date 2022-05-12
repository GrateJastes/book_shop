import './BooksBlock.scss';
import { Book } from '../Book/Book';
import React, { useEffect, useState } from 'react';
import { BookModel } from '../../Features/BooksLoader/types';
import ReactPaginate from 'react-paginate';
import cfg from '../../config';


export interface BooksBlockProps {
    books?: Array<BookModel>;
    onUpdate: () => void;
}

function Books(props: BooksBlockProps) {
    if (!props.books || props.books.length === 0) {
        return (<span>No results</span>)
    }

    return (
        <div  className="books-block__list">
            <Book
                id={0}
                isCreator={true}
                author={''}
                genres={[]}
                year={0}
                title={''}
                onUpdate={() => {}}
            />
            {props.books?.map((book, idx) => <Book
                id={book.id}
                isCreator={false}
                key={idx}
                author={book.author}
                genres={book.genres}
                year={book.year}
                title={book.name}
                onUpdate={props.onUpdate}
            />)}
        </div>
    );
}

export function BooksBlock(props: BooksBlockProps) {
    const [currentBooks, setCurrentBooks] = useState<Array<BookModel>>();
    const [booksOffset, setBooksOffset] = useState(0);
    const booksCount = props?.books?.length || 0;
    const pageCount = Math.ceil(booksCount / cfg.booksPerPage);


    useEffect(() => {
        const endOffset = booksOffset + cfg.booksPerPage;
        setCurrentBooks(props?.books?.slice(booksOffset, endOffset) || []);
    }, [props.books]);

    const handlePageClick = (event: {selected: number}) => {
        const newOffset = (event.selected * cfg.booksPerPage) % (props?.books?.length || 1);
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setBooksOffset(newOffset);
    };

    return (
        <div className="books-block">
            <ReactPaginate
                containerClassName="pagination"
                activeClassName="active"
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={pageCount}
                onPageChange={handlePageClick}
            />
            <Books books={currentBooks} onUpdate={props.onUpdate}/>
        </div>
    );
}
