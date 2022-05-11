import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../utils';
import { Book } from './types';
import cfg from '../../config';

export const booksAPI = createApi({
    reducerPath: 'booksAPI',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getAllBooks: builder.query<Array<Book>, void>({
            query: () => ({
                url: `${cfg.backendURL}/books`,
            }),
        }),
    }),
});

export const {
    useGetAllBooksQuery,
    useLazyGetAllBooksQuery,
} = booksAPI;
