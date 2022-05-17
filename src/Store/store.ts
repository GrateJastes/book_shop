import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { booksAPI } from './BooksLoader/BooksAPI';

export const store = configureStore({
    reducer: {
        [booksAPI.reducerPath]: booksAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(booksAPI.middleware),
});

setupListeners(store.dispatch);
