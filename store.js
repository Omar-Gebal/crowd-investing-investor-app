import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'src/shared/state/api/apiSlice';
import campaignReducer from 'src/shared/state/campaignSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        campaign: campaignReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
