import { MultiSelectOption, SearchSample } from '../../Store/BooksLoader/types';
import { FormEvent, useEffect, useState } from 'react';
import { GenresField } from '../GenresField/GenresField';
import DatePicker from 'react-datepicker';
import './FiltersBlock.scss';

export interface FiltersBlockProps {
    onApply: (sample: SearchSample) => void;
}

interface FilterFields {
    name: string | null;
    author: string | null;
    genres: Array<MultiSelectOption> | null;
    startDate: Date | null;
    endDate: Date | null;
}

const initialFilterFields = {
    name: null,
    author: null,
    genres: null,
    startDate: null,
    endDate: null,
}


export function FiltersBlock({onApply}: FiltersBlockProps) {
    const [filterFields, setFilterFields] = useState<FilterFields>(initialFilterFields);
    const applyFilters = () => onApply({
        name: filterFields.name || null,
        author: filterFields.author || null,
        genreIds: filterFields.genres?.map((genre) => genre.value) || null,
        yearFrom: filterFields.startDate?.getFullYear() || null,
        yearTo: filterFields.endDate?.getFullYear() || null,
        description: null,
    });

    useEffect(() => {
        applyFilters();
    }, []);

    return (
        <form
            className="filters-block"
            onSubmit={(ev: FormEvent) => {
                ev.preventDefault();
                applyFilters();
            }}>
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <input
                    type="text"
                    className="filters-block__text-input"
                    onChange={(event) => setFilterFields((prevState) => {
                        return {...prevState, name: event.target.value};
                    })}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <input
                    type="text"
                    className="filters-block__text-input"
                    onChange={(event) => setFilterFields((prevState) => {
                        return {...prevState, author: event.target.value};
                    })}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Жанры</span>
                <GenresField
                    onChange={(newOption) => setFilterFields((prevState) => {
                        return {...prevState, genres: newOption};
                    })}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы написания</span>
                <DatePicker
                    className={'filters-block__date-picker'}
                    showYearPicker
                    selected={filterFields.startDate}
                    onChange={(date) => setFilterFields((prevState) => {
                        return {...prevState, startDate: date};
                    })}
                    selectsStart
                    startDate={filterFields.startDate}
                    endDate={filterFields.endDate}
                />
                <DatePicker
                    className={'filters-block__date-picker'}
                    showYearPicker
                    selected={filterFields.endDate}
                    onChange={(date) => setFilterFields((prevState) => {
                        return {...prevState, endDate: date};
                    })}
                    selectsEnd
                    startDate={filterFields.startDate}
                    endDate={filterFields.endDate}
                    minDate={filterFields.startDate}
                />
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={() => setFilterFields(initialFilterFields)}>Clear
            </button>
        </form>
    );
}
