import { Genre, MultiSelectOption } from '../../Store/BooksLoader/types';
import Select, { ControlProps, MultiValue, StylesConfig } from 'react-select';
import { useGetGenresQuery } from '../../Store/BooksLoader/BooksAPI';

export interface GenreSelectProps {
    onChange: (newOption: Array<MultiSelectOption>) => void;
    selectedGenres?: Array<number>;
}

export function GenresField({ onChange, selectedGenres }: GenreSelectProps) {
    const { fullGenreOptions } = useGetGenresQuery(undefined, {
        selectFromResult: ({ data }) => ({
            fullGenreOptions: data?.map((genre: Genre) => ({ value: genre.id, label: genre.name })) || [],
        }),
    });

    const selectedGenreOptions = fullGenreOptions?.reduce((acc: Array<MultiSelectOption>, curr: MultiSelectOption) => {
        if (selectedGenres?.includes(curr.value)) {
            acc.push(curr);
        }

        return acc;
    }, new Array<MultiSelectOption>()) || [];

    const customStyles: StylesConfig<MultiSelectOption, true> = {
        container: (provided) => ({
            ...provided,
            width: '200px',
            height: '44px',
        }),
        control: (provided, state: ControlProps<MultiSelectOption>) => ({
            ...provided,
            borderRadius: '5px',
            height: '44px',
            margin: '5px',
            borderColor: '#31313157',
            borderStyle: 'solid',
            borderWidth: '1px',
        }),
    };

    return (
        <Select
            defaultValue={selectedGenreOptions}
            placeholder={'Жанры'}
            name={'genres'}
            options={fullGenreOptions}
            onChange={(val: MultiValue<MultiSelectOption>) => {
                if (val) onChange([...val]);
            }}
            isMulti
            styles={customStyles}
        />
    );
}
