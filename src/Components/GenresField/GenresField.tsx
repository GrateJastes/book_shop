import { Genre, MultiSelectOption } from '../../Features/BooksLoader/types';
import Select, { MultiValue } from 'react-select';
import { useGetGenresQuery } from '../../Features/BooksLoader/BooksAPI';
import './GenresField.scss';


export interface GenreSelectProps {
    onChange: (newOption: Array<MultiSelectOption>) => void;
    selectedGenres?: Array<number>;
}

export function GenresField(props: GenreSelectProps) {
    const { data: genres } = useGetGenresQuery();

    const updateSelectedOption = (newValue: MultiValue<MultiSelectOption>) => {
        if (!newValue) {
            return;
        }
        props.onChange([ ...newValue ]);
    };

    const selectedGenreOptions = genres?.reduce((acc: Array<{value: number, label: string}>, curr: Genre) => {
        if (props.selectedGenres?.includes(curr.id)) {
            acc.push({value: curr.id, label: curr.name})
        }

        return acc;
    }, new Array<MultiSelectOption>()) || [];

    let params = {
        placeholder: 'Жанры',
        name: 'genres',
        options: genres?.map((genre: Genre) => ({ value: genre.id, label: genre.name })),
        className: 'genres-field',
        onChange: (val: MultiValue<MultiSelectOption>) => updateSelectedOption(val),
    };

    if (selectedGenreOptions?.length !== 0) {
        // @ts-ignore
        params.defaultValue = selectedGenreOptions;
    }

    return (
        <Select
            {...params}
            isMulti
        />
    );
}
