import React, { useEffect, useState } from 'react';
import { FiltersBlock } from '../../Components/FiltersBlock/FiltersBlock';
import { BooksList } from '../../Components/BooksList/BooksList';
import { useGetFilteredBooksBySearchQuery } from '../../Store/BooksLoader/BooksAPI';
import { BookModel } from '../../Store/BooksLoader/types';
import cfg from '../../config';
import { Paginator } from '../../Components/Paginator/Paginator';
import './MainPage.scss';


export interface BooksFilter {
    name: string | null;
    author: string | null;
    genreIds: Array<number> | null;
    description: string | null;
    yearFrom: number | null;
    yearTo: number | null;
}

export const DEFAULT_FILTER: BooksFilter = {
    name: null,
    author: null,
    genreIds: null,
    description: null,
    yearFrom: null,
    yearTo: null,
}


function MainPage() {
    const [filter, setFilter] = useState<BooksFilter>(DEFAULT_FILTER);
    const {data: books = []} = useGetFilteredBooksBySearchQuery(filter);
    const [page, setPage] = useState(0);
    const [booksToShow, setBooksToShow] = useState<BookModel[]>([])

    const onFilterApply = (filter: BooksFilter) => {
        setFilter(filter);
        setPage(0);
    }

    useEffect(() => {
        const newOffset = (page * cfg.booksPerPage) % (books.length || 1);
        setBooksToShow(books.slice(newOffset, newOffset + cfg.booksPerPage) || []);
    }, [page, books]);

    return (
        <div className="page">
            <h1 className="page__app-name">Книжная лавка</h1>
            <div className="page__main-container">
                <FiltersBlock
                    value={filter}
                    onApply={onFilterApply}
                />
                <Paginator
                    pagesCount={Math.ceil((books.length) / cfg.booksPerPage)}
                    currentPage={page}
                    onChange={setPage}
                />
                <BooksList books={booksToShow}/>
            </div>
        </div>
    );
}

export default MainPage;
