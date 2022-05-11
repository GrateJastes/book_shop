import './FiltersBlock.scss';
import React from 'react';

export function FiltersBlock() {
    return (
        <div className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__list">
                <div className="filters-block__filter">FILTERTUT</div>
                <div className="filters-block__filter">FILTERTUT</div>
                <div className="filters-block__filter">FILTERTUT</div>
                <div className="filters-block__filter">FILTERTUT</div>
            </div>
            <button className="filters-block__apply-button">
                Apply filters
            </button>
        </div>
    );
}
