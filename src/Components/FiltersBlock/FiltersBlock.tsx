import './FiltersBlock.scss';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { MultiSelectOption, SearchSample, SelectOption } from '../../Features/BooksLoader/types';
import {
    useLazyGetSuggestionsByAuthorQuery,
    useLazyGetSuggestionsByNameQuery
} from '../../Features/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { DateRange } from 'rsuite/DateRangePicker';
import { DateRangePicker } from 'rsuite';
import SearchField from '../SearchField/SearchField';

export interface FiltersBlockProps {
    onApply: (sample: SearchSample) => void;
}

export interface YearsRange {
    yearFrom: number;
    yearTo: number;
}

interface FilterFields {
    name: SelectOption | null;
    author: SelectOption | null;
    genres: Array<MultiSelectOption> | null;
    yearsRange: YearsRange | null;
}


export function FiltersBlock(props: FiltersBlockProps) {
    const [filterFields, setFilterFields] = useState<FilterFields>({
        name: null,
        author: null,
        genres: null,
        yearsRange: null,
    });

    const [ fetchNameSuggestions, nameSuggestions ] = useLazyGetSuggestionsByNameQuery();
    const [ fetchAuthorSuggestions, authorSuggestions ] = useLazyGetSuggestionsByAuthorQuery();

    const applyFilters = () => {
        let sample: SearchSample = {};
        filterFields.name && (sample.name = filterFields.name.value);
        filterFields.author && (sample.author = filterFields.author.value);
        filterFields.genres?.length && (sample.genreIds = filterFields.genres.map((genre) => genre.value));
        filterFields.yearsRange && (sample = {
            ...sample,
            ...filterFields.yearsRange,
        });

        props.onApply(sample);
    };

    const onSubmit = (ev: FormEvent) => {
        ev.preventDefault();
        applyFilters();
    }

    useEffect(() => {
        applyFilters();
    }, []);

    const extractYearsRange = (range: DateRange) => setFilterFields({
        ...filterFields,
        yearsRange: {
            yearFrom: parseInt(range[0].getFullYear().toString()),
            yearTo: parseInt(range[1].getFullYear().toString()),
        },
    });

    return (
        <form onSubmit={onSubmit} className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <SearchField
                    suggestions={nameSuggestions.data}
                    fetchSuggestions={fetchNameSuggestions}
                    selectedOption={filterFields.name}
                    onChange={(newOption: SelectOption) => setFilterFields({...filterFields, name: newOption})}
                    fieldName={'Введите название'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <SearchField
                    suggestions={authorSuggestions.data}
                    fetchSuggestions={fetchAuthorSuggestions}
                    selectedOption={filterFields.author}
                    onChange={(newOption: SelectOption) => setFilterFields({...filterFields, author: newOption})}
                    fieldName={'Введите имя'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Жанры</span>
                <GenresField
                    onChange={(newOption) => setFilterFields({...filterFields, genres: newOption})}
                />
                <span className="filters-block__field-name">Жанры</span>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы написания</span>
                <DateRangePicker className="filters-block__year-select" onOk={extractYearsRange}/>
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={() => setFilterFields({
                name: null,
                author: null,
                genres: null,
                yearsRange: null,
            })}>Clear</button>
        </form>
    );
}
