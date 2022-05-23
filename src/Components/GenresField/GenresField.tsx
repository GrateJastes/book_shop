import { Genre, MultiSelectOption } from '../../Store/BooksLoader/types';
import Select, { MultiValue } from 'react-select';
import { useGetGenresQuery } from '../../Store/BooksLoader/BooksAPI';
import './GenresField.scss';
import { css } from '@emotion/css';


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

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: '2px',
            borderColor: 'black',
            boxShadow: '',
        }),
    };

    // typescript object fields string suggestions ?? Забыл, где это нужно было сделать)
    return (
        <Select
            defaultValue={selectedGenreOptions}
            placeholder={'Жанры'}
            name={'genres'}
            options={fullGenreOptions}
            className={'genres-field'}
            onChange={(val: MultiValue<MultiSelectOption>) => {
                if (val) onChange([...val]);
            }}
            isMulti
            styles={customStyles}
        />
    );
}
