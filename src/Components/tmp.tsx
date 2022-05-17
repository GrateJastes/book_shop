// import { MultiSelectOption, SearchSample, SelectOption } from '../Features/BooksLoader/types';
// import { useLazyGetSuggestionsByAuthorQuery, useLazyGetSuggestionsByNameQuery } from '../Features/BooksLoader/BooksAPI';
// import { FormEvent, useEffect, useState } from 'react';
// import { DateRange } from 'rsuite/DateRangePicker';
// import SearchField from './SearchField/SearchField';
// import { GenresField } from './GenresField/GenresField';
// import { DateRangePicker } from 'rsuite';
//
// export interface FiltersBlockProps {
//     onApply: (sample: SearchSample) => void;
// }
//
// export interface YearsRange {
//     yearFrom: number;
//     yearTo: number;
// }
//
// interface FilterFields {
//     name: string | null;
//     author: string | null;
//     genres: Array<MultiSelectOption> | null;
//     yearsRange: YearsRange | null;
// }
//
//
// export function FiltersBlock(props: FiltersBlockProps) {
//     const [filterFields, setFilterFields] = useState<FilterFields>({
//         name: null,
//         author: null,
//         genres: null,
//         yearsRange: null,
//     });
//
//     const applyFilters = () => {
//         let sample: SearchSample = {};
//         filterFields.name && (sample.name = filterFields.name);
//         filterFields.author && (sample.author = filterFields.author);
//         filterFields.genres?.length && (sample.genreIds = filterFields.genres.map((genre) => genre.value));
//         filterFields.yearsRange && (sample = {
//             ...sample,
//             ...filterFields.yearsRange,
//         });
//
//         props.onApply(sample);
//     };
//
//     const onSubmit = (ev: FormEvent) => {
//         ev.preventDefault();
//         applyFilters();
//     }
//
//     useEffect(() => {
//         applyFilters();
//     }, []);
//
//     const extractYearsRange = (range: DateRange) => setFilterFields({
//         ...filterFields,
//         yearsRange: {
//             yearFrom: parseInt(range[0].getFullYear().toString()),
//             yearTo: parseInt(range[1].getFullYear().toString()),
//         },
//     });
//
//     return (
//         <form onSubmit={onSubmit} className="filters-block">
//             <h2 className="filters-block__header">Filters</h2>
//             <div className="filters-block__filter-field">
//                 <span className="filters-block__field-name">Название</span>
//                 <input
//                     type="text"
//                     className="filters-block__text-input"
//                     onChange={(event) => setFilterFields({
//                         ...filterFields,
//                         name: event.target.value
//                     })}/>
//             </div>
//             <div className="filters-block__filter-field">
//                 <span className="filters-block__field-name">Автор</span>
//                 <input
//                     type="text"
//                     className="filters-block__text-input"
//                     onChange={(event) => setFilterFields({
//                         ...filterFields,
//                         author: event.target.value
//                     })}/>
//             </div>
//             <div className="filters-block__filter-field">
//                 <span className="filters-block__filed-name">Жанры</span>
//                 <GenresField
//                     onChange={(newOption) => setFilterFields({...filterFields, genres: newOption})}
//                 />
//                 <span className="filters-block__field-name">Жанры</span>
//             </div>
//             <div className="filters-block__filter-field">
//                 <span className="filters-block__field-name">Годы написания</span>
//                 <DateRangePicker className="filters-block__year-select" onOk={extractYearsRange}/>
//             </div>
//             <input type="submit" className="filters-block__button" value="Apply"/>
//             <button className="filters-block__button" onClick={() => setFilterFields({
//                 name: null,
//                 author: null,
//                 genres: null,
//                 yearsRange: null,
//             })}>Clear
//             </button>
//         </form>
//     );
// }
export {}