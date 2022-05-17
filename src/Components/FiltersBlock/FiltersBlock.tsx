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
    yearsRange: {
        startDate: Date | null;
        endDate: Date | null;
    };
}


export function FiltersBlock(props: FiltersBlockProps) {
    const [filterFields, setFilterFields] = useState<FilterFields>({
        name: null,
        author: null,
        genres: null,
        yearsRange: {
            startDate: null,
            endDate: null,
        },
    });

    const applyFilters = () => {
        let sample: SearchSample = {};
        filterFields.name && (sample.name = filterFields.name);
        filterFields.author && (sample.author = filterFields.author);
        filterFields.genres?.length && (sample.genreIds = filterFields.genres.map((genre) => genre.value));
        filterFields.yearsRange && (sample = {
            ...sample,
            yearFrom: filterFields.yearsRange.startDate?.getFullYear(),
            yearTo: filterFields.yearsRange.endDate?.getFullYear(),
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

    return (
        <form onSubmit={onSubmit} className="filters-block">
            <h2 className="filters-block__header">Filters</h2>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Название</span>
                <input
                    type="text"
                    className="filters-block__text-input"
                    onChange={(event) => setFilterFields({
                        ...filterFields,
                        name: event.target.value
                    })}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Автор</span>
                <input
                    type="text"
                    className="filters-block__text-input"
                    onChange={(event) => setFilterFields({
                        ...filterFields,
                        author: event.target.value
                    })}/>
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__filed-name">Жанры</span>
                <GenresField
                    onChange={(newOption) => setFilterFields({...filterFields, genres: newOption})}
                />
            </div>
            <div className="filters-block__filter-field">
                <span className="filters-block__field-name">Годы написания</span>
                <DatePicker
                    className={"filters-block__date-picker"}
                    showYearPicker
                    selected={filterFields.yearsRange?.startDate}
                    onChange={(date) => setFilterFields({
                        ...filterFields,
                        yearsRange: {
                            ...filterFields.yearsRange,
                            startDate: date
                        },
                    })}
                    selectsStart
                    startDate={filterFields.yearsRange?.startDate}
                    endDate={filterFields.yearsRange?.endDate}
                />
                <DatePicker
                    className={"filters-block__date-picker"}
                    showYearPicker
                    selected={filterFields.yearsRange?.endDate}
                    onChange={(date) => setFilterFields({
                        ...filterFields,
                        yearsRange: {
                            ...filterFields.yearsRange,
                            endDate: date
                        },
                    })}
                    selectsEnd
                    startDate={filterFields.yearsRange?.startDate}
                    endDate={filterFields.yearsRange?.endDate}
                    minDate={filterFields.yearsRange?.startDate}
                />
            </div>
            <input type="submit" className="filters-block__button" value="Apply"/>
            <button className="filters-block__button" onClick={() => setFilterFields({
                name: null,
                author: null,
                genres: null,
                yearsRange: {
                    startDate: null,
                    endDate: null,
                },
            })}>Clear
            </button>
        </form>
    );
}
