import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from 'src/shared/state/api/apiSlice';
import numPadReducer from 'src/shared/state/numPadSlice';
import campaignReducer from 'src/shared/state/campaignSlice';
import userReducer from 'src/shared/state/userSlice';

export const store = configureStore({
        reducer: {
                [apiSlice.reducerPath]: apiSlice.reducer,
                campaign: campaignReducer,
                numpad: numPadReducer,
                user: userReducer
        },
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware().concat(apiSlice.middleware),
});
