import './FiltersBlock.scss';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { Genre, MultiSelectOption, SearchSample, SelectOption } from '../../Features/BooksLoader/types';
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

export function FiltersBlock(props: FiltersBlockProps) {
    const [ selectedNameOption, setSelectedNameOOption ] = useState<SelectOption | null>(null);
    const [ selectedAuthorOption, setSelectedAuthorOption ] = useState<SelectOption | null>(null);
    const [ selectedGenres, setSelectedGenres ] = useState<Array<MultiSelectOption> | null>(null);
    const [ selectedYearsRange, setSelectedYearsRange ] = useState<YearsRange | null>(null);
    const [fetchNameSuggestions, nameSuggestions] = useLazyGetSuggestionsByNameQuery();
    const [fetchAuthorSuggestions, authorSuggestions] = useLazyGetSuggestionsByAuthorQuery();

    const applyFilters: FormEventHandler = (ev?: FormEvent<Element>) => {
        ev?.preventDefault();

        let sample: SearchSample = {};
        selectedNameOption && (sample.name = selectedNameOption.value);
        selectedAuthorOption && (sample.author = selectedAuthorOption.value);
        selectedGenres?.length && (sample.genreIds = selectedGenres.map((genre) => genre.value));
        selectedYearsRange && (sample = {
            ...sample,
            ...selectedYearsRange,
        });

        props.onApply(sample);
    };

    const clearFilters = () => {
        setSelectedYearsRange(null);
        setSelectedAuthorOption(null);
        setSelectedGenres(null);
        setSelectedNameOOption(null);
    };

    useEffect(() => {
        // @ts-ignore
        applyFilters();
    }, []);

    const extractYearsRange = (range: DateRange) => setSelectedYearsRange({
        yearFrom: parseInt(range[0].getFullYear().toString()),
        yearTo: parseInt(range[1].getFullYear().toString()),
    });

    return (
        <form onSubmit={applyFilters} className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Название</span>
                <SearchBar
                    suggestions={nameSuggestions.data}
                    fetchSuggestions={fetchNameSuggestions}
                    selectedOption={selectedNameOption}
                    onChange={(newOption: SelectOption) => setSelectedNameOOption(newOption)}
                    fieldName={'Введите название'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Автор</span>
                <SearchBar
                    suggestions={authorSuggestions.data}
                    fetchSuggestions={fetchAuthorSuggestions}
                    selectedOption={selectedAuthorOption}
                    onChange={(newOption: SelectOption) => setSelectedAuthorOption(newOption)}
                    fieldName={'Введите имя'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Жанры</span>
                <GenreSelect
                    onChange={(newOption)=> setSelectedGenres(newOption)}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Годы написания</span>
                <YearSelect onChange={extractYearsRange}/>
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={clearFilters}>
                Clear
            </button>
        </form>
    );
}
