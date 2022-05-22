import { Genre, MultiSelectOption } from '../../Store/BooksLoader/types';
import Select, { MultiValue } from 'react-select';
import { useGetGenresQuery } from '../../Store/BooksLoader/BooksAPI';
import './GenresField.scss';


export interface GenreSelectProps {
    onChange: (newOption: Array<MultiSelectOption>) => void;
    selectedGenres?: Array<number>;
}

export function GenresField(props: GenreSelectProps) {
    const { fullGenreOptions } = useGetGenresQuery(undefined, {
        selectFromResult: ({ data }) => ({
            fullGenreOptions: data?.map((genre: Genre) => ({ value: genre.id, label: genre.name })) || [],
        }),
    });

    const updateSelectedOption = (newValue: MultiValue<MultiSelectOption>) => {
        if (!newValue) {
            props.onChange([ ...newValue ]);
        }
    };

    const selectedGenreOptions = fullGenreOptions?.reduce((acc: Array<MultiSelectOption>, curr: MultiSelectOption) => {
        if (props.selectedGenres?.includes(curr.value)) {
            acc.push(curr);
        }

        return acc;
    }, new Array<MultiSelectOption>()) || [];

    // useState with callback not new state
    // typescript object fields string suggestions
    // dateFormat
    return (
        <Select
            defaultValue={selectedGenreOptions}
            placeholder={'Жанры'}
            name={'genres'}
            options={fullGenreOptions}
            className={'genres-field'}
            onChange={(val: MultiValue<MultiSelectOption>) => updateSelectedOption(val)}
            isMulti
        />
    );
}
