import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../../Features/utils';
import { BookCreationModel, BookModel, BookUpdateModel, Genre, SearchSample } from './types';
import cfg from '../../config';

export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery: axiosBaseQuery(),
    tagTypes: [ 'Genre', 'Book' ],
    endpoints: (builder) => ({
        getGenres: builder.query<Array<Genre>, void>({
            query: () => ({
                url: `${cfg.backendURL}/genre`,
            }),
            providesTags: () => [ 'Genre' ],
        }),
        getFilteredBooksBySearch: builder.query<Array<BookModel>, SearchSample>({
            query: (sample: SearchSample) => ({
                url: `${cfg.backendURL}/books`,
                params: {
                    ...sample,
                },
            }),
            providesTags: () => [ 'Book' ],
        }),
        postNewBook: builder.mutation<string, BookCreationModel>({
            query: (bookInfo: BookCreationModel) => ({
                url: `${cfg.backendURL}/books`,
                method: 'POST',
                data: bookInfo,
            }),
            invalidatesTags: [ 'Book' ],
        }),
        patchBookByID: builder.mutation<string, BookUpdateModel>({
            query: (bookInfo: BookCreationModel) => ({
                url: `${cfg.backendURL}/books/${bookInfo.id}`,
                method: 'PATCH',
                data: bookInfo,
            }),
            invalidatesTags: [ 'Book' ],
        }),
        deleteBookByID: builder.mutation<string, number>({
            query: (bookId: number) => ({
                url: `${cfg.backendURL}/books/${bookId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [ 'Book' ],
        }),
    }),
});

export const {
    useGetGenresQuery,
    useLazyGetFilteredBooksBySearchQuery,
    usePostNewBookMutation,
    useDeleteBookByIDMutation,
    usePatchBookByIDMutation,
} = booksAPI;
