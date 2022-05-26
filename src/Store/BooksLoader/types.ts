export interface Genre {
    id: number;
    name: string;
}

export interface BookModel {
    id: number;
    name: string;
    author: string;
    year: number;
    genres: Array<Genre>;
    description?: string;
}

interface UnknownBookProps {
    name: string | null;
    author: string | null;
    genreIds: Array<number> | null;
    description: string | null;
}

export interface SearchSample extends UnknownBookProps {
    yearFrom: number | null;
    yearTo: number | null;
}

export interface BookUpdateModel extends UnknownBookProps {
    id: number;
    year: number | null;
}

export interface BookCreationModel extends BookUpdateModel {
}

export interface MultiSelectOption {
    value: number;
    label: string;
}
