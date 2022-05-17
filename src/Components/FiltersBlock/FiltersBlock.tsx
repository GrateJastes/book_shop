import './FiltersBlock.scss';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { MultiSelectOption, SearchSample, SelectOption } from '../../Features/BooksLoader/types';
import {
    useLazyGetSuggestionsByAuthorQuery,
    useLazyGetSuggestionsByNameQuery
} from '../../Features/BooksLoader/BooksAPI';
import { GenreSelect } from '../GenreSelect/GenreSelect';
import { YearSelect } from '../YearSelect/YearSelect';
import { DateRange } from 'rsuite/DateRangePicker';

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
    const [fetchNameSuggestions, nameSuggestions] = useLazyGetSuggestionsByNameQuery();
    const [fetchAuthorSuggestions, authorSuggestions] = useLazyGetSuggestionsByAuthorQuery();

    const applyFilters: FormEventHandler = (ev?: FormEvent<Element>) => {
        ev?.preventDefault();

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

    useEffect(() => {
        // @ts-ignore
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
        <form onSubmit={applyFilters} className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Название</span>
                <SearchBar
                    suggestions={nameSuggestions.data}
                    fetchSuggestions={fetchNameSuggestions}
                    selectedOption={filterFields.name}
                    onChange={(newOption: SelectOption) => setFilterFields({...filterFields, name: newOption})}
                    fieldName={'Введите название'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Автор</span>
                <SearchBar
                    suggestions={authorSuggestions.data}
                    fetchSuggestions={fetchAuthorSuggestions}
                    selectedOption={filterFields.author}
                    onChange={(newOption: SelectOption) => setFilterFields({...filterFields, author: newOption})}
                    fieldName={'Введите имя'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Жанры</span>
                <GenreSelect
                    onChange={(newOption) => setFilterFields({...filterFields, genres: newOption})}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Годы написания</span>
                <YearSelect onChange={extractYearsRange}/>
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={() => setFilterFields({
                name: null,
                author: null,
                genres: null,
                yearsRange: null,
            })}>
                Clear
            </button>
        </form>
    );
}
