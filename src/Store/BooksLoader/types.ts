export interface Genre {
    id: number;
    name: string;
}

export interface BookUpdateModel {
    id: number;
    name?: string;
    author?: string;
    year?: number;
    genreIds?: Array<number>;
    description?: string;
}

export interface BookModel {
    id: number;
    name: string;
    author: string;
    year: number;
    genres: Array<Genre>;
    description?: string;
}

export interface BookCreationModel {
    id: number;
    name: string;
    author: string;
    year: number;
    genreIds: Array<number>;
    description: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface MultiSelectOption {
    value: number;
    label: string;
}

export interface SearchSample {
    name?: string;
    author?: string;
    yearFrom?: number;
    yearTo?: number;
    genreIds?: Array<number>;
    description?: string;
}
