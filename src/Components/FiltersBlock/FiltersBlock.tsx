import './FiltersBlock.scss';
import React, { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import SearchField from '../SearchField/SearchField';
import { MultiSelectOption, SearchSample, SelectOption } from '../../Features/BooksLoader/types';
import {
    useLazyGetSuggestionsByAuthorQuery,
    useLazyGetSuggestionsByNameQuery
} from '../../Features/BooksLoader/BooksAPI';
import { GenresField } from '../GenresField/GenresField';
import { DateRange } from 'rsuite/DateRangePicker';
import { DateRangePicker } from 'rsuite';

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
    const clearFilters = () => {
        setSelectedYearsRange(null);
        setSelectedAuthorOption(null);
        setSelectedGenres(null);
        setSelectedNameOOption(null);
    };

    const [ fetchNameSuggestions, nameSuggestions ] = useLazyGetSuggestionsByNameQuery();
    const [ fetchAuthorSuggestions, authorSuggestions ] = useLazyGetSuggestionsByAuthorQuery();

    const applyFilters = () => {
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
    const onSubmit = (ev: FormEvent<Element>) => {
        ev.preventDefault();
        applyFilters();
    }

    useEffect(() => {
        applyFilters();
    }, []);

    const extractYearsRange = (range: DateRange) => setSelectedYearsRange({
        yearFrom: parseInt(range[0].getFullYear().toString()),
        yearTo: parseInt(range[1].getFullYear().toString()),
    });

    return (
        <form onSubmit={onSubmit} className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <SearchField
                    suggestions={nameSuggestions.data}
                    fetchSuggestions={fetchNameSuggestions}
                    selectedOption={selectedNameOption}
                    onChange={(newOption: SelectOption) => setSelectedNameOOption(newOption)}
                    fieldName={'Введите название'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <SearchField
                    suggestions={authorSuggestions.data}
                    fetchSuggestions={fetchAuthorSuggestions}
                    selectedOption={selectedAuthorOption}
                    onChange={(newOption: SelectOption) => setSelectedAuthorOption(newOption)}
                    fieldName={'Введите имя'}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Жанры</span>
                <GenresField
                    onChange={(newOption) => setSelectedGenres(newOption)}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы написания</span>
                <DateRangePicker className="filters-block__year-select" onOk={extractYearsRange}/>
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={clearFilters}>Clear</button>
        </form>
    );
}
