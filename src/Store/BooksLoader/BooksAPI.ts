import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../../Features/utils';
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
        getFilteredBooksBySearch: builder.query<Array<BookModel>, SearchSample>({
            query: (sample: SearchSample) => ({
                url: `${cfg.backendURL}/books`,
                params: {
                    ...sample,
                },
            }),
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
    useGetGenresQuery,
    useLazyGetFilteredBooksBySearchQuery,
    useLazyPostNewBookQuery,
    useLazyDeleteBookByIDQuery,
    useLazyPatchBookByIDQuery,
} = booksAPI;
