import React from 'react';
import './Paginator.scss';

interface PaginationProps {
    pagesCount: number,
    currentPage: number,
    onChange: (currentPage: number) => void
}

export function Paginator({pagesCount, currentPage, onChange}: PaginationProps) {
    const pageButtons = new Array(pagesCount).fill(null);

    const handlePageChange = (newPage: number) => {
        if (newPage < 0) {
            newPage = 0;
        }
        if (newPage >= pagesCount) {
            newPage = pagesCount - 1;
        }

        onChange(newPage);
    };

    return (
        <div className="paginator">
            <button onClick={() => handlePageChange(currentPage - 1)} className="paginator__button paginator__control-button">
                Назад
            </button>
            <div className="paginator__page-buttons">{
                pageButtons.map((_, idx) => (<button
                    key={idx}
                    value={idx}
                    onClick={() => handlePageChange(idx)}
                    className={`paginator__button ${idx === currentPage ? 'paginator__button_selected' : ''}`}>
                    {idx + 1}
                </button>))
            }</div>
            <button onClick={() => handlePageChange(currentPage + 1)} className="paginator__button paginator__control-button">
                Далее
            </button>
        </div>
    );
}
