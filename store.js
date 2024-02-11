import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'src/shared/state/api/apiSlice';
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),

});
