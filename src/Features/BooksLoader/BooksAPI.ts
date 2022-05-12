import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../utils';
import { BookCreationModel, BookModel, BookUpdateModel, Genre, SearchSample, SelectOption } from './types';
import cfg from '../../config';

export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getGenres: builder.query<Array<Genre>, void>({
            query: () => ({
                url: `${cfg.backendURL}/genre`,
            }),
        }),
        getAllBooks: builder.query<Array<BookModel>, void>({
            query: () => ({
                url: `${cfg.backendURL}/books`,
            }),
        }),
        getFilteredBooksBySearch: builder.query<Array<BookModel>, SearchSample>({
            query: (sample: SearchSample) => ({
                url: `${cfg.backendURL}/books`,
                params: {
                    ...sample,
                },
            }),
        }),
        getSuggestionsByName: builder.query<Array<SelectOption>, string>({
            query: (sample: string) => ({
                url: `${cfg.backendURL}/books`,
                params: {
                    name: sample,
                },
            }),
            transformResponse: (res: Array<BookModel>) => [...new Set(res
                .map((book) => ({
                    value: book.name,
                    label: book.name,
                })))
            ],
        }),
        getSuggestionsByAuthor: builder.query<Array<SelectOption>, string>({
            query: (sample: string) => ({
                url: `${cfg.backendURL}/books`,
                params: {
                    author: sample,
                },
            }),
            transformResponse: (res: Array<BookModel>) => [...new Set(res
                .map((book) => ({
                    value: book.author,
                    label: book.author,
                })))
            ],
        }),
        postNewBook: builder.query<string, BookCreationModel>({
            query: (bookInfo: BookCreationModel) => ({
                url: `${cfg.backendURL}/books`,
                method: 'POST',
                data: bookInfo,
            }),
        }),
        patchBookByID: builder.query<string, BookUpdateModel>({
            query: (bookInfo: BookCreationModel) => ({
                url: `${cfg.backendURL}/books/${bookInfo.id}`,
                method: 'PATCH',
                data: bookInfo,
            }),
        }),
        deleteBookByID: builder.query<string, number>({
            query: (bookId: number) => ({
                url: `${cfg.backendURL}/books/${bookId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useGetGenresQuery,
    useLazyGetFilteredBooksBySearchQuery,
    useLazyGetSuggestionsByNameQuery,
    useLazyGetSuggestionsByAuthorQuery,
    useLazyPostNewBookQuery,
    useLazyDeleteBookByIDQuery,
    useLazyPatchBookByIDQuery,
} = booksAPI;
