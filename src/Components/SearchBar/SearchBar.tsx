import React from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import cfg from '../../config';
import { SelectOption } from '../../Features/BooksLoader/types';


export interface ISearchBarProps {
    suggestions?: Array<SelectOption>;
    fetchSuggestions: (a0: string) => void;
    fieldName: string;
    selectedOption: SelectOption | null;
    onChange: (newOption: SelectOption) => void;
}

function SearchBar(props: ISearchBarProps) {
    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= cfg.minSearchLength) {
            props.fetchSuggestions(searchQuery);
        }
    };

    const updateSelectedOption = (newValue: SingleValue<SelectOption>) => {
        if (!newValue) {
            return;
        }
        props.onChange({value: newValue.value, label: newValue.label});
    };

    return (
        <Select
            placeholder={props.fieldName}
            className="search-bar"
            noOptionsMessage={() => <span>{cfg.noOptionText}</span>}
            onInputChange={refreshSuggestions}
            options={props.suggestions}
            onChange={(val) => updateSelectedOption(val)}
            value={props.selectedOption}
        />
    );
}

export default SearchBar;
