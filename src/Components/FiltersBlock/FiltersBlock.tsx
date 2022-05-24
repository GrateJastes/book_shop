import { MultiSelectOption, SearchSample } from '../../Store/BooksLoader/types';
import { ChangeEvent, useEffect, useState } from 'react';
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

    const onFieldChange = (ev: ChangeEvent<HTMLInputElement>) => setFilterFields((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
    }));

    const onDateChange = (fieldName: string) => (date: Date | null) => setFilterFields((prevState) => ({
        ...prevState,
        [fieldName]: date,
    }));

    return (
        <form onSubmit={(ev) => ev.preventDefault()} className="filters-block">
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <input
                    name="name"
                    type="search"
                    className="filters-block__text-input"
                    onChange={onFieldChange}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <input
                    name="author"
                    className="filters-block__text-input"
                    onChange={onFieldChange}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Жанры</span>
                <GenresField
                    onChange={(newOption) => setFilterFields((prevState) => {
                        return {...prevState, genres: newOption};
                    })}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы публикации</span>
                <div className="filters-block__years-range">
                    <DatePicker
                        className={'filters-block__text-input'}
                        showYearPicker
                        selected={filterFields.startDate}
                        onChange={onDateChange('startDate')}
                        selectsStart
                        startDate={filterFields.startDate}
                        endDate={filterFields.endDate}
                    />
                    <DatePicker
                        className={'filters-block__text-input'}
                        showYearPicker
                        selected={filterFields.endDate}
                        onChange={onDateChange('endDate')}
                        selectsEnd
                        startDate={filterFields.startDate}
                        endDate={filterFields.endDate}
                        minDate={filterFields.startDate}
                    />
                </div>
            </div>
            <div className="filters-block__control-buttons filters-block__filter-field">
                <button className="filters-block__clear-button" onClick={() => setFilterFields(initialFilterFields)}>
                    Очистить фильтр
                </button>
                <button onClick={() => applyFilters()} className="filters-block__search-button">
                    Найти
                </button>
            </div>
        </form>
    );
}
