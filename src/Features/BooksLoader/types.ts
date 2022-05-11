export interface Genre {
    id: number;
    name: string;
}

export interface Book {
    id?: number;
    name: string;
    author: string;
    year: number;
    genres: Array<Genre>;
    description?: string;
}
