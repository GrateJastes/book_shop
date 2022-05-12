import './GenreSelect.scss';
import { Genre, MultiSelectOption, SelectOption } from '../../Features/BooksLoader/types';
import Select, { MultiValue, SingleValue } from 'react-select';
import { useGetGenresQuery } from '../../Features/BooksLoader/BooksAPI';


export interface GenreSelectProps {
    onChange: (newOption: Array<MultiSelectOption>) => void;
}

export function GenreSelect(props: GenreSelectProps) {
    const { data: genres } = useGetGenresQuery();

    const updateSelectedOption = (newValue: MultiValue<MultiSelectOption>) => {
        if (!newValue) {
            return;
        }
        props.onChange([...newValue]);
    };

    return (
        <Select
            placeholder={"Жанры"}
            isMulti
            name={"genres"}
            options={genres?.map((genre: Genre) => ({value: genre.id, label: genre.name}))}
            className="genre-select"
            onChange={(val) => updateSelectedOption(val)}
        />
    );
}
