import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: {
        first_name: null,
        last_name: null,
        wallet_amount: null,
        wallet_activities: [],
        campaign_participations: []
    },
    accessToken: null,
    amountsHidden: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setAmountsHidden: (state, action) => {
            state.amountsHidden = action.payload;
        },
        logUserOut: (state) => {
            state.userData = initialState.userData;
            state.accessToken = null;
        },
    },
});

export const { setUserData, setAccessToken, setAmountsHidden, logUserOut } = userSlice.actions;
export default userSlice.reducer;