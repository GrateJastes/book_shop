import { ChangeEvent, useEffect, useState } from 'react';
import { GenresField } from '../GenresField/GenresField';
import DatePicker from 'react-datepicker';
import './FiltersBlock.scss';
import { BooksFilter, DEFAULT_FILTER } from '../../Pages/MainPage/MainPage';

export interface FiltersBlockProps {
    onApply: (arg: BooksFilter) => void;
    value: BooksFilter,
}

const convertYearToDate = (year: number | null): Date | null => year === null ? null : new Date(`${year}`);

export function FiltersBlock({onApply, value}: FiltersBlockProps) {
    const [filterFields, setFilterFields] = useState<BooksFilter>(value);

    useEffect(() => {
        setFilterFields(value);
    }, [value]);

    const applyFilters = () => {
        onApply(filterFields);
    };

    const onFilterClear = () => {
        setFilterFields(DEFAULT_FILTER);
        onApply(DEFAULT_FILTER);
    };

    const onFieldChange = (ev: ChangeEvent<HTMLInputElement>) => setFilterFields((prevState) => ({
        ...prevState,
        [ev.target.name]: ev.target.value,
    }));

    const onDateChange = (fieldName: string) => (date: Date | null) => setFilterFields((prevState) => ({
        ...prevState,
        [fieldName]: date?.getFullYear() || null,
    }));

    const startDate = convertYearToDate(filterFields.yearFrom);
    const endDate = convertYearToDate(filterFields.yearTo);

    return (
        <form onSubmit={(ev) => ev.preventDefault()} className="filters-block">
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <input
                    name="name"
                    className="filters-block__text-input input-field"
                    onChange={onFieldChange}
                    value={filterFields.name || ''}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <input
                    name="author"
                    className="filters-block__text-input input-field"
                    onChange={onFieldChange}
                    value={filterFields.author || ''}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Жанры</span>
                <GenresField
                    selectedGenres={filterFields.genreIds || undefined}
                    onChange={(newOption) => setFilterFields((prevState) => ({
                        ...prevState,
                        genreIds: newOption.map((option) => option.value)
                    }))}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы публикации</span>
                <div className="filters-block__years-range">
                    <DatePicker
                        className={'filters-block__text-input input-field filters-block__text-input_dp'}
                        showYearPicker
                        selected={startDate}
                        onChange={onDateChange('yearFrom')}
                        selectsStart
                        dateFormat={'yyyy'}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <DatePicker
                        className={'filters-block__text-input input-field filters-block__text-input_dp'}
                        showYearPicker
                        selected={endDate}
                        onChange={onDateChange('yearTo')}
                        selectsEnd
                        dateFormat={'yyyy'}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                    />
                </div>
            </div>
            <div className="filters-block__control-buttons filters-block__filter-field">
                <button
                    className="filters-block__clear-button"
                    onClick={onFilterClear}>
                    Очистить фильтр
                </button>
                <button
                    onClick={() => applyFilters()}
                    className="filters-block__search-button button_blue">
                    Найти
                </button>
            </div>
        </form>
    );
}
