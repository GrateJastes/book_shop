export interface Genre {
    id: number;
    name: string;
}

export interface BookUpdateModel {
    id: number;
    name?: string | null;
    author?: string | null;
    year?: number | null;
    genreIds?: Array<number> | null;
    description?: string | null;
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
    name: string | null;
    author: string | null;
    year: number | null;
    genreIds: Array<number> | null;
    description: string | null;
}

export interface MultiSelectOption {
    value: number;
    label: string;
}

export interface SearchSample {
    name: string | null;
    author: string | null;
    yearFrom: number | null;
    yearTo: number | null;
    genreIds: Array<number> | null;
    description: string | null;
}
