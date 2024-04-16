import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    number: ""
};

const numPadSlice = createSlice({
    name: 'numpad',
    initialState,
    reducers: {
        concatNumber: (state, action) => {
            state.number += action.payload;
        },
        removeNumber: (state) => {
            state.number = state.number.slice(0, -1);
        },
        clearNumber: (state) => {
            state.number = '';
        },
    },
});

export const { concatNumber, removeNumber, clearNumber } = numPadSlice.actions;
export default numPadSlice.reducer;